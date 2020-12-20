const path = require('path');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.MODE === 'dev';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Трава у дома',
            template: 'template.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'assets', 'img'), to: path.resolve(__dirname, 'dist', 'img') }
            ]
        }),
        new CleanWebpackPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['svgo', {
                        plugins: [
                            {
                                removeViewBox: false
                            }
                        ]
                    }
                    ]
                ]
            }
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|webp|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './src/assets/img/'
                    }
                }]
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader',
                exclude: /(node_modules)/
            }
        ]
    }
};
