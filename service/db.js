const mongoose = require('mongoose');

//Database url, can be configured on the basis of environment
const dbUrl = "mongodb://localhost:27017/app-users";

//mongoose utility
mongoose.connect(dbUrl, (err)=>{
    if(!err){
        console.log(`Connection to DB '${dbUrl}' is successful`);
    }
    else {
        console.log(`Failed to connect to database '${dbUrl}' `, err);
    }
});

module.exports = mongoose;