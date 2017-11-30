const isLoggedIn = (req) => {
  return true; // For use with sessions
}

// For use with sessions
const checkUser = (req, res, next) => {
  console.log('check!');
  next();
};

module.exports = {
  checkUser
};