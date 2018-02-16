if (process.env.ENV === 'prod') {
  module.exports = require('./store.prod');
} else {
  module.exports = require('./store.dev');
}