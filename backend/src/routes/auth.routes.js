const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth.header");
const AuthController = require("../controllers/auth.controller");

router.route("/login").get(AuthController.showLogin).post(AuthController.login);

router
  .route("/signup")
  .get(AuthController.showSignup)
  .post(AuthController.signup);

router.post("/logout", auth, AuthController.logout);

router.post("/logoutAll", auth, AuthController.logoutAll);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

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

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Send password reset email
 *     description: Initiate the process of resetting the user's password by sending a reset email to the provided email address.
 *     tags:
 *        - Authorization
 *     requestBody:
 *       description: User email for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user for password reset.
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       400:
 *         description: Bad Request, invalid email format
 *       404:
 *         description: Not Found, user not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Reset the user's password using the provided email, Bearer token, and new password.
 *     tags:
 *       - Authorization
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email address associated with the user account.
 *         schema:
 *           type: string
 *           format: email
 *           example: user@example.com
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token received in the password reset email.
 *         schema:
 *           type: string
 *           example: Bearer your_reset_token
 *     requestBody:
 *       description: User email, Bearer token, and new password for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user for password reset.
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: new_secure_password
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Bad Request, invalid email format or token missing
 *       401:
 *         description: Unauthorized, invalid or expired token
 *       404:
 *         description: Not Found, user not found
 *       500:
 *         description: Internal Server Error
 */
