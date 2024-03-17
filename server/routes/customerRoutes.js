const express = require('express')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')
 
const vendorController = require('../apis/customer/customerController')

router.post('/register',vendorController.register)
router.post('/all',vendorController.all)
router.post('/single',vendorController.single)
module.exports = router