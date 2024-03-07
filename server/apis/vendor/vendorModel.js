const mongoose = require('mongoose')
const vendorSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    categoryId:{type:Number,default:0},
    description:{type:String,default:""},
    createdAt:{type:Date}
})
module.exports = mongoose.model( 'vendor', vendorSchema)
