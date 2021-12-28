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
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  // TODO: 
  // SQL 
  const queryStr = `INSERT INTO users (id) VALUES ($1))`;
  const values = [profile.id]

  // try {
  //   db.query(queryStr, values)
  //     .then(data => {
  //       console.log(data);
        
  //       return next();
  //     })
  // } catch (err) {
  //   console.log(err.stack)
  //   return next(err.stack);
  // }


  return done(null, profile);
}
));


// docker-compose -f docker-compose-dev.yml up --build