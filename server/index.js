var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var protobuf = require('protobufjs');
var protoParser = require('./lib/proto');
var txtParser = require('./lib/txt')

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};

app.use(logger);
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.get('/test', (req, res) => {
  var decoder;
  protoParser()
  .then((decoded) => {
    console.log(decoded);
    res.send(decoded);
  })
  .catch((error) => {
    console.log(error);
    res.send(404);
  });
});

app.get('/stops', (req, res) => {
  txtParser.getStops()
  .then((data) => {
    console.log(data)
    res.send(data)
  })
  .catch((error) => {
    console.log(error)
    res.send(404)
  })
})

app.get('/stoptimes', (req, res) => {
  txtParser.getStopTimes()
  .then((data) => {
    console.log(data)
    res.send(data)
  })
  .catch((error) => {
    console.log(error)
    res.send(404)
  })
})

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));
