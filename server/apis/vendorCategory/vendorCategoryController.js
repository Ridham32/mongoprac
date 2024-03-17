const vendorCategory = require('./vendorCategoryModel')
const userModel = require('../user/userModel')

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
        vendorCategory.findOne({ autoId: req.body.autoId }).exec()
            .then(data => {
                if (data == null)
                    res.send({ success: false, status: 500, message: 'VendorCategory Not Found' })
                else
                    res.send({ success: true, status: 200, message: 'Single Loaded Document', data: data })
            })
            .catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })
}







module.exports = { addCategory, all, single }


