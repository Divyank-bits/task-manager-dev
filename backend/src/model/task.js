const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator=require('validator');


const taskSchema = new Schema ( {
    description: {
        type: String,
        required: true,
        trim:true
    },
   completed:{
        type: Boolean,
        default: false,
   },
   owner: {
    type:Schema.Types.ObjectId,
    required:true,
    ref:'User'
   },
   isDeleted: {
    type: Boolean,
    default: false
}
}, {
    timestamps:true
})

taskSchema.pre('findOne', function () {
    this.where({ isDeleted: { $ne: true } });
});
taskSchema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
});

const Task = mongoose.model('Task',taskSchema)
module.exports = Task