var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};

app.use(logger);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));