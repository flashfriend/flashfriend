const authControllers = {};

authControllers.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).redirect('/home');
  }
}

module.exports = authControllers;