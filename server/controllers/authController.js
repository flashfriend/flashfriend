const authControllers = {};

authControllers.isLoggedIn = (req, res, next) => {
  console.log('isloggedin', req.cookies)
  next();
  // if (req.user) {
  //   console.log('checked')
  //   next();
  // } else {
  //   res.status(401).redirect('/login');
  // }
}

module.exports = authControllers;