 const vendor = require('./vendorModel')
 const User = require('../user/userController')
 const bcrypt = require('bcrypt')

const register = async(req,res)=>{
    let validation = ''
    if(!req.body.name){
        validation += "name is required"
    }
    if(!req.body.email){
        validation += "email is required"
    }
    if(!req.body.password){
        validation += 'password is required'
    }
    if(!req.body.contact){
        validation += 'contact is required'
    }
    if(!!validation){
        res.send({success:false, status:400 , message:validaton})
    }
    else{
        let prev = await User.findOne({email:req.body.email})
        if(!!prev){
            res.send({success:false,status:400, message:"Email Already Exists"})
        }
        else{
            let total = await User.countDocuments()
            let user = new User()
            user.autoId = total + 1
            user.name = req.body.name
            user.email = req.body.email
            user.password = bcrypt.hashSync(req.body.password,10)
            user.usertype = 4
            user.save()
            .then(async savedUser =>{
                let vendorTotal = await vendor.countDocuments()
                let Vendor = new vendor()
                Vendor.autoId = vendorTotal +1
                Vendor.name = req.body.name
                Vendor.email = req.body.email
                Vendor.contact = req.body.contact
                Vendor.address = req.body.address
                Vendor._id = savedUser.userId
            })
        }
    }
    
}


const all = (req,res)=>{
vendor.find(req.body).exec()
    .then(data=>{
        res.send({ success:true, 
            status:200, 
            message: "All Documents Loaded",
            total:data.length, 
            data:data
        })
})
    .catch(err=>{
        res.send({success:false,
            status:500,
            message:err.message
        })
})
}

const single = (req,res)=>{
    let validation = ''
    if(!req.body.autoId)
        validation = ''
    if(!!validation)
        res.send({success:false ,status:500, message:validation })
    else
        vendor.findOne({autoId:req.body.autoId}).exec()
            .then(data=>{
                if(data==null)
                    res.send({success:false,status:500,message:'Vendor Not Found'})
                else
                    res.send({success:true,status:200,message:'Single Loaded Document', data:data})
        })
            .catch(err=>{
                res.send({success:false,status:500,message:err.message})
        })
}

const deletion = (req,res)=>{
    let validation =''
    if(!req.body.autoId)
        validation = ''

    if(!!validation)
        res.send({success: false, status:500, message:validation})
    else
        vendor.findOne({autoId:req.body.autoId}).exec()
            .then(data=>{
                if(data==null)
                    res.send({success:false,status:500,message:"VendorName does'nt Exist"})
                else
                    data.status = false
                    data.save()
                    .then(()=>{
                        res.send({success:true,status:200,message:"Document Deleted"})
                    })
            .catch(err=>{
                    res.send({success:false,status:500,message:err.message})
            })
        })
        .catch(err=>{
            res.send({success:false, status:500, message:err.message})
        })
            }
const update = (req,res)=>{
    let validation =''
    if(!req.body.autoId)
        validation = ''

    if(!!validation)
        res.send({success: false, status:500, message:validation})
    else
    vendor.findOne({autoId:req.body.autoId}).exec()
    .then(data=>{
        if(data==null)
            res.send({success:false,status:500,message:"VendorName does'nt Exist"})
        else
        if(!!req.body.name) data.categoryName = req.body.name
        if(!!req.body.description) data.description = req.body.description/

        data.save()
        .then()
        res.send({success:true,status:200,message:"Document Deleted"})
    })
      .catch(err=>{
                res.send({success:false,status:500,message:err.message})
            })
                    
  .catch(err=>{
res.send({success:false, status:500, message:err.message})
})
}

module.exports = {addVendor,all,single,deletion,update}


