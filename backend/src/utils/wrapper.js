const findOne = async (model,params)=> {
    let result= {}
    try {
        result =  model.findOne(params)
    }
    catch(err) {
        return Promise.reject(err)
    }
    return result
}

const softdelete = async (user) => {
    try {
        // const user = model.findById(id)
        user.isDeleted = true;
        // console.log(model)
        await user.save();
    }
    catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {findOne,softdelete}