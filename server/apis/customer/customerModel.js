const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    createdAt:{type:Date,default:Date.now},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'}
})
module.exports = mongoose.model('customer', customerSchema)
