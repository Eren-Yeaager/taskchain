import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi";
export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn Solidity",
      description: "Study the basics of Solidity",
      status: "Created",
    },
    {
      id: 2,
      title: "Build dApp",
      description: "Create a simple blockchain application",
      status: "In Progress",
    },
  ]);

  const handleCreateTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      status: "Created",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };
  return (
    <div className="min-h-screen bg-gray-700 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">TaskChain</h1>

          {isConnected ? (
            <div className="flex items-center gap-4">
              <p className="text-sm">
                Connected :{address?.substring(0, 6)}...{address?.substring(38)}
              </p>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 text-white px-4 py-2 rounded-2xl"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => connect({ connector: injected() })}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </header>

        {isConnected ? (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="tet-xl font-semibold text-gray-700 mb-4">
              Create New Task
            </h2>
            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block text-gray-900 mb-2" htmlFor="title">
                  Task Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-gray-700"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-gray-700"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-gray-700 px-4 py-2 rounded"
              >
                Create Task
              </button>
            </form>

            <div className="bg-white rounded-lg shadow">
              <h2 className="text-xl text-gray-700 font-semibold p-6 border-b">
                Your Tasks
              </h2>
              <ul className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <li key={task.id} className="p-6">
                    <h3 className="font-medium text-gray-700">{task.title}</h3>
                    <p className="text-gray-700 mb-2">{task.description}</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">
                        Status: {task.status}
                      </span>
                      <button className="text-green-500 hover:underline">
                        Mark Complete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl mb-2">Welcome to TaskChain</h2>
            <p className="text-white  mb-6">
              Please connect your wallet to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
