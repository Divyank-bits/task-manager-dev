const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth.header");
const UserController = require("../controllers/user.controller");

router
  .route("/profile")
  .get(auth, UserController.showProfile)
  .patch(auth, UserController.updateProfile)
  .delete(auth, UserController.deleteProfile);

router
  .route("/profile/changepassword")
  .patch(auth, UserController.updatePassword);

module.exports = router;

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Get user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Update user profile
 *     description: Update user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Delete user profile
 *     description: Delete user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /profile/changepassword:
 *   patch:
 *     summary: Update user password
 *     description: Update the password of the authenticated user.
 *     tags:
 *      - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User password update request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *             example:
 *               oldPassword: current_secure_password
 *               newPassword: new_secure_password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Internal Server Error
 */
