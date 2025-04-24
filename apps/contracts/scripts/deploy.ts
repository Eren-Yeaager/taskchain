import { viem } from "hardhat";
async function main() {
  console.log("Deploying contract...");

  const taskChain = await viem.deployContract("Taskchain.sol");
  console.log(`TaskBoard deployed to: ${taskChain.address}`);

  const reputationBadge = await viem.deployContract("ReputationBadge.sol");
  console.log(`TaskBoard deployed to: ${reputationBadge.address}`);

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
