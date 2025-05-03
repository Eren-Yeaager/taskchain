import { taskBoardABI } from "shared";
import { reputationBadgeABI } from "shared";
import { Address } from "viem";
export const taskBoardAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const reputationBadgeAddress =
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const TaskBoardConfig = {
  address: taskBoardAddress as Address,
  abi: taskBoardABI,
};

export const ReputationBadgeConfig = {
  address: reputationBadgeAddress as Address,
  abi: reputationBadgeABI,
};
