const protobuf = require('protobufjs');
const path = require('path');
const http = require('http');
const { URLS } = require('../../env');

const fetchMain = (data) => {
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
    http.get(URLS.RT_MAIN, parse);
  });
};

module.exports = {
  fetchMain
};