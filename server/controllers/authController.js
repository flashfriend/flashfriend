const authControllers = {};

authControllers.isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.status(401).redirect('/');
  }
}

module.exports = authControllers;