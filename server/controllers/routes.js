const getRoutes = (req, res) => {
  db.getRoutes()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getRoute = (req, res) => {
  res.send(200);
}

module.exports = {
  getRoutes,
  getRoute
};