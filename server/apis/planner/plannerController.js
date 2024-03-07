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
            planner.userId = savedUser._id
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

const deletion = (req,res) =>{
    let validation = ''
    if(!req.body.autoId)
    validation = ''
if(!!validation)
    res.send({success:false,status:500,message: validation})
else
    planner.findOne({autoId: req.body.autoId }).exec()
        .then(data =>{
            if(data == null)
                res.send({success:false,status:500,message:"Item doesn't exist"})
            else
                data.status = false
            data.save()
            .then(()=>{
                res.send({success:true,status:200,message:"Item Deleted"})
            })
            .catch(err =>{
                res.send({success:false,status:500,message:err.message})
            })
        })
        
}

// admin panel: list of all customer
const all = (req,res) =>{
    Planner.find()
    .exec()
    .then((savedPlanner)=>{
        res.send({
            success:true,status:200,message:"successfully loaded the planner",data:savedPlanner
        })
    })
        .catch((err)=>{
            res.send({
                success:false,status:500,message:err.message
            })
        })
   }
// update profile, view profile
   const single = (req,res)=>{

   }


   const update = (req,res)=>{
    let validation = ''
    if(!req.body.userId){
        validation += 'id is required.'
    }

    if(!!validation){
        res.send({
            success:false,status:400,message:validation
        })
    }
    else{
        User.findOne({
            userId:req.body.userId
        })
        .exec()
        .then(data=>{
            if(data == null){
                res.send({success:false, status:400, message:"User doesn't exist"})
            }
            else{
                if(!!req.body.name) data.name = req.body.name
                if(!!req.body.email) data.email = req.body.email
                data.save()
                .then(savedPlanner=>{
                    Planner.findOne({userId:req.body.userId})
                    .exec()
                    .then(plannerData=>{
                        if(plannerData == null){
                            res.send({success:false,status:false,message:"Planner doesn't exist"})
                        }
                        else{
                            if(!!req.body.name) plannerData.name = req.body.name
                            if(!!req.body.email) plannerData.email = req.body.email
                            if(!!req.body.contact) plannerData.contact = req.body.contact
                            if(!!req.body.address) plannerData.address = req.body.address

                        plannerData.save()
                        .then(savedPlanner=>{
                            res.send({success:true,status:200,message:"Planner Profile Updated",data:savedPlanner})
                        })
                        .catch(err=>{
                            res.send({success:false,status:400,message:err.message
                                
                            })

                        })

                   
                        }
                    })
                })
             }
        })
        .catch(err=>{
            res.send({
                success:false,status:500,message:err.message
            })
        })
    }
   }

module.exports = {register,deletion,all,single,update}


