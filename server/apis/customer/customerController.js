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
                
            })
        }
    }
}


    




module.exports = {register}


