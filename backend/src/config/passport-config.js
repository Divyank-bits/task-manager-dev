const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userService = require("../services/user.service");
const asyncHandler = require("../utils/catchasync");
const gconfig = require("../../../private/google-config");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    asyncHandler(async function (email, passoword, done) {
      const user = await userService.getUserByCredential(email, passoword);
      if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
      }
      return done(null, user);
    })
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: gconfig.google.client_id,
      clientSecret: gconfig.google.client_secret,
      callbackURL: gconfig.google.callback_url,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user with the given Google profile email already exists in your database
      let user = await userService.findByEmail(profile._json.email);

      // if (!user) {
      //   // If not, create a new user in your database
      //   user = new User({
      //     email: profile._json.email,
      //     // Other user properties from Google profile can be added here
      //   });

      //   await user.save();
      // }

      // Generate token for the user
      const token = await userService.generateToken(user);

      done(null, { user, token });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.findByEmail(id);
  done(null, user);
});

module.exports = passport;
