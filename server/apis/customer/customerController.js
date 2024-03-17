const customer = require('./customerModel')
const User = require('../user/userModel')
const bcrypt = require('bcrypt')

const register = async (req,res)=>{
    let validation = ''
    if(!req.body.name){
        validation += 'name is required'
    }
    if(!req.body.email){
        validation +='email is required'
    }
    if(!req.body.password){
        validation += 'password is required'
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        let prev = await User.findOne({email:req.body.email})
        if(!!prev){
            res.send({success:false,status:400,message:"Email Already Exist"})
        }
        else{
            let total = await User.countDocuments()
            let user = new User()
            user.autoId = total+1
            user.name = req.body.name
            user.email = req.body.email
            user.password = bcrypt.hashSync(req.body.password,10)
            user.usertype = 2
            user.save()
            .then(async saverUser=>{
                let customerTotal = await customer.countDocuments()
                let Customer = new customer()
                Customer.autoId = customerTotal+1
                Customer.name = req.body.name
                Customer.email = req.body.email
                Customer._id = saverUser.userId
                Customer.save()
                .then(savedVendor=>{
                    res.send({
                        success:true,status:200,message:"New Account Created",data:savedVendor
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

const all = (req,res)=>{
    vendor 
    .find(req.body)
    .exec()
    .then((data)=>{
        res.send({
            success:true,status:200,message:"All Documens Loaded",
            total:data.length,
            data:data,
        })
    })
    .catch((err)=>{
        res.send({
            success:false,status:500,message:err.message
        })
    })
}

const single = (req,res)=>{
    let validation = ''
    if(!req.body.autoId)
    validation = ''
if(!!validation)
res.send({
    success:false,status:500,message: validation
})

else
vendor.findOne({autoId:req.body.autoId}).exec()
.then(data=>{
    if(data == null)
    res.send({
success:false,status:500,message:"Vendor Not Found"})
else
res.send({
    success:true,status:200,message:"Single Loaded Document",data:data
})
})

.catch(err=>{
    res.send({
        success:false,status:500,message:err.message
    })
})


}
    




module.exports = {register,all,single}


