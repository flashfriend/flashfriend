const authControllers = {};

authControllers.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    console.log('NOT AUTHORIZED REDIRECTING!')
    res.status(401).redirect('/');
  }
}

module.exports = authControllers;