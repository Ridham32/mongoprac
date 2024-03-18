const express = require('express')
const router = express.Router()
const multer = require('multer')
const jsonwebtoken = require('jsonwebtoken')

const plannerController = require('../apis/planner/plannerController')
const userController = require('../apis/user/userController')
const fileStorage = multer.diskStorage({
    //keys , ....cb=>call back
    destination:(req,file,cb)=>{
        cb(null,'./server/public/planner')
    },
    filename:(req,file,cb)=>{
        console.log("filename in diskStorage",file);
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage:fileStorage})
router.post('/register',upload.single("image"),plannerController.register)
router.post('/login',userController.login)
router.use(require("../middleware/tokenChecker"))

router.post('/deletion',userController.deletion)
router.post('/update',userController.update)


router.post('/all',plannerController.all)
router.post('/changepassword',userController.changePassword)





 module.exports = router