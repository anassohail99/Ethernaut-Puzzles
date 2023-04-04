import { TransactionResponse } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

const CONTRACT_NAME = "CoinFlip";
const ATTACKER_CONTRACT_NAME = "CoinFlipAttacker";

describe(CONTRACT_NAME, () => {
  let _owner: SignerWithAddress;
  let attacker: SignerWithAddress;
  let contract: Contract;
  let contractAttakcer: Contract;
  let tx: TransactionResponse;

  beforeEach(async () => {
    [_owner, attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    contract = await factory.deploy();
    await contract.deployed();

    contract = contract.connect(attacker);

    const factoryAttacker = await ethers.getContractFactory(ATTACKER_CONTRACT_NAME);
    contractAttakcer = await factoryAttacker.deploy(contract.address);
    await contractAttakcer.deployed();

    contractAttakcer = contractAttakcer.connect(attacker);
  });

  it("Solves the challenge 03", async () => {
    for (let index = 0; index < 10; index++) {
      tx = await contractAttakcer.attack();
      await tx.wait(1);
    }
    expect(await contract.consecutiveWins()).to.equal(10);
  });
});
