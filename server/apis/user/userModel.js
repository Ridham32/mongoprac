const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    usertype:{type:Number,default:3}, // 1= Admin, 2= Customer,3 = Planner,4= Vendor
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports = mongoose.model('user', userSchema)
