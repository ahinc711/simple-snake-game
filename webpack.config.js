const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true
    },
    entry: {
        index: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Snaaaake!',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            // CSS module loader. Allows us to import CSS files from the JS source and include them
            // in the resulting page(s)
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // Image loader. Allows us to import images int he JS source.
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};