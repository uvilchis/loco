const path = require('path');
const SRC = path.join(__dirname, '/client');
const DIST = path.join(__dirname, '/server/dist');

module.exports = {
  entry: "./client/Main.jsx",
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC,
        use: ['babel-loader']
      }
    ]
  }
};
