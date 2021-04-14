const express = require('express');
const upload = require('express-fileupload');
const morgan = require('morgan');
const connectDb = require('./config/dbConnect');
const constants = require('./constants/constant');

//Importing Routes File
//All route files are present in route folder
const user = require('./routes/user');

// Connecting to DB and creating Express App
connectDb();
const app = express(); 

// Middlewares
app.use(express.json()); // express.json() => Getting JSON in request.body
app.use(upload());       // upload() => For File Upload Purpose
app.use(morgan('dev'));  // Morgans => used for getting logs for each request 

// Mounting the routes ..
app.use('/api/v1/user/',user);

app.listen(constants.PORT, ()=>{
    console.log("Listening to PORT : "+constants.PORT);
});

// Event to Stop server incase it fails to connect to DB
process.on('unhandledRejection',(err,promise)=>{
    console.log("Error: Issue with your DB");
    console.log(err.message);

    server.close(()=> process.exit());
});