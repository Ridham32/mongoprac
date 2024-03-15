const express = require('express')
const router = express.Router()
const multer = require('multer')

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