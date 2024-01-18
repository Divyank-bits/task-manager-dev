const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.header')
const AuthController = require('../controllers/auth.controller');

router
    .route('/login')
    .get(AuthController.showLogin)
    .post(AuthController.login);


router
    .route('/signup')
    .get(AuthController.showSignup)
    .post(AuthController.signup);



router
    .post('/logout', auth, AuthController.logout);


router
    .post('/logoutAll', auth, AuthController.logoutAll);

module.exports = router;

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Login page
 *     description: This API is to show the login page
 *     tags:
 *       - Authorization
 *     responses:
 *       200:
 *         description: To test GET method
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: This API is to log in an existing user
 *     description: Enter Email and password to login
 *     tags:
 *       - Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                   user:
 *                     $ref: '#components/schemas/User'
 */


/**
 * @swagger
 * /signup:
 *   get:
 *     summary: This API is to show signup page
 *     description: Signup Page
 *     tags:
 *       - Authorization
 *     responses:
 *       200:
 *         description: To test GET method
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: This API is to register a new User
 *     description: Enter your name, email, password, and age to register
 *     tags:
 *       - Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 *       201:
 *         description: User Registered Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                   user:
 *                     $ref: '#components/schemas/User'
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: This API is to logout the current session of a user
 *     description: Hit this request to logout a user
 *     tags:
 *       - Authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: To test GET method
 */

/**
 * @swagger
 * /logoutAll:
 *   post:
 *     summary: This API is to logout all sessions of a user
 *     description: Hit this request to logout all sessions of a user
 *     tags:
 *       - Authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: To test POST method
 */

