const vendor = require('./vendorModel')

const addVendor = async(req,res)=>{
    let validation = ""
    if (!req.body.name)
        validation += "name is Required"
    if (!req.body.description)
        validation += "description is Required"

    if (!!validation)
            res.send({ success: false, status: 500, message: validation })
    

    else {
        let total = await vendor.countDocuments()
        let newVendor = new vendor()
        newVendor.autoId = total+1
        newVendor.name = req.body.name
        newVendor.email = req.body.email
        newVendor.password = req.body.password
        newVendor.description = req.body.description
        newVendor.categoryId = req.body.categoryId

        newVendor.save()
            .then((vendorData)=>{
                res.send({
                success:true,
                status:200,
                message:"Account Created",
                data:vendorData
            })
    })
            .catch((error)=>{
                res.send({
                status:404,
                message:error.message
            })
    })
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

}
