const user = require('./userModel')
const bcrypt = require('bcrypt')

const login = (req,res)=>{
    let validation = ''
    if(!req.body.email){
        validation += "email is required"
    }
    if(!req.body.password){
        validation += "password is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        user.findOne({email:req.body.email}).exec()
         .then(data=>{
            if(data == null){
                res.send({success:false,status:500,
                    message:"Email doesnot exist"})
            }
            else{
                if(bcrypt.compareSync(req.body.password,data.password)){
                    if(data.status){
                        res.send({success:true,status:200,message:"Login Successful",data:data})
                    }
                    else{
                        res.send({success:false,status:400,message:"Account Inactive"})
                    }}
                    
                else{
                        res.send({success:false,status:400,message:"Invalid Credentials"})
                    }
            }
         })
         .catch(err=>{
            res.send({success:false,status:400,message:err.message})
         })
    }
}
const changePassword =(req,res)=>{
    let validation = ""
    if(!req.body._id)
     validation += "_id is required "
    if(!req.body.password)
        validation += "Current Password is required "
   
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        user.findOne({_id:req.body._id}).exec()
        .then(data =>{
            if(data == null){
                res.send({
                    success:false,
                    status:500,
                    message:"Email doesnot exist"
                })
            }
            else{
                if(bcrypt.compareSync(req.body.password,data.password)){
                    if(data.status){
                        data.password = bcrypt.hashSync(req.body.password,10)
                        data.save()
                        .then(data=>{
                            res.send({ success:true,
                                status:200,
                                message:"New Password set succesfully",
                                data:data})        
                        })
                        .catch(err=>{
                            res.send({success:false,
                                status:500,
                                message:err.message})
                        })
                        
                    }
                    else{
                        res.send({
                            success:false,
                            status:500,
                            message:"Account Inactive"
                        })
                    }
                }
                else{
                    res.send({
                        success:false,
                        status:500,
                        message:"Incorrect Password"
                    })
                }
           }
        })
        .catch(err=>{
            res.send({ success:false,
                status:500,
                message:err.message
            })
})
}
}

module.exports = {login,changePassword}



