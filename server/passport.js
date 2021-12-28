const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

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
  const query = `INSERT INTO users (userid) VALUES (${profile.id})`;
  

  return done(null, profile);
}
));


// docker-compose -f docker-compose-dev.yml up --build