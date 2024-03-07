const VendorCategory = require('../vendorCategory/vendorCategoryModel')
const Planner = require('../planner/plannerModel')
const Customer = require('../customer/customerModel')

const dashboard = async(req,res)=>{
    let totalCategories  = await VendorCategory.countDocuments()
    let totalPlanner = await Planner.countDocuments()
    let totalCustomer = await Customer.countDocuments()

    res.send({
        success:true,status:200,message:"Dashboard Loaded",data:{
            totalCategories: totalCategories,
            totalCustomer: totalCustomer,
            totalPlanner:totalPlanner
        }
    })
}

module.export = {dashboard}