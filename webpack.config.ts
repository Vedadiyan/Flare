import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: webpack.Configuration = {
    mode: 'production',
    entry: './test/app.ts',
    resolve: {
        extensions: ['.ts', '.json', '.js', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader'
                },
                exclude: "/node_modules/",
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './test/index.html',
            filename: './index.html',

        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
};

export default config;