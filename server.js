const express = require('express')
const app = express()
const path = require("path");
const loki = require('lokijs')
const SHA256 = require("crypto-js/sha256");

let challengeMapping = {};

app.use('/pictures/', function(req, res, next) {
    let nonce = req.query.nonce;
    let challenge = req.query.challenge;
    if (!challengeMapping[challenge])
        res.status(401).json({ message: "Challenge not found." })
    if (challengeMapping[challenge].status == 'invalid') {
        res.status(401).json({ message: "Nonce already used." })
    }
    let difficulty = challengeMapping[challenge].difficulty

    let result = SHA256(`${challenge} + ${nonce}`).toString();
    let arrayOfZeros = [];
    for (var i = 1; i <= difficulty; i++) {
        arrayOfZeros.push(0);
    }
    let stringOfZeros = arrayOfZeros.join("")
    if (result.substring(0, difficulty) == stringOfZeros) {
        challengeMapping[challenge].status = 'invalid';
        next();
    } else {
        res.status(401).json({ message: "Verification failed." })
    }
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(__dirname + "/public/bundle.js")
})

app.get('/pow.js', (req, res) => {
    res.sendFile(__dirname + "/public/pow.js")
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/pictures/winter.jpg', (req, res) => {
    res.sendFile(__dirname + "/public/pictures/winter.jpg")
})


app.get('/challenge.json', (req, res) => {
    let difficulty = 4;
    let challenge = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    challengeMapping[challenge] = { status: 'valid', difficulty: difficulty };
    res.json({ challenge: challenge, difficulty: difficulty })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))