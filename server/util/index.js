const isLoggedIn = (req) => req.user ? !!req.user : false;

// For use with sessions
const checkUser = (req, res, next) => isLoggedIn(req) ? next() : res.sendStatus(403);

module.exports = {
  isLoggedIn,
  checkUser
};