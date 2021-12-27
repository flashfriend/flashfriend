const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(new GitHubStrategy({
  clientID: "ENTER FROM GITHUB FORM",
  clientSecret: "41ENTER FROM GITHUB FORMbf",
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
));