const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name: {type: string},
    taskList: {type: Array}
});

module.exports = User;