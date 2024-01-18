const jwt = require('jsonwebtoken');
const User = require('../model/user');
// require('../services/userMethods');
// require('../services/userStatics');


const auth = async (req,res,next)=> {
    try {
        // console.log(req)
        console.log("Auth Middleware")
        const token = req.header('Authorization').replace('Bearer ','')
        // console.log(token)
        const decoded = jwt.verify(token,'divyank');
        const user = await User.findOne({email:decoded.email,'tokens.token':token})
        // console.log(decoded)
        if(!user)
            throw new Error()
        req.token=token;
        req.user=user;
        // console.log(user);
        next();
    }
    catch (e) {
        res.status(401).send({error:"Please Authenticate"});
    } 
}    
module.exports = auth