const fs = require("fs");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

function generate(index) {
  const privateKey = toHex(secp.utils.randomPrivateKey());
  const PublicKey = toHex(secp.getPublicKey(privateKey).slice(-20));

  console.log(`publicKey${index}:  ${PublicKey}`);
  console.log(`PrivateKey${index}:  ${privateKey}`);
}

for (let i = 1; i < 4; i++) {
  generate(i);
}
