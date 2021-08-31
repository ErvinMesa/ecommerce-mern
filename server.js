// Start with nodemon server

const express = require("express");

const app = express();

var dbconnection = require('./db')

app.get("/",(req,res)=>{
    res.send("This is from the backend")
})

const port = 8000;

app.listen(port, ()=> console.log('nodejs server started'))