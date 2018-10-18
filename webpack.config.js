const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
    entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            { test: /\.(js)$/, exclude: /(node_modules)/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader' ]}
        ]
    },
    devServer: {    
        historyApiFallback: true
    },
    plugins: [new HtmlWebPackPlugin({
        template: 'app/index.html'
    })]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env' : {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;