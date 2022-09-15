const { expect } = require("chai");
const { ethers } = require("hardhat");


describe('Token', () => {

    let token;

    beforeEach(async () => {
        // Obtain the Token from the blockchain
        const Token = await ethers.getContractFactory('Token');
        // Deploy the contract
        token = await Token.deploy('Dapp University', 'DAPP', 18, 10000000)
    });

    describe('Deployment', () => {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = '18';
        const totalSupply = '1000000000000000000';

        it('has correct name', async () => {
            // read token name
            const name = await token.name();
            // check the name is correct
            expect(name).to.equal(name);
        })

        it('has correct symbol', async () => {
            // read token name
            const symbol = await token.symbol();
            // check the name is correct
            expect(symbol).to.equal(symbol);
        })

        it('has correct decimals', async () => {
            // read token name
            const decimals = await token.decimals();
            // check the name is correct
            expect(decimals).to.equal(decimals);
        })

        it('has correct total supply', async () => {
            // read token name
            const totalSupply = await token.totalSupply();
            // check the name is correct
            expect(totalSupply).to.equal(totalSupply);
        })
    })
});