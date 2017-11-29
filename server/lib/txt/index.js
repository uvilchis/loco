const express = require('express');
const app = express();
const fs = require('fs');

app.get('/');

app.get('/cal', (req, res) => {
  fs.readFile(__dirname + '/google_transit/stop_times.txt', 'utf8', (err, content) => {
    if (err) {
      console.log('ERROR GETTING FILE', err);
    } else {
      const keys = content.split('\r\n').slice(0, 1).join('').split(',');
      const cal = content.split('\r\n').slice(1, -1);
      const parsed = [];
      for (let i = 0; i < cal.length; i++) {
        const datObj = {};
        item = cal[i].split(',');
        for (let j = 0; j < keys.length; j++) {
          datObj[keys[j]] = item[j];
        }
        parsed.push(datObj);
      }
      console.log(parsed[2]);
      res.sendStatus(200);
    }
  })
});

app.listen(5700, () => {
  console.log('listening on localhost:5700');
})
