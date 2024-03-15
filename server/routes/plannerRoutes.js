const express = require('express')
const router = express.Router()
const multer = require('multer')

const plannerController = require('../apis/planner/plannerController')
const userController = require('../apis/user/userController')
router.post('/planner/deletion',plannerController.deletion)

router.post('/planner/all',plannerController.all)
router.post('/changepassword',userController.changePassword)


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


 module.exports = router