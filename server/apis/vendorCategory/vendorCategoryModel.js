const mongoose = require('mongoose')
const vendorCategorySchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    categoryName:{type:String,default:''},
})
module.exports = mongoose.model( 'vendorCategory', vendorCategorySchema)
