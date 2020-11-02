import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
    context: __dirname,

    entry: {
        index: './src',
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        module: 'es2015',
                    },
                },
            },
            {
                test: /\.css/,
                exclude: /\.module\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.module\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ],
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: './public/favicon.ico'
        })
    ],
};

export default config;