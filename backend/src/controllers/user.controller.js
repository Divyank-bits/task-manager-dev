const Task = require("../model/task");
const User = require("../model/user");
// require('../services/userMethods');
// require('../services/userStatics');
const asynchandler = require("../utils/catchasync");
const userService = require("../services/user.service");
const taskService = require("../services/task.service");
const ErrorResponse = require("../utils/errorResponse");
const sendPasswordChangeEmail = require("../utils/sendEmail");
const sendEmailBrevo = require("../private/sendMailBrevo");

const UserController = {};

/*
@desc   Display user profile and associated tasks
@route  GET /api/v1/user/profile
@access Private 
*/
UserController.showProfile = asynchandler(async (req, res) => {
  // console.log(req.user)
  // console.log(req.header('Authorization'))
  const user = req.user;
  const tasks = await Task.find({ owner: user._id });
  res.json({ user, tasks });
  // console.log(res.json)
});

/*
@desc   Update user profile(name,email,age)
@route  PATCH /api/v1/user/profile
@access Private 
*/
UserController.updateProfile = asynchandler(async (req, res) => {
  console.log("Updating User");
  const updatedUser = await userService.updateUser(req.user, req.body);
  res.send(updatedUser);
});

/*
@desc   Change Password for authenticated user
@route  PATCH /api/v1/user/profile
@access Private 
*/
UserController.updatePassword = asynchandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    new ErrorResponse("Please Provide all required fields properly", 400);
  }
  const user = req.user;
  const isMatch = await userService.matchPassword(
    currentPassword,
    user.password
  );
  if (!isMatch) {
    throw new ErrorResponse("Invalid old password", 400);
  }
  user.password = newPassword;
  // sendPasswordChangeEmail(user.email);
  sendEmailBrevo(
    user.email,
    "Password Change Notification",
    "Your Task Manager's Password has been Changed"
  );
  await user.save();
  res.send({ user });
});

/*
@desc   Delete user profile, associated tasks, and logout from all sessions
@route  DELETE /api/v1/user/profile
@access Private 
*/
UserController.deleteProfile = asynchandler(async (req, res) => {
  const userId = req.user._id;
  // await Task.deleteMany({ owner: userId })
  await userService.deleteUser(userId);
  await userService.logoutAllSessions(req.user);
  res.send(req.user);
});

module.exports = UserController;
