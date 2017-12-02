const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const protobuf = require('protobufjs');
const protoParser = require('./lib/proto');
const mongoose = require('./db/mongo').mongoose;
const mysql = require('./db/mtaSched');
const { router } = require('./routes');
const txtParser = require('./lib/txt');

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};
app.use(logger);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
app.use('/', router);

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));
