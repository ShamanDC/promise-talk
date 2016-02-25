var path = require('path');
var express = require('express');
// Webpack
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
// User config
var host = '';
var port = 8080;

// Fixes for HMR
webpackConfig.output.publicPath = 'http://' + (host ? host : 'localhost') + ':' + port + '/';
webpackConfig.entry[0] = webpackConfig.entry[0].replace('localhost', (host ? host : 'localhost') + ':' + port);

var app = express();
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/files/*', function (req, res) {
    res.sendFile(path.join(__dirname, req.url));
});


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(port, host, function (error) {
    if (error) {
        console.log(error); // eslint-disable-line no-console
        return;
    }

    console.log('Listening at http://' + (host || 'localhost') + ':' + port); // eslint-disable-line no-console
});
