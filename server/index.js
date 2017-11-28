var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var protobuf = require('protobufjs');

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};

app.use(logger);
// app.use(bodyParser.raw());
app.use(express.static(__dirname + '/dist'));

app.get('/test', (req, res) => {
  var decoder;
  protobuf.load(`${__dirname}/lib/proto/nyct-subway.proto`)
  .then((root) => {
    decoder = root.lookup('transit_realtime');
    console.log(decoder);
  })
  .then(() => {
    return axios.get('http://datamine.mta.info/mta_esi.php?key=b9562b987b663ac9940c5d42f1194cad');
  })
  .then((data) => {
    // let test = decoder.decode(data);
    console.log(test);
  })
  .catch((error) => {
    console.log(error);
  });
});

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));