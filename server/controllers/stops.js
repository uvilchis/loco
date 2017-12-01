const db = require('../db/index')

const getStops = (req, res) => {
  queryStr = `SELECT stop_id, stop_name from stops`;
  db.query(queryStr, (err, data)) => {
    if (err) {
      console.log('ERROR GETTING STOPS!', err)
    } else {
      res.send(data)
    }
  }
}

module.exports = {
  getStops
}