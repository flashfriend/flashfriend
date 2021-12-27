const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// HANDLE STATIC FILES + JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// AUTH AND SESSION START
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport');

app.use(
  cookieSession({
    name: 'github-auth-session',
    keys: ['key1', 'key2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.redirect('/');
  }
);
// AUTH AND SESSION END

app.get('/', (req, res) => {
  res.send(`Hello world`);
});

// LOG IN AND LOG OUT
app.get('/login', (req, res) => res.redirect('/auth/github'))
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


// ERROR HANDLING
app.use((req, res) => res.status(404).send('Not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
