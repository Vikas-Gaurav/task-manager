const mongoose = require('mongoose');

//model for user object
const User = mongoose.model('User',{
    name: {type: String},
    taskList: [String] 
});

module.exports = User;