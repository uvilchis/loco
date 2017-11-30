const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');

module.exports.getStops = (data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/google_transit/stops.txt', 'utf8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        const keys = content.split('\n').shift().split(',') // the first line at the document's head
        const vals = content.split('\n').slice(1,-1); // the values to be assigned to each key
        const parsed = [];
        for (let i = 0; i < vals.length; i++) {
          const datObj = {};
          item = vals[i].split(',');
          for (let j = 0; j < keys.length; j++) {
            datObj[keys[j]] = item[j];
          }
          parsed.push(datObj);
        }
        resolve(parsed);
      }
    })
  })
}

module.exports.getStopTimes = (data) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(__dirname + '/google_transit/stop_times.txt', 'utf8', (err, content) => {
      if (err) {
        reject(err)
      } else {
        const keys = content.split('\n').shift().split(',');
        const vals = content.split('\n').slice(1, -1);
        const parsed = [];
        for (let i = 0; i < vals.length; i++) {
          const datObj = {};
          item = vals[i].split(',');
          for (let j = 0; j < keys.length; j++) {
            datObj[keys[j]] = item[j];
          }
          parsed.push(datObj);
        }
        resolve(parsed);
      }
    })
  })
}

// app.listen(5700, () => {
//   console.log('listening on localhost:5700');
// })
