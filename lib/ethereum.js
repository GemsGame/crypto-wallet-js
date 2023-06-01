const Web3EthAccounts = require('web3-eth-accounts');
const account = new Web3EthAccounts('ws://localhost:8546');

const createEthWallet = (amount) => {
  let wallets = '';
  for (let i = 0; i < amount; i++) {
    const { address, privateKey } = account.create();
    wallets += address+ ':' +privateKey + ',' + '\n'
  }
  
  return wallets;
}

module.exports = { createEthWallet };