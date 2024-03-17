const Planner = require('./plannerModel')
const bcrypt = require('bcrypt')
const User = require('../user/userModel')


const register =async (req, res)=>{
    let validation = ''
    if(!req.body.name){
        validation += 'name is required'
    }
    if(!req.body.email){
         validation += 'email is required'
    }
    if(!req.body.password){
        validation += 'password is required'
    }
    if(!req.body.contact){
        validation += 'contact is required'
    }
    if(!req.body.address){
        validation += 'address is required'
    }
    if(!!validation){
        res.send({success:false, status:400, message:validation})
    }
    else{
        let prev = await User.findOne({email:req.body.email})
        if(!!prev){
            res.send({success:false, status:400, message:"Email Already Exists"})
        }
    else{
        let total = await User.countDocuments()
        let user = new User()
        user.autoId = total +1
        user.name = req.body.name
        user.email = req.body.email
        user.password = bcrypt.hashSync(req.body.password,10)
        user.usertype = 3
        user.save()
        .then(async savedUser=>{
            let plannerTotal = await Planner.countDocuments()
            let planner = new Planner()
            planner.autoId = plannerTotal +1
            planner.name = req.body.name
            planner.email = req.body.email
            planner.contact = req.body.contact
            planner.address = req.body.address
            planner.image = "planner/" + req.file.filename
            planner._id = savedUser.userId
            planner.save()
            .then(savedPlanner=>{
                res.send({
                    success:true,status:200,message:"New Acccount Created",data:savedPlanner
                })
            })
            .catch(err=>{
                res.send({
                    success:false,status:500,message:err.message
                })
            })
        })
        .catch(err=>{
            res.send({
                success:false,status:500,message:err.message
            })
        })
     }
}
}


// admin panel: list of all customer
const all = (req, res) => {
    Planner
      .find()

      .exec()
      .then((data) => {
        res.send({
          success: true,
          status: 200,
          message: "All Documents Loaded",
          total: data.length,
          data: data,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          status: 500,
          message: err.message
        });
      });
  }

// update profile, view profile
   const single = (req,res)=>{
    let validation = ''
    if(!req.body.autoId)
    validation = ''
if(!!validation)
res.send({ success: false,
status: 500,
message: validation })

else
 Planner.findOne({autoId:req.body.autoId}).exec()
.then(data => {
    if(data == null)
    res.send({ success:false,status:500,message:"Planner Not Found"})
else
res.send({ success:true, status: 200, message:"Single Loaded Document" , data: data})
})
.catch(err =>{
    res.send({success:false,status:500,message: err.message})
})
}


   

module.exports = {register,all,single}


