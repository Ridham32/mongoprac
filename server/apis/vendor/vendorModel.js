const mongoose = require('mongoose')
const vendorSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    contact:{type:String,default:''},
    categoryId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'vendorCategory'},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
    image:{type:String,default:"vendor/noimage.jpg"},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'}
})
module.exports = mongoose.model( 'vendor', vendorSchema)
