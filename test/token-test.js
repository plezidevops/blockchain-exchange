const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {

    let token, accounts, deployer, receiver;

    beforeEach(async () => {
        // Obtain the Token from the blockchain
        const Token = await ethers.getContractFactory('Token');
        // Deploy the contract
        token = await Token.deploy('Dapp University', 'DAPP', 18, 10000000)

        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1]
    });

    describe('Deployment', () => {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = '18';
        const totalSupply = '10000000000000000000000000';

        it('has correct name', async () => {
            expect(await token.name()).to.equal(name);
        })

        it('has correct symbol', async () => {
            expect(await token.symbol()).to.equal(symbol);
        })

        it('has correct decimals', async () => {
            expect(await token.decimals()).to.equal(decimals);
        })

        it('has correct total supply', async () => {
            expect(await token.totalSupply()).to.equal(totalSupply);
        })

        it('assigns total supply to deployer', async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
        })
    })

    describe('Sending Token', () => {
        let amount ;
        it('Transfer token balances', async () => {
            // transfer token
            amount = tokens(190);
            let transaction = await token.connect(deployer).transfer(receiver.address, amount);
            let result = transaction.wait();
        })
    })
});