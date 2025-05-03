import { useState } from "react";
import { useWriteContract } from "wagmi";
import { TaskBoardConfig } from "@/lib/contracts";
import { Address } from "viem";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { writeContract, isPending } = useWriteContract();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title) return;

    try {
      const emptyHash =
        "0x0000000000000000000000000000000000000000000000000000000000000000";

      await writeContract({
        ...TaskBoardConfig,
        functionName: "createTask",
        args: [title, description, emptyHash],
      });

      setTitle("");
      setDescription("");
    } catch (err) {
      console.log("Error creating task :", err);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
