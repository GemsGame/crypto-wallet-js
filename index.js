#!/usr/bin/env node

const yargs = require("yargs");
const package = require("./package.json");
const ethereum = require("./lib/ethereum.js");
const tron = require("./lib/tron.js");
const bitcoin = require("./lib/bitcoin.js");
const fs = require("fs");

yargs.version(package.version);
yargs.command({
  command: "create",
  describe: "main command for wallet creation",
  builder: {
    network: {
      type: "string",
      demandOption: true,
      describe: "Networks: eth, bitcoin, tron",
    },
    amount: {
      type: "number",
      demandOption: true,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: true,
      describe: "D:/file.txt",
    },
  },
  handler({ network, amount, path }) {
    if (network === "eth") {
      const result = ethereum.createRandomWallets(amount);
      fs.writeFile(path, JSON.stringify(result), (error) => {
        if (error) throw error;
      });
    }
    if (network === "tron") {
      tron.createRandomWallets(amount).then((wallets) => {
        fs.writeFile(path, wallets, (error) => {
          if (error) throw error;
        });
      });
    }
  },
});

yargs.command({
  command: "create-by-seed",
  describe: "",
  builder: {
    network: {
      type: "string",
      demandOption: false,
      describe: "Networks: eth, bitcoin, tron",
    },
    amount: {
      type: "number",
      demandOption: false,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: true,
      describe: "D:/file.txt",
    },
    seed: {
      type: "string",
      demandOption: false,
      describe: "",
    },
  },

  async handler({ network, amount, path, seed }) {
    if (network === "eth" || network === "ethereum") {
      if (!seed) seed = ethereum.createSeed();
      const result = await ethereum.createWalletsBySeed(seed, amount);

      fs.writeFile(path, JSON.stringify(result), (error) => {
        if (error) throw error;
      });
    }

    if (network === "bitcoin" || network === "btc") {

      if (!seed) {
        const mnemonic = bitcoin.createMnemonic();
        const _seed = bitcoin.createSeed(mnemonic);
        const result = bitcoin.createWalletsBySeed(_seed, mnemonic, amount);

        fs.writeFile(path, JSON.stringify(result), (error) => {
          if (error) throw error;
        });
      } else {

        const _seed = bitcoin.createSeed(seed);
        const result = bitcoin.createWalletsBySeed(_seed, seed, amount);

        fs.writeFile(path, JSON.stringify(result), (error) => {
          if (error) throw error;
        });
      }

    }

    if (network === 'tron') {
      if (!seed) {
        const mnemonic = tron.createMnemonic();
        const _seed = tron.createSeed(mnemonic);
        const result = tron.createWalletsBySeed(_seed, mnemonic, amount);

        fs.writeFile(path, JSON.stringify(result), (error) => {
          if (error) throw error;
        });
      } else {

        const _seed = tron.createSeed(seed);
        const result = tron.createWalletsBySeed(_seed, seed, amount);

        fs.writeFile(path, JSON.stringify(result), (error) => {
          if (error) throw error;
        });
      }
    }


  },
});

yargs.command({
  command: "create-seed",
  describe: "The command create a new 12 words phrase",
  handler({ network }) {
    if (network === "btc" || network === "bitcoin") {
      const seed = ethereum.createSeed();
      console.log(seed);
    }

    if (network === "eth" || network === "ethereum") {
      const seed = ethereum.createSeed();
      console.log(seed);
    }

    if (network === "tron") {
      const seed = tron.createMnemonic()
      console.log(seed);
    }
  },
});

yargs.command({
  command: "create-by-xpub",
  describe: "",
  builder: {
    amount: {
      type: "number",
      demandOption: false,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: true,
      describe: "D:/file.txt",
    },
    xpub: {
      type: "string",
      demandOption: true,
      describe: "bitcoin xpub",
    },
  },

  async handler({ amount, xpub, path }) {
    const result = bitcoin.createWalletsByXpub(amount, xpub);
    fs.writeFile(path, JSON.stringify(result), (error) => {
      if (error) throw error;
    });
  },
});

yargs.command({
  command: "create-by-zpub",
  describe: "",
  builder: {
    amount: {
      type: "number",
      demandOption: false,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: true,
      describe: "D:/file.txt",
    },
    zpub: {
      type: "string",
      demandOption: true,
      describe: "bitcoin zpub",
    },
  },

  async handler({ amount, zpub, path }) {
    const result = bitcoin.createWalletsByXpub(amount, zpub);
    fs.writeFile(path, JSON.stringify(result), (error) => {
      if (error) throw error;
    });
  },
});

yargs.parse();


module.exports = { ethereum, tron, bitcoin }