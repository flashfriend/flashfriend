const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const authController = require('./controllers/authController');

// HANDLE STATIC FILES + JSON + CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(cors());

// app.use(express.static(path.join(__dirname, '../client/public')));

// CATCH ALL PASSPORT JS
// app.use((req, res, next) => {
//   console.log('CATCH ALL PASSPORTJS USER: ', res.locals.currentUser)
//   return next();
// })

// LOG IN AND LOG OUT
app.get('/login', (req, res) => {
  res.redirect('/auth/github');
})

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.use('*', authController.isLoggedIn, (req, res, next)=> {
  if (req._parsedOriginalUrl.pathname.includes('/auth') || req._parsedOriginalUrl.pathname.includes('/api')) {
    console.log(req._parsedOriginalUrl.pathname)
    next()
  } else {
    console.log(req._parsedOriginalUrl.pathname)
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  }
});

// Card Router
const cardsRouter = require('./routers/cardsRouter');
app.use('/api/cards', cardsRouter);

// AUTH AND SESSION
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
    res.redirect('/home')
  }
);

app.get('/api/userid', (req,res) => {
  console.log('HIT /API/USER ENDPOINT: ', req.user);
  res.status(230).json(req.user.id);
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
