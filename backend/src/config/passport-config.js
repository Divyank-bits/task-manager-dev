const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/user.service');
const asyncHandler = require('../utils/catchasync');

passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    asyncHandler(async function(email,passoword,done) {
        const user = await userService.getUserByCredential(email,passoword);
        if(!user) {
            return done(null,false, {message: 'Incorrect email or password' });
        }
        return done(null,user);
    })
));

passport.serializeUser((user,done)=> {
    done(null,user);
})

passport.deserializeUser(async(id,done)=> {
    const user = await userService.findByEmail(id);
    done(null,user);
});

module.exports = passport;