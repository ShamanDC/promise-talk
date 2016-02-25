var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?path=http://localhost/__webpack_hmr',
        './generators/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'generators/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'generators')
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'generators'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.css']
    }
};
