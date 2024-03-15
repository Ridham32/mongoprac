const vendorCategory = require('./vendorCategoryModel')
const multer = require('multer')


const addCategory = async (req, res) => {
    let validation = ""
    if (!req.body.categoryName)
        validation += "name is Required"

    if (!!validation)
        res.send({ success: false, status: 500, message: validation })


    else {
        let total = await vendorCategory.countDocuments()
        let newCategory = new vendorCategory()
            newCategory.autoId = total + 1
            newCategory.categoryName = req.body.categoryName
        
        newCategory.save()
            .then((vendorCategoryData) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Category Created",
                    data: vendorCategoryData
                })
            })
            .catch((error) => {
                res.send({
                    status: 404,
                    message: error.message
                })
            })
    }
}
const all = (req, res) => {
  vendorCategory
    .find(req.body)
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
        message: err.message,
      });
    });
}

const single = (req, res) => {
    let validation = ''
    if (!req.body.autoId)
        validation = ''
    if (!!validation)
        res.send({ success: false,
                   status: 500, 
                message: validation })
    else
        vendor.findOne({ autoId: req.body.autoId }).exec()
            .then(data => {
                if (data == null)
                    res.send({ success: false, status: 500, message: 'Vendor Not Found' })
                else
                    res.send({ success: true, status: 200, message: 'Single Loaded Document', data: data })
            })
            .catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })
}

const deletion = (req, res) => {
    let validation = ''
    if (!req.body.autoId)
        validation = ''

    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else
        vendor.findOne({ autoId: req.body.autoId }).exec()
            .then(data => {
                if (data == null)
                    res.send({ success: false, status: 500, message: "VendorCategory does'nt Exist" })
                else
                    data.status = false
                data.save()
                    .then(() => {
                        res.send({ success: true, status: 200, message: "Category Deleted" })
                    })
                    .catch(err => {
                        res.send({ success: false, status: 500, message: err.message })
                    })
            })
            .catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })
}
const update = (req, res) => {
    let validation = ''
    if (!req.body.autoId)
        validation = ''

    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else
        vendor.findOne({ autoId: req.body.autoId }).exec()
            .then(data => {
                if (data == null)
                    res.send({ success: false, status: 500, message: "VendorCategory does'nt Exist" })
                else
                    if (!!req.body.name) data.categoryName = req.body.name
                if (!!req.body.description) data.description = req.body.description /

                    data.save()
                        .then()
                res.send({ success: true, status: 200, message: " Deleted" })
            })
            .catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })

            .catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })
}

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



module.exports = { addCategory, all, single, deletion, update }


