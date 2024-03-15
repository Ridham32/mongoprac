const express = require('express')
const router = express.Router()
const multer = require('multer')
const vendorController = require('../apis/vendor/vendorController')
const vendorModel = require('../apis/vendor/vendorModel')


const fileStorage = multer.diskStorage({
    //keys , ....cb=>call back
    destination:(req,file,cb)=>{
        cb(null,'./public/')
    },
    filename:(req,file,cb)=>{
        console.log("filename in diskStorage",file);
        cb(null,Date.now()+'-'+file.fieldname+'-'+file.originalname)
    }
})
//file name :- 1709621657390-image-cateringLogo
const upload = multer({storage:fileStorage})

module.exports = router
