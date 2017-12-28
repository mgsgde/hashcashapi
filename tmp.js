'use strict';
const fs = require('fs');

const pictureDirectory = `${__dirname}/public/pictures`

fs.readdir(pictureDirectory, (err, files) => {
    if (err) throw err;
    let rand = files[Math.floor(Math.random() * files.length)];
    console.log(`${__dirname}/public/pictures/${rand}`)
})