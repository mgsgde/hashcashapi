'use strict';
const SHA256 = require("crypto-js/sha256");

self.addEventListener('message', function(e) {
    let result = generatePoWToken(e.data.challenge, e.data.difficulty);
    self.postMessage({ nonce: result.nonce, hash: result.hash });
}, false);


function generatePoWToken(_challenge, _difficulty) {
    let nonce = -1;
    let result;
    let arrayOfZeros = [];
    for (var i = 1; i <= _difficulty; i++) {
        arrayOfZeros.push(0);
    }
    let stringOfZeros = arrayOfZeros.join("")
    do {
        result = SHA256(`${_challenge} + ${++nonce}`).toString();
    } while (result.substring(0, _difficulty) != stringOfZeros);
    return { nonce: nonce, hash: result };
}