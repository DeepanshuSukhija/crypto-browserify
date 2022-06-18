const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * @type {webpack.Configuration}
 */
const config = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './crypto-browserify/index.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    extensions: ['.js'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  output: {
    filename: 'crypto-browserify.bundle.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
};

module.exports = config;
