const authControllers = {};

authControllers.isLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log('USER IS LOGGED IN: ', req.user)
    return next();
  } else {
    console.log('NOT AUTHORIZED REDIRECTING!')
    res.status(401).redirect('/');
  }
}

module.exports = authControllers;