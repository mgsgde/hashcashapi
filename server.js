const express = require('express')
const app = express()
const path = require("path");
const loki = require('lokijs')
const SHA256 = require("crypto-js/sha256");
const fs = require('fs');

let challengeMapping = {};

app.use('/randomPicture', function(req, res, next) {
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

app.get('/icons/snowflake.png', (req, res) => {
    res.sendFile(__dirname + "/public/icons/snowflake.png")
})



app.get('/randomPicture', (req, res) => {
    let pic = getRandomPic();
    res.sendFile(pic)
})

app.get('/challenge.json', (req, res) => {
    let difficulty = 2;
    let challenge = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    challengeMapping[challenge] = { status: 'valid', difficulty: difficulty };
    res.json({ challenge: challenge, difficulty: difficulty })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))



let prevPic;

function getRandomPic() {
    const pictureDirectory = `${__dirname}/public/pictures`
    let files = fs.readdirSync(pictureDirectory)
    let rand = files[Math.floor(Math.random() * files.length)];
    if (prevPic && rand == prevPic) {
        return getRandomPic()
    } else {
        prevPic = rand
        return `${__dirname}/public/pictures/${rand}`;
    }

}