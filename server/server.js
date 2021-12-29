const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const PORT = 3000;

const authController = require('./controllers/authController');

// HANDLE STATIC FILES + JSON + CORS
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(cors());

// app.use(express.static(path.join(__dirname, '../client/public')));

// LOGIN
app.get('/login', (req, res) => {
  res.redirect('/auth/github');
})


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

// FETCH USERID API
app.get('/api/userid', (req,res) => {
  res.status(230).json(req.user.id);
})

// IS AUTH CHECK
app.use('/home', authController.isLoggedIn, (req, res) => res.sendFile(path.join(__dirname, '../client/public', 'index.html')));

// LOGOUT
app.get('/logout', (req, res) => {
  console.log('LOGOUT REQUEST USER: ', req.user)
  console.log('LOGOUT REQUEST SESSION: ', req.session)
  req.session = null;
  req.user = null;
  req.logout();
  res.redirect('/');
})

// app.get('/logout', (req, res) => {
//   req.logout();
//   console.log('LOGOUT REQ.SESSION: ', req.session);
//   if (req.session) {
//     req.session.destroy(function (err) {
//       if (err) {
//         console.log(err)
//       }
//       'LOGGED OUT';
//       res.redirect('/');
//     });
//   }
// });

// ERROR HANDLING
app.use((req, res) => res.status(404).send('Not found'));

app.use((err, req, res, next) => {
  console.log(err)
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
