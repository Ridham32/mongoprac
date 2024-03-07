const express = require('express')
const router = express.Router()
const vendorCategoryController = require('../apis/vendorCategory/vendorCategoryController')
const plannerController = require('../apis/planner/plannerController')
const dashboardController = require('../apis/dashboard/dashboardController')
router.post('/planner/deletion',plannerController.deletion)
router.post('/vendorCategory/addVendorCategory',vendorCategoryController.addCategory)
router.post('/vendorCategory/single',vendorCategoryController.single)
router.post('/vendorCategory/deletion',vendorCategoryController.deletion)
router.post('/vendorCategory/update',vendorCategoryController.update)

//dashboard
//router.post('/dashboard', dashboardController.dashboard )

module.exports = router