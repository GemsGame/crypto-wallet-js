#!/usr/bin/env node

const yargs = require('yargs');
const package = require('./package.json');
const ethereum = require("./lib/ethereum.js");
const fs = require('fs');
const path = require('path');

yargs.version(package.version);
yargs.command({
  command: 'create',
  describe: 'add new note',
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
      describe: 'D:/'
    }
  },
  handler({network, amount, path}) {
    if(network === 'eth') {
      const wallets = ethereum.createEthWallet(amount);
      fs.writeFile(path + "eth_" + new Date().toDateString() + ".txt", wallets, (error) => {
        if (error) throw error;
      });
    }  
  }
});

yargs.parse();