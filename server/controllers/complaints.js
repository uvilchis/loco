const db = require('../db/index');

const postComplaint = (req, res) => {
  inputStr = `INSERT INTO users (username, complaint) VALUES ('${req.body.username}', '${req.body.complaint}')`
}