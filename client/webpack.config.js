var HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.jsx'),
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sass|css)$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new dotenv()
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:3001'
        })
    }
}