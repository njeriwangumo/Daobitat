const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Example contract deployment (replace 'PropertyToken' with your contract name)
  const PropertyToken = await hre.ethers.getContractFactory("PropertyToken");
  const propertyToken = await PropertyToken.deploy();

  await propertyToken.deployed();

  console.log("PropertyToken deployed to:", propertyToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
