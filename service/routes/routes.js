const express = require('express');
const router = express.Router();
// const User = require('../models/user');
// const objId = require('mongoose').Types.ObjectId;
const users =[
    {
        _id: "123",
        name: "Vikas Gaurav",
        taskList: ["Develop a new app", "Unit testing for the app"]
    },
    {
        _id: "234",
        name: "Vikas Gaurav",
        taskList: ["Develop a new app", "Unit testing for the app"]
    },
    {
        _id: "345",
        name: "Vikas Gaurav",
        taskList: ["Develop a new app", "Unit testing for the app"]
    }
];
//get all users
router.get('/', (req, res) => {
    User.find((err, dbRes) => {
        if (err) {
            console.log(`error in savig user`, err);
        }
        else {
            res.send(dbRes)
        }
    });
    res.send(users);
});

//post user
router.post('/', (req, res)=>{
    const user_ = new User ({
        name : req.body.name,
        taskList : req.body.taskList
    });
    user_.save((err, dbRes)=>{
        if(err){
            console.log(`error in savig user`, err);
        }
        else{
            res.send(dbRes)
        }
    });
});

//put for user
router.put('/', (req, res) => {
    if (objId.isValid(req.param.id)) {
        const user_ = new User({
            name: req.body.name,
            taskList: req.body.taskList
        });
        User.findByIdAndUpdate(req.param.id, {$set: emp},{new: true}, (err, dbRes) => {
            if (err) {
                console.log(`error in updating user by id`, err);
            }
            else {
                res.send(dbRes);
            }
        });
    }
    else {
        console.log(`No user found with id :`, req.param.id);
    }
});

//delete for user
router.delete('/:id', (req, res) => {
    if(objId.isValid(req.param.id)){
        User.findByIdAndDelete(req.param.id, (err, dbRes) => {
            if (err) {
                console.log(`error in deleting user by id`, err);
            }
            else {
                res.send(dbRes);
            }
        });
    }
    else{
        console.log(`No user found with id :`, req.param.id);
    }
});