const  User  = require('../model/user')
const Task = require('../model/task')
const asyncHandler = require('../utils/catchasync')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {findOne,softdelete} = require('../utils/wrapper')
const taskService = require('./task.service')
const ErrorResponse = require('../middleware/errorHandler')

const generateToken = async(user)=> {
    const token = jwt.sign({ email: user.email.toString()},'divyank',{
        expiresIn: '2h',
    });
    user.tokens =user.tokens.concat({token})
    await user.save();
    return token;
}

const createUser = asyncHandler( async (userData) => {
    const user = new User(userData);
    // await existingUser(userData.email)
    await user.save();
    return user;
});

// const existingUser = asyncHandler( async (email) => {
//     const existingUser = await findOne(User,{email});
//     // console.log(existingUser)
//     if (existingUser) {
//         // throw new Error(e);
//     }
// })
const findByEmail = async(email) => {
    const user = await findOne(User,{email});
    if(!user) {
        throw new ErrorResponse(`There is no user with this ${email} in our records`,400)
    }
    return user
}
const getUserByCredential = async (email, password) => {
    const user = await findOne(User,{email});
    if (!user) {
        // throw new Error('Unable to login');
        throw new ErrorResponse(`The ${email} and password did not match our records`,400)
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
        // throw new Error('Unable to login');
        throw new ErrorResponse(`The ${email} and password did not match our records`,400)
    } 
    return user;
};
const getUserById = async (userId) => {
    const user = await User.findById(userId);
    // console.log(user)
    return user;
};
const updateUserTokens = async (user, tokens) => {
    user.tokens = tokens;
    await user.save();
};
const logoutAllSessions = async (user) => {
    user.tokens = [];
    await user.save();
};
const updateUser = async (user, updateData) => {
    // console.log(user)
    const validKeys = ['name', 'email', 'age', 'password'];
    const updates = Object.keys(updateData);
    const isValidUpdate = updates.every((key) => validKeys.includes(key));

    if (!isValidUpdate) {
        // throw new Error('Invalid Update');
        throw new ErrorResponse('Invalid Update',400)
    }

    updates.forEach((key) => (user[key] = updateData[key]));
    await user.save();
    return user;
};

const deleteUser = async (userId) => {
    const tasks = await taskService.getTasksByOwner(userId);
    for(let x in tasks) 
        taskService.deleteTask(tasks[x]._id,userId);
    const user = await User.findById(userId);
    await softdelete(user);
    return user;
}

const matchPassword = async (oldPassword,newPassword) => {
    return await bcrypt.compare(oldPassword,newPassword);
}

module.exports = {
    generateToken,
    createUser,
    getUserByCredential,
    getUserById,
    updateUserTokens,
    logoutAllSessions,
    updateUser,
    deleteUser,
    matchPassword,
    findByEmail
    // existingUser
}









  // if (await User.isEmailTaken(userBody.email)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    // }
// }
    // catch(error) { 
    //     if (error.code == "11000" && error.keyValue == "{ email: ${userBody.email }}")
    //     throw new Error("User already exists")
    // }
    // throw new Error('Lite')



    //update user
    // if (updateBody.email && (await User.isEmailTaken(updateBody.email, user._id))) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    // }
    // Object.assign(user, updateBody);
    // await user.save();
    // return user;