#!/usr/bin/env node

const yargs = require('yargs');
const package = require('./package.json');
const ethereum = require("./lib/ethereum.js");
const tron = require('./lib/tron.js');
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
  handler({network, amount, path}) {
    if(network === 'eth') {
      const wallets = ethereum.createEthWallet(amount);
      fs.writeFile(path, wallets, (error) => {
        if (error) throw error;
      });
    }
    if(network === 'tron') {
      tron.createTronWallet(amount).then((wallets) => {
        fs.writeFile(path, wallets, (error) => {
          if (error) throw error;
        });
      });
    }
  }
});

yargs.parse();