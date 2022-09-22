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
        token = await Token.deploy('Dapp University', 'DAPP', 10000000)

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

        let amount, transaction, result;

        beforeEach( async () => {
            // Amount of tokens we want to transfer to receiver
            amount = tokens(190);
            // connecting to the smart contract as deployer to transfer token to receiver
            transaction = await token.connect(deployer).transfer(receiver.address, amount);
            result = await transaction.wait();

        })

        it('Transfer token balances', async () => {
            // console.log(`Deployer: ${deployer.address} balance before transfer ${await token.balanceOf(deployer.address)}`)
            // console.log(`Receiver: ${receiver.address} balance before transfer ${await token.balanceOf(receiver.address)}`)
            // console.log(`amount tokens deployer is sending: ${amount}`)

            // Making sure transfer is indeed happened
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(9999810))
            expect(await token.balanceOf(receiver.address)).to.equal(amount);

            // console.log(`Deployer: ${deployer.address} balance after transfer ${await token.balanceOf(deployer.address)}`)
            // console.log(`Receiver: ${receiver.address} balance after transfer ${await token.balanceOf(receiver.address)}`)
            // console.log(result);
        })
    })
});
