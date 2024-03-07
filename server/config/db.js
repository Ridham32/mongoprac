const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myfile')
.then(()=>{
 console.log('db Connected');
})
.catch((error)=>{
    console.log("Error Occured",error);
})
