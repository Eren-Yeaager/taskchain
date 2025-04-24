import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi";
export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-gray-700 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">TaskChain</h1>
        </header>

        {isConnected ? (
          <div className="flex items-center gap-4">
            <p className="text-sm">
              Connected:{address?.substring(0, 6)}...{address?.substring(38)}
            </p>
            <button
              onClick={() => disconnect()}
              className="bg-red-500 text-white px-4 py-2 rounded-2xl"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={() => connect({ connector: injected() })}>
            Connect
          </button>
        )}

        {isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-2">You're Connected</h2>
            <p>Now we can start working on tasks.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl mb-2">Welcome to BlockTasks</h2>
            <p className="text-gray-100 mb-6">
              Please connect your wallet to get started.
            </p>
          </div>
        )}
        <div className="text-center py-12">
          <h2 className="text-xl mb-2">Welcome to TaskChain</h2>
          <p className="text-gray-200 mb-6">
            This is where you will manage your tasks
          </p>
        </div>
      </div>
    </div>
  );
}
