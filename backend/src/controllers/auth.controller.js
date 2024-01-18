const Task = require('../model/task')
const User = require('../model/user')

const Joi = require('joi')
const asynchandler = require('../utils/catchasync')
const { customlogger } = require('../config/errorlogs')
const  userService  = require('../services/user.service')
const AuthController = {};
const responseHandler = require('../utils/errorResponse')

/*
@desc   Render the login page
@route  GET /api/v1/auth/login
@access Public 
*/
AuthController.showLogin = (req, res) => {
    // res.render('login');
    res.send("Enter email and passoword")
};
/*
@desc   Render the signup page
@route  GET /api/v1/auth/signup
@access Public 
*/
AuthController.showSignup = (req, res) => {
    // res.render('signup');
    res.send("Enter You details: Name,Email,Password,age")
};
/*
@desc   Handle user registration
@route  POST /api/v1/auth/signup
@access Public 
*/
AuthController.signup = asynchandler(async (req, res) => {
    console.log('Request Received')
    // console.log(req.body)
    const userschema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Name should be a string',
            'any.required': 'Name is required',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),
        age: Joi.number().min(0).messages({
            'number.min': 'Age should not be less than {#limit}',
        }),
        password: Joi.string().min(7).required().messages({
            'string.min': 'Password should have a minimum length of {#limit}',
            'any.required': 'Password is required',
        }),
    }).required();
    // const { error } = userschema.validate(req.body);
    
    // if (error) {
    //     const msg = error.details.map(el => el.message).join(',')
    //     res.status(400).json(msg);
    // }

    const user = await userService.createUser(req.body);
    const token = await userService.generateToken(user);
    // res.cookie('jwt', token, { httpOnly: true });
    customlogger("new User registered", user);
    res.json({user,token});
});

/*
@desc   Handle user login
@route  POST /api/v1/auth/login
@access Public 
*/
AuthController.login = asynchandler (async (req, res, next) => {
    console.log('Request Received')
    const loginschema = Joi.object({
        email: Joi.string().required().email().messages({
            'any.required': 'Email is required',
        }),
        password: Joi.string().min(7).required().messages({
            'string.min': 'Password should have a minimum length of 7',
            'any.required': 'Password is required',
        }),
    }).required()
    // console.log(req.body)
    // const { error } = loginschema.validate(req.body);
    // if (error) {
    //     const msg = error.details.map(el => el.message).join(',')
    //     res.status(400).json(msg);
    //     return;
    // }
    // console.log(req.body)
    const user = await userService.getUserByCredential(req.body.email, req.body.password);
    const token = await userService.generateToken(user);

    // res.cookie('jwt', token, { httpOnly: true });
    customlogger("User loggedin", user);
    // res.set('Authorization', `Bearer ${token}`);
    res.json({user,token})
    // res.status(200).send([user,token]);
    
});

/*
@desc   Handle user logout
@route  POST /api/v1/auth/logout
@access Private 
*/
AuthController.logout = asynchandler(async (req, res) => {
    
    console.log('Testing')
    const updatedTokens = req.user.tokens.filter((token) => token.token !== req.token);
    await userService.updateUserTokens(req.user, updatedTokens);
    // res.clearCookie('jwt');
    customlogger("User logged out", req.user);
    res.status(200).send(req.user);
});

/*
@desc   Handle user logout from all sessions
@route  POST /api/v1/auth/logout/all
@access Private 
*/
AuthController.logoutAll = asynchandler(async (req, res) => {
    await userService.logoutAllSessions(req.user);
    // res.clearCookie('jwt');
    customlogger("User logged out all", req.user);
    res.status(200).send(req.user);
});

module.exports = AuthController;
