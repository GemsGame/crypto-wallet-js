const bjs = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);

const generateWallets = (count, xpub) => {

  let wallets = '';

  for (let i = 0; i < count; ++i) {

    const { address } = bjs.payments.p2pkh({
      pubkey: bip32.fromBase58(xpub, bjs.networks.bitcoin).derive(0).derive(i).publicKey,
      network: bjs.networks.bitcoin
    });
    wallets += address + ',' + '\n';
  }
  return wallets;
}

module.exports = { generateWallets };
