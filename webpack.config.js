const path = require('path');

module.exports = {
  entry:['babel-polyfill','./lib/components/Index.js'],
  output: {
    path:path.resolve(__dirname,'public'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      { test: /\.js$/,exclude:/node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'],}
    ]
  }
};
