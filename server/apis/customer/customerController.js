const customer = require('./customerModel')
const user = require('../user/userModel')
const bcrypt = require('bcrypt')

const register = async(req,res)=>{
    let validation = ''
    if(!req.body.name){
        validation += 'name is required'
    }
    if(!req.body.email){
        validation += 'email is required'
    } if(!req.body.password){
        validation += 'password is required'
    } if(!req.body.contact){
        validation += 'contact is required'
    } if(!req.body.address){
        validation += 'address is required'
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        let prev = await user.findOne({email:req.body.email})
        if(!!prev){
            res.send({success:false,status:400,message:"Email ALready Exist"})
        }
        else{
            let total = await user.countDocuments()
            let User = new user()
            User.autoId = total + 1
            User.name = req.body.name
            User.email = req.body.email
            User.password = bcrypt.hashSync(req.body.password,10)
            User.save()
            .then(async savedUser=>{
                let customerTotal = await customer.countDocuments()
                let customer = new customer()
                customer.autoId = customerTotal + 1
                customer.name = req.body.name
                customer.email = req.body.email
                customer.contact = req.body.contact
                customer.address = req.body.address
                customer.userId = savedUser._id
                customer.save()
                .then(savedCustomer=>{
                    res.send({
                        success:true,status:200,message:"New Account Created",data:savedCustomer
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



module.exports = {register}


