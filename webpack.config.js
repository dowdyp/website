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
            "@static": path.resolve(__dirname, "web/static/"),
            "@util": path.resolve(__dirname, "web/util/"),
            "@react": path.resolve(__dirname, "web/react/"),
            "@styles": path.resolve(__dirname, "web/stylesheets/"),
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
        }, {
            test: /\.(png|jpg|jpeg)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './web/index.html'
        })
    ]
}