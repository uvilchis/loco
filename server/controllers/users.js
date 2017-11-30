const authUser = (req, res) => {
  res.sendStatus(200);
  // // Implement user logins at some point  
  // return new Promise((resolve, reject) => {
  //   resolve();
  // });
};

const signUpUser = (req, res) => {
  res.sendStatus(200);
  // // Implement user singups at some point
  // return new Promise((resolve, reject) => {
  //   reject('not set up yet');
  // });
};

module.exports = {
  authUser,
  signUpUser
};