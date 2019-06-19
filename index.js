import { Blockchain, Transaction } from './src/blockchain'; 



// Instance of Blockchain
const docCoin = new Blockchain();

// Transactions
docCoin.createTransaction( new Transaction('address1', 'address2', 100));
docCoin.createTransaction( new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
docCoin.minePendingTransactions('napoleons-address');

console.log('\nBalance in Napoleon is ', docCoin.getBalanceOfAddress('napoleon-address'));

console.log('\n Starting the miner to move transaction out of pending into wallet...');
docCoin.minePendingTransactions('napoleons-address');

console.log('\nBalance in Napoleon is ', docCoin.getBalanceOfAddress('napoleons-address'));

// console.log('Mining block 1...');
// docCoin.addBlock(new Block(1, "06/12/2019", { amount: 10 }));

// console.log('Mining block 1...');
// docCoin.addBlock(new Block(2, "06/18/2019", { amount: 20 }));

// console.log('Is blockchain valid? ' + docCoin.isChainValid());

// // Test - change the data inside a Block
// docCoin.chain[1].data = { amount: 100 }; //false

// // Test - recalculate an existing Block's hash (breaks relationship to previous Block)
// docCoin.chain[1].hash = docCoin.chain[1].calculateHash(); //false

// // Test
// console.log(JSON.stringify(docCoin, null, 4));