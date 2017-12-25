'use strict';
const assert = require("assert");
const SHA256 = require("crypto-js/sha256");

let pow = require("../app/scripts/pow.js");

describe('pow.js', function() {

    it('generatePoWToken', function() {
        this.timeout(60000);
        let _challenge = "randomChallenge";
        let _difficulty = 4;
        let generator = pow.generatePoWToken(_challenge, _difficulty);
        let next;
        do {
            next = generator.next();
        } while (!next.done);
        let nonce = next.value;
        let result = SHA256(`${_challenge} + ${nonce}`).toString();
        let arrayOfZeros = [];
        for (var i = 1; i <= _difficulty; i++) {
            arrayOfZeros.push(0);
        }
        let stringOfZeros = arrayOfZeros.join("")
        assert(result.substring(0, _difficulty) == stringOfZeros, `result.substring(0, _difficulty) == stringOfZeros: ${result.substring(0, _difficulty)} == ${stringOfZeros}`)
    });

})