var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var protobuf = require('protobufjs');
var protoParser = require('./lib/proto');
var { router } = require('./routes');

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};
app.use(logger);
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
app.use('/', router);

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));