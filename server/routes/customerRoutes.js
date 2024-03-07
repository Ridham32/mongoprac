const express = require('express')
const router = express.Router()
const customerController = require('../apis/customer/customerController')

router.post('/customer/add',customerController.register)

module.exports = router