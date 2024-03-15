const express = require('express')
const router = express.Router()
const multer = require('multer')
const vendorController = require('../apis/vendor/vendorController')
const userController = require('../apis/user/userController')


const fileStorage = multer.diskStorage({
    //keys , ....cb=>call back
    destination:(req,file,cb)=>{
        cb(null,'./server/public/vendor')
    },
    filename:(req,file,cb)=>{
        console.log("filename in diskStorage",file);
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage:fileStorage})
router.post('/register',upload.single("image"),vendorController.register)
router.use(require("../middleware/tokenChecker"))

router.post('/all',vendorController.all)
router.post('/changepassword',userController.changePassword)

module.exports = router
