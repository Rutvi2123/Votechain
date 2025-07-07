const hre = require("hardhat");

async function main() {
    const VoteManager = await hre.ethers.getContractFactory("VoteManager");
    const voteManager = await VoteManager.deploy();

    await voteManager.waitForDeployment();

    console.log("VoteManager deployed to:", await voteManager.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});