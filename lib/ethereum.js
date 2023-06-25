const ethers = require('ethers');

const createEthWallet = (amount) => {
  let wallets = '';
  for (let i = 0; i < amount; i++) {
    const { address, privateKey } = ethers.Wallet.createRandom();
    wallets += address+ ':' +privateKey + ',' + '\n'
  }
  
  return wallets;
}

const createSeed = () => {
  return ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16))
}

const createWalletBySeed = async (seed, amount) => {
  const node = ethers.Wallet.fromPhrase(seed);

  let wallets = '';
  for (let i = 0; i < amount; i++) {
    const path = "m/44'/60'/0'/0/" + i;
    const address = await node.derivePath(path).getAddress();
    const private = node.derivePath(path).privateKey;
    wallets += address + ':' + private + ',' + '\n';
  }
  return wallets;
}

module.exports = { createEthWallet, createSeed, createWalletBySeed };