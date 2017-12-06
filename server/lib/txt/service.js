const parseString = require('xml2js').parseString;
const http = require('http');
const { URLS } = require('../../env');

const matcher = new RegExp(/\r|\n|&nbsp;|<\/?[^>]+(>|$)/g);

const fetchServiceStatus = () => {
  return new Promise((resolve, reject) => {
    let parse = (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('error', (error) => reject(error));
      res.on('end', () => {
        parseString(data, (error, { service }) => {
          if (error) { return reject(error); }
          let lineFormat = (a) => {
            for (let key in a) { a[key] = a[key][0]; }
            a.text = a.text.replace(matcher, '').split(' ').filter((a) => a).join(' ');
            a.Time = a.Time.trim();
            return a;
          };
          let data = {
            responsecode: service.responsecode[0],
            timestamp: service.timestamp[0],
            lines: service.subway[0].line.map(lineFormat)
          };
          resolve(data);
        });
      });
    };
    http.get(URLS.SERVICE, parse);
  });
};

module.exports = {
  fetchServiceStatus
};