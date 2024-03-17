const mongoose = require('mongoose')
const vendorCategorySchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    categoryName:{type:String,default:''},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    image:{type:String,default:'vendorCategory/noImage.jpg'}
})
module.exports = mongoose.model( 'vendorCategory', vendorCategorySchema)
