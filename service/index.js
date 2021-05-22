const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db');
const routes = require('./routes/routes')

const app = express();
app.use(bodyParser.json());

//configure cors domain, using corse middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));

const server = app.listen(3000, ()=> {
    console.log("Calling app.listen's callback function.");
    console.log(`App is listening at port ${server.address().port}`);
});

//router middleware
app.use('/user',routes);