
const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

//  Define the individual Block
class Block{
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; 
    }

    // Calculate the hash for each block - then pass as a prop
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }
    // Proof of Work
    mineBlock(difficulty){
        while(this.hash.substring(0,  difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        // Increasing the difficulty adds more zeros to the front of Block slowing down successful mining
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    // This is the first block of the chain - it has no previousHash
    createGenesisBlock(){
        return new Block("06/17/2019", "Genesis Block", "0");
    }

    // Grab the block at the end of the chain
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!')
    this.chain.push(block);

    this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.miningReward)
    ];
}

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){   //loop thru the chain
            for(const trans of block.transactions){
                if(trans.fromAddress === address){ // collect payments from wallet
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){ // collect payments to wallet
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    //  Ensure the Chain is valid before adding the new Block
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];



            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
            return true;
        }
    }

    export default Blockchain;
    export default Transaction;