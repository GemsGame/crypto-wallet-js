const TronWeb = require('tronweb');
const bip39 = require("bip39");

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

const createRandomWallet = async (amount) => {
  let wallets = [];
  for(let i = 0; i < amount; i++) {
    const account = await tronWeb.createAccount();
    const address = account.address.base58;
    const privateKey = account.privateKey;

    const wallet = {
      address,
      privateKey
    }
    
    wallets.push(wallet);
  }

  return wallets;
}

const generateMnemonic = () => {
  return bip39.generateMnemonic();
}

const generateSeed = (mnemonic) => {
  return bip39.mnemonicToSeedSync(mnemonic);
}


const createWalletBySeed = (seed) => {
  const masterPrivateKey = seed.slice(0, 32);
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    privateKey: masterPrivateKey.toString('hex'),
  });

  console.log(tronWeb);

}

module.exports = { createRandomWallet, createWalletBySeed, generateMnemonic, generateSeed};
