const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

const createTronWallet = async (amount) => {
  let wallets = '';
  for(let i = 0; i < amount; i++) {
    const account = await tronWeb.createAccount();
    const address = account.address.base58;
    const privateKey = account.privateKey;
    wallets += address + ':' + privateKey + ',' + '\n'
  }

  return wallets;
}

module.exports = { createTronWallet};
