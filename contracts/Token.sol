//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Token {
    string public name = "My Token";

    constructor(string memory _name) {
        name = _name;
    }
}
