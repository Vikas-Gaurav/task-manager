const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('./db');
const routes = require('./routes/routes')

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.listen(3000, ()=>{
    console.log(`server started at port 3000`);
});

// app.use('/user',routes);
const users = [
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
app.get('/', (req, res) => {
    // User.find((err, dbRes) => {
    //     if (err) {
    //         console.log(`error in savig user`, err);
    //     }
    //     else {
    //         res.send(dbRes)
    //     }
    // });
    res.send(users);
});

