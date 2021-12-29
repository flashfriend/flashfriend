const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('./models/cardModel')

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(new GitHubStrategy({
  clientID: "9cbbc689c13253eb3f0b",
  clientSecret: "849b4955037c0217838ce00a2356e0ecff16e286",
  callbackURL: "https://flash-friend.herokuapp.com/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  // TODO: 
  // SQL 
  // const queryStr = `INSERT INTO users (id) VALUES ($1) `;
  const queryStr = `INSERT INTO users (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`
  const values = [ profile.id, profile.displayName ];

  try {
    db.query(queryStr, values)
      .then(data => {
        // console.log(data);
        return done(null, profile);
      })
  } catch (err) {
    console.log(err.stack)
    return next(err.stack);
  }
}
));


// docker-compose -f docker-compose-dev.yml up --build