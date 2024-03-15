const mongoose = require('mongoose')
const plannerSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true},
    vendorId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'vendor'},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    image:{type:String,default:"planner/noimage.jpg"}
})
module.exports = mongoose.model('planner', plannerSchema)