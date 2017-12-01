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
        content = content.split('\n');
        content.pop(); // Don't want last item
        const keys = content.shift().split(',');
        const vals = content;
        const parsed = [];
        for (let i = 0; i < vals.length; i++) {
          let dataObj = {};
          let val = vals[i].split(',');
          if (val[0].includes('GS')) { continue; }
          // 0 = trip_id, 1 = arrival_time, 4 = stop_id
          let tripArray = val[0].split('_');
          let routeId = tripArray[2].split('.')[0];
          let routeType = tripArray[0].slice(-3);
          dataObj.route_id = routeId;
          dataObj.route_type = routeType;
          dataObj[keys[1]] = val[1];
          dataObj[keys[3]] = val[3];
          parsed.push(dataObj);
        }
        resolve(parsed);
      }
    })
  })
}

module.exports.getRoutes = (data) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(__dirname + '/google_transit/routes.txt', 'utf8', (err, content) => {
      if (err) {
        reject(err)
      }  else {
        content = content.split('\r\n');
        // const desiredKeys = [0, 4];
        content.pop(); // Last element is undesired
        const keys = content.shift().split(',');
        const vals = content.map((a) => a.split(/,(?!\s)/))
        const parsed = [];
        vals.forEach((val) => {
          let dataObj = {};
          // 0 = route_id, 4 = route_desc
          dataObj[keys[0]] = val[0];
          dataObj[keys[4]] = val[4].replace(/\"/g, '');
          parsed.push(dataObj);
        });
        resolve(parsed);
      }
    })
  })
}
