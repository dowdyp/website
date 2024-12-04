const path = require("path");
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './web/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@svgs": path.resolve(__dirname, "web/svgs/"),
            "@util": path.resolve(__dirname, "web/util/"),
            "@react": path.resolve(__dirname, "web/react/"),
            "@style-util": path.resolve(__dirname, "web/stylesheets/util/"),
        }
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: '/node-modules/',
            use: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', {
                loader: "sass-loader",
                options: {
                    implementation: require("sass")
                }
            }],
        }, {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './web/index.html'
        })
    ]
}