const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
// require('../services/userMethods');
// require('../services/userStatics');

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        // console.log(req.params)
        jwt.verify(token, 'divyank', async (err, decoded) => {
            if (err) {
                console.log(err.message)
                console.log(' You are not logged in.');
                res.send("Error logging in")
                // res.redirect("/login");
            }
            else {

                const user = await User.findOne({ email: decoded.email, 'tokens.token': token })
                // console.log(decoded)
                req.user = user;
                req.token = token;
                // console.log(user);
                next();
            }
        });
    }
    else {
        next()
    }

}

module.exports = auth





// const jwtlogin = expressJwt({
//     secret: 'divyank',
//     algorithms: ['HS256'],
//     getToken: (req) => req.cookies.jwt,
//   }).unless({
//     path: ['/login','/signup'], // You can add routes that don't require authentication here
//   });