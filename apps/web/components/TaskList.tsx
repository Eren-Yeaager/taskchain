import { useState, useEffect } from "react";
import { TaskBoardConfig } from "@/lib/contracts";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function TaskList() {
  const { address } = useAccount();
  const [task, setTasks] = useState<Task[]>([]);
  const { writeContract } = useWriteContract();

  const { data: userTaskIds, refetch: refetchTaskIds } = useReadContract({
    ...TaskBoardConfig,
    functionName: "getUserTasks",
    args: [address],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userTaskIds) {
        setTasks([]);
        return;
      }
    };
  });
}
