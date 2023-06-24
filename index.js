#!/usr/bin/env node

const yargs = require('yargs');
const package = require('./package.json');
const ethereum = require("./lib/ethereum.js");
const tron = require('./lib/tron.js');
const bitcoin = require('./lib/bitcoin.js');
const fs = require('fs');

yargs.version(package.version);
yargs.command({
  command: 'create',
  describe: 'main command for wallet creation',
  builder: {
    network: {
      type: 'string',
      demandOption: true,
      describe: 'Networks: eth, bitcoin, tron'
    },
    amount: {
      type: 'number',
      demandOption: true,
      describe: 'Amount of wallets, 1 for example'
    },
    path: {
      type: 'string',
      demandOption: true,
      describe: 'D:/file.txt'
    }
  },
  handler({ network, amount, path, xpub }) {
    if (network === 'eth') {
      const wallets = ethereum.createEthWallet(amount);
      fs.writeFile(path, wallets, (error) => {
        if (error) throw error;
      });
    }
    if (network === 'tron') {
      tron.createTronWallet(amount).then((wallets) => {
        fs.writeFile(path, wallets, (error) => {
          if (error) throw error;
        });
      });
    }
    if (network === 'bitcoin') {
      const wallets = bitcoin.generateWallets(amount, xpub);
      fs.writeFile(path, wallets, (error) => {
        if (error) throw error;
      });
    }
  }
});

yargs.command({
  command: 'create-by-seed',
  describe: '',
  builder: {
    network: {
      type: 'string',
      demandOption: false,
      describe: 'Networks: eth, bitcoin, tron'
    },
    amount: {
      type: 'number',
      demandOption: false,
      describe: 'Amount of wallets, 1 for example'
    },
    path: {
      type: 'string',
      demandOption: true,
      describe: 'D:/file.txt'
    },
    seed: {
      type: 'string',
      demandOption: false,
      describe: ''
    }
  },

  async handler({ network, amount, path, seed }) {

    if (network === 'eth' || network === 'ethereum') {

      if (!seed) seed = ethereum.createSeed();

      const wallets = await ethereum.createWalletBySeed(seed, amount);

      fs.writeFile(path, 'seed phrase:' + seed + '\n' + wallets, (error) => {
        if (error) throw error;
      });
    }
  }

});


yargs.command({
  command: 'create-seed',
  describe: '',
  handler() {
    const seed = ethereum.createSeed();
    console.log(seed)
  }
});




yargs.parse();