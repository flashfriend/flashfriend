const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// HANDLE STATIC FILES + JSON + CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));


app.use(cors());

app.use(express.static(path.join(__dirname, '../client/public')));

// LOG IN AND LOG OUT
app.get('/login', (req, res) => {
  res.redirect('/auth/github')
})

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.use('*',  (req, res, next)=> {
  // console.log(req._parsedOriginalUrl);
  if (req._parsedOriginalUrl.pathname.includes('/auth') || req._parsedOriginalUrl.pathname.includes('/api')) next()
  else res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

// Card Router
const cardsRouter = require('./routers/cardsRouter');
app.use('/api/cards', cardsRouter);

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
    res.redirect('/home');
  }
);

// CARD ROUTES
app.get('/cards', (req, res) => {
  // DISPLAY ALL CARDS
})
app.post('/cards', (req, res) => {
  // ADD NEW CARD
  // { userId, front, back, hidden, tags, last_correct, last_incorrect, total_correct, total_incorrect } = req.body
  // INSERT INTO cards ( )
})
app.put('/cards', (req, res) => {
  // EDIT CARD
})
app.delete('/cards', (req, res) => {
  // DELETE CARD
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
