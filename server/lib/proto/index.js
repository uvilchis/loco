var protobuf = require('protobufjs');
var path = require('path');
var http = require('http');

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    let decoder;
    let file = path.resolve(__dirname, 'nyct-subway.proto');
    protobuf.load(file)
    .then((root) => {
      decoder = root.lookupType('FeedMessage');
    })
    // let builder = protobuf.loadProtoFile(file).build('transit_realtime');
    let parse = (res) => {
      let data = [];
      let decoded;
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        data = Buffer.concat(data);
        // console.log(data.toString());
        try {
          decoded = decoder.decode(data);
        } catch (error) {
          console.log(error);
          reject(error);
        }
        resolve(decoded);      
      });
      res.on('error', (error) => reject(error));
    };
    http.get('http://datamine.mta.info/mta_esi.php?key=b9562b987b663ac9940c5d42f1194cad', parse);
  });
}