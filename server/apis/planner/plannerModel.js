const mongoose = require('mongoose')
const plannerSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    createdAt:{type:Date,default:Date.now()},
    vendorId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'vendor'},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'}
})
module.exports = mongoose.model('planner', plannerSchema)