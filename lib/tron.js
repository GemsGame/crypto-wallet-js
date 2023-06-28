const TronWeb = require('tronweb');
const bip39 = require("bip39");
const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");

const bip32 = BIP32Factory(ecc);

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

const createRandomWallet = async (amount) => {
  let wallets = [];
  for (let i = 0; i < amount; i++) {
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


const generateWalletBySeed = (seed, mnemonic, count) => {
  const node = bip32.fromSeed(seed);
  const wallets = [];

  for (let i = 0; i < count; i++) {
    const child = node.derivePath(`m/44'/195'/${0}'/0/0`);
    const privateKey = child.privateKey.toString('hex');
    const address = tronWeb.address.fromPrivateKey(privateKey);

    wallets.push({address, privateKey })
  }
  
  const result = {
    seed: mnemonic,
    wallets
  }

  return result;


}

module.exports = { createRandomWallet, generateWalletBySeed, generateMnemonic, generateSeed };
