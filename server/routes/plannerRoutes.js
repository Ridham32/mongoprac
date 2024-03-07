const express = require('express')
const router = express.Router()
const plannerController = require('../apis/planner/plannerController')
//const vendorController = require('../apis/vendor/vendorController')
const userController = require('../apis/user/userController')
router.post('/planner/deletion',plannerController.deletion)
router.post('/register',plannerController.register)
//router.post('vendor/addVendor',vendorController.addVendor)
//router.post('/update',vendorController.update)
router.post('/planner/all',plannerController.all)
router.post('/login',userController.login)
router.post('/changepassword',userController.changePassword)

 module.exports = router