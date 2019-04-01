/**
 * Used to compile a js build
 */
const path = require('path');

module.exports = {
  entry: './src/radar.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'radar.js',
    library: 'radar',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
  }
};
