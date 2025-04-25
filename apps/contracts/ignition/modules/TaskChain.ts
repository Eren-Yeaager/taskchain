import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TaskChain", (m) => {
  const taskBoard = m.contract("TaskBoard");

  const reputationBadge = m.contract("ReputationBadge");

  return { taskBoard, reputationBadge };
});
