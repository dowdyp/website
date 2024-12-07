const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");
const { config, isDev, isProd } = require("./procConfig");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function bundleAnalyzer(arr, enable) {
    if (enable) {
        arr.push(new BundleAnalyzerPlugin({
            analyzerMode: "static"
        }));
    }
}

function templatePath(arr, path) {
    arr.push(new HtmlWebpackPlugin({
        template: path
    }));
}

function miniCssExtractPlugin(arr) {
    arr.push(new MiniCssExtractPlugin({
        filename: "main.[contenthash].css"
    }));
}

const getWebpackPlugins = (options) => {
    let plugins = [];
    templatePath(plugins, options.templatePath);
    bundleAnalyzer(plugins, options.enableBundleAnalyzer);
    miniCssExtractPlugin(plugins);
    return plugins;
}

console.log("isProd", isProd)

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
        client: {
            overlay: false,
            progress: true,
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