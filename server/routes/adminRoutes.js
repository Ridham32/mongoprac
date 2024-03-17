const express = require('express')
const router = express.Router()
const vendorCategoryController = require('../apis/vendorCategory/vendorCategoryController')
const plannerController = require('../apis/planner/plannerController')
const dashboardController = require('../apis/dashboard/dashboardController')
const vendorController = require('../apis/vendor/vendorController')
//dashboard
//router.post('/dashboard', dashboardController.dashboard )



module.exports = router