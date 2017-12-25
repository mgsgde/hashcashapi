const path = require("path");

module.exports = {
    entry: {
        bundle: './app/index',
        pow: "./app/scripts/pow.js",
    },
    output: {
        path: path.join(__dirname, '/public/'),
        filename: "[name].js"
    },

    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2017']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
        ]
    }
}