const express = require('express')
const app =express()
const PORT = 5000
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./server/config/db')
const seed = require('./server/config/seeder')
const multer = require('multer')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// provide the path where to upload file  but the file gets corrupt if use dest.
/* **** const upload = multer({dest:'/public/'}) **** */
const fileSchema = new mongoose.Schema({
    name:{type:String,default:''},
    filePath:{type:String,default:''}
})
const FileModel = new mongoose.model('file',fileSchema)

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

//one field one file -> use single  
app.post('/uploadFile',upload.single('image'),(req,res)=>{
    // console.log("body",req.body);
    // console.log(req.file);

    let obj = new FileModel()
    obj.name = req.body.name
    obj.filePath = req.file.filename
    obj.save().then(data=>{
        res.send("File Uploaded")
    })
    
})



const adminRoutes =  require('./server/routes/adminRoutes')
const customerRoutes = require('./server/routes/customerRoutes')
const plannerRoutes = require('./server/routes/plannerRoutes')
app.use(cors())    // handle request from frontend
app.use("/customer",customerRoutes)
app.use("/planner",plannerRoutes)
app.use("/admin",adminRoutes)



// one field multiple file -> use array
//app/post('/photos/upload', upload.array('photos',12), function())


app.get('/',(res,req)=>{
    console.log("Welcome to the server");
})

app.listen(PORT,(error)=>{
    if(error){
        console.log("Error",error);
    } else{
        console.log("Server is Running");
    }
})
