const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Token', () => {
    it('has a name', async () => {
        // Obtain the Token from the blockchain
        const Token = await ethers.getContractFactory('Token');

        // Deploy the contract
        const token = await Token.deploy('My Token');

        // read token name
        const name = await token.name();

        // check the name is correct
        expect(name).to.equal('My Token');

    })
});