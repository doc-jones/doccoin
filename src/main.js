const { Blockchain, Transaction } = './blockchain';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('97897979874f07c8872b56d869c99cc0f6444e9d05695c2fef8ce8d3f9ebc988');
const myWalletAddress = myKey.getPublic('hex');

// Instance of Blockchain
let docCoin = new Blockchain();

// Transactions
const trans1 = new Transaction(myWalletAddress, 'place key here', 20); 
trans1.signTransaction(myKey);
docCoin.addTransaction(trans1);


console.log('\n Starting the miner...');
docCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance in Napoleon Wallet is ', docCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', docCoin.isChainValid());

// console.log('\n Starting the miner to move transaction out of pending into wallet...');
// docCoin.minePendingTransactions('napoleons-address');

// console.log('\nBalance in Napoleon is ', docCoin.getBalanceOfAddress('napoleons-address'));

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