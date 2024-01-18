const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator=require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const userSchema = require('./userSchema')


userSchema.methods.toJSON = function () {
    const user=this;
    const userObject=user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}
//for matching password 
userSchema.methods.matchPassword = async(password)=> {
    return await bcrypt.compare(password,this.password);
}

userSchema.pre('save', async function(next) {
    const user =this;
    if(user.isModified('password')) {
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

//for deleting task of the deleted user 
userSchema.pre('deleteOne',async function(next) {
    const user=this;
    console.log('running');
    await Task.deleteMany({owner:user._id})
    next();
})


// to exclude soft-deleted documents
userSchema.pre('findOne', function () {
    this.where({ isDeleted: { $ne: true } });
});



const User = mongoose.model('User',userSchema)
module.exports = User














// userSchema.methods.generateToken = async function () {
//         const user=this;
//         const token = jwt.sign({ email: user.email.toString()},'divyank',{
//             expiresIn: '2h',
//           });
//         // console.log('signing '+token);
//         user.tokens =user.tokens.concat({token})
//         await user.save();
//         return token;
// }

// userSchema.statics.findByCredential = async (email,password)=> {
    
//     // const user= await User.findOne({ email });
//     const user = await this.findOne(User,{email})
//     if(!user) {
//         // winston.error(`Error: ${e.message}`, e);
//         throw new Error('Unable to login')
//     }
        
//     const match= await bcrypt.compare(password,user.password);
//     if(!match)
//         throw new Error('Unable to login')
//     return user;

// } 

//for hashing and salting password before saving



//  to handle soft delete
// userSchema.methods.softDelete = async function () {
//     this.isDeleted = true;
//     await this.save();
// };


// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//     const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//     return !!user;
// };
