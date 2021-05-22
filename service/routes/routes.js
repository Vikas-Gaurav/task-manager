const express = require('express');
const router = express.Router();
const User = require('../models/user');
const objectId = require('mongoose').Types.ObjectId;

//Base path : http://localhost:3000/user, can be changed on environment basis

//get all users
router.get('/', (req, res) => {
    console.log(`Entering in user getAll route with req object :`, req )
    User.find((err, doc) => {
        if (err) {
            console.error(`Error in finding users :`, err);
            res.status(500).send(`Error in finding users `, err);
        }
        else {
            res.send(doc)
        }
    });
});

//get one user by id
router.get('/:id', (req, res) => {
    if (objectId.isValid(req.params.id)) {
        User.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log(`User not found with id ${req.params.id}`);
                res.status(500).send(`User not found with id`, err);
            }
            else {
                res.send(doc);
            }
        });
    }
    else {
        console.log(`No user found with id :`, req.params.id);
        res.status(404).send(`No user found with id :`, req.param.id);
    }
});

//post user
router.post('/', (req, res)=>{
    console.log(`Entering create user route with req`, req)
    const user_ = new User ({
        name : req.body.name,
        taskList : req.body.taskList
    });
    user_.save((err, doc)=>{
        if(err){
            console.log(`Error in savig user`, err);
            res.status(400).send(`Error in savig user`, err);
        }
        else{
            res.send(doc)
        }
    });
});

//put for user
router.put('/:id', (req, res) => {
    if (objectId.isValid(req.params.id)) {
        const user_ = {
            name: req.body.name,
            taskList: req.body.taskList
        };
        User.findByIdAndUpdate(req.params.id, { $set: user_},{new: true}, (err, doc) => {
            if (err) {
                console.log(`Error in updating user by id`, err);
                res.status(500).send(`Error in updating user`, err);
            }
            else {
                res.send(doc);
            }
        });
    }
    else {
        console.log(`No user found with id :`, req.param.id);
        res.status(404).send(`No user found with id :`, req.param.id);
    }
});

//delete for user
router.delete('/:id', (req, res) => {
    console.log(`Entering delete route with id :`, req.params.id);
    if(objectId.isValid(req.params.id)){
        User.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log(`Error in deleting user by id`, err);
                res.status(400).send(`Error in deleting user by id`, err);
            }
            else {
                console.log(`Deleted`, doc);
                res.send(doc);
            }
        });
    }
    else{
        console.log(`No user found with id :`, req.param.id);
        res.status(404).send(`No user found with id :`, req.param.id);
    }
});

module.exports = router;