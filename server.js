const path = require('path');

const express = require('express');

const webpack = require("webpack");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

const cors = require('cors');

const app = express();

var web3 = require('web3');

const {
  NODE_ENV,
  PORT
} = process.env;

const isProduction = () => NODE_ENV === 'production';

// TODO Evaluate security of this further.
app.use(cors());

// index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Node Dependencies
// TODO Remove, move to webpack
app.use('/node_modules', express.static('node_modules'));

app.use('/public', express.static('public'));

// Webpack
if (isProduction()) {
  app.use('/dist', express.static('dist'));
} else {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/dist/'
  }));
}

// Start
console.debug(`Starting server on port ${PORT} ...`);
app.listen(PORT, () => console.debug('Server started'));
