const mongoose = require('mongoose');

const dbUrl = "monodb://localhost:27017/myDb";

mongoose.connect(dbUrl, (err)=>{
    if(!err){
        console.log(`Connection to DB success`);
    }
    else {
        console.log(`Connection to DB failed `, err);
    }
});

module.exports = mongoose;