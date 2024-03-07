const User = require('../apis/user/userModel')
const bcrypt = require('bcrypt')
User.findOne({ email: "admin@gmail.com" }).exec()
    .then(data => {
        if (data == null) {
            let admin = new User()
            admin.autoId = 1
            admin.name = "Admin"
            admin.email = "admin@gmail.com"
            admin.password = bcrypt.hashSync("123",10)
            admin.userType = 1

            admin.save()
                .then( data => {
                    console.log("Admin Created")
                })
                .catch(err => {
                    console.log("Error in admin", err)
                })
        }
        else
            console.log("Admin Already Exists")
    })
    .catch(err=>{
        console.log("Error In Admin",err)
    })