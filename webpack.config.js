const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const { logger } = require("./build/logger");
const { config, isProd } = require("./build/procConfig");

function bundleAnalyzer(arr, enable) {
    if (enable) {
        arr.push(new BundleAnalyzerPlugin({
            analyzerMode: "static"
        }));
    }
}

function htmlWebpackPlugin(arr, path) {
    arr.push(new HtmlWebpackPlugin({
        template: path,
        meta: {
            charset: "utf-8",
            viewport: "width=device-width; initial-scale=1",
            description: `Parker Dowdy - experience, ramblings, and more(eventually)`
        }
    }));
}

function miniCssExtractPlugin(arr) {
    arr.push(new MiniCssExtractPlugin({
        filename: "main.[contenthash].css"
    }));
}

const getWebpackPlugins = (options) => {
    let plugins = [];
    htmlWebpackPlugin(plugins, options.templatePath);
    bundleAnalyzer(plugins, options.enableBundleAnalyzer);
    miniCssExtractPlugin(plugins);
    return plugins;
}


logger.info("Is production:", isProd)

module.exports = {
    mode: config.nodeEnv,
    entry: './web/index.tsx',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, "web"),
        }
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@svgs": path.resolve(__dirname, "web/svgs/src/"),
            "@static": path.resolve(__dirname, "web/static/"),
            "@util": path.resolve(__dirname, "web/util/"),
            "@react": path.resolve(__dirname, "web/react/"),
            "@styles": path.resolve(__dirname, "web/stylesheets/"),
            "@ml": path.resolve(__dirname, "web/ml/")
        }
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: '/node-modules/',
            use: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: [
                isProd ? MiniCssExtractPlugin.loader : "style-loader", 
                'css-loader', 
                {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }
            ],
        }, {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }, {
            test: /\.(png|jpg|jpeg)$/,
            loader: 'file-loader',
            options: {
                outputPath: "static"
            }
        }]
    },
    plugins: getWebpackPlugins({
        templatePath: "./web/index.html",
        enableBundleAnalyzer: false
    })
}