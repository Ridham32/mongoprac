const mongoose = require('mongoose')
const vendorCategorySchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    categoryName:{type:String,default:''},
    image:{type:String,default:'vendorCategory/noImage.jpg'}
})
module.exports = mongoose.model( 'vendorCategory', vendorCategorySchema)
