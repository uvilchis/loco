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
        parseString(data, (error, result) => {
          if (error) {
            return reject(error);
          }
          console.log(result.service.subway[0].line);
          result.service.subway[0].line.forEach((a) => {
            a.text[0] = a.text[0].replace(matcher, '').split(' ').filter((a) => a).join(' ');
          });
          resolve(result);
        })
      });
    };
    http.get(URLS.SERVICE, parse);
  });
};

module.exports = {
  fetchServiceStatus
};