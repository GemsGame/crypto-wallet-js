const ethers = require('ethers');

const createEthWallet = (amount) => {
  let wallets = [];
  for (let i = 0; i < amount; i++) {
    const { address, privateKey } = ethers.Wallet.createRandom();

    const wallet = {
      address,
      privateKey
    };

    wallets.push(wallet);
  }

  const result = {
    wallets
  }
  return result;
}

const createSeed = () => {
  return ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16))
}

const createWalletBySeed = (seed, amount) => {
  const node = ethers.Wallet.fromPhrase(seed);
  
  let wallets = [];
  for (let i = 0; i < amount; i++) {
    const path = "m/44'/60'/0'/0/" + i;
    const address = await node.derivePath(path).getAddress();
    const private = node.derivePath(path).privateKey;
   
    const wallet = {
      address,
      private
    }

    wallets.push(wallet);
  }

  const result = {
    seed,
    wallets
  }
  return result;
}

module.exports = { createEthWallet, createSeed, createWalletBySeed };