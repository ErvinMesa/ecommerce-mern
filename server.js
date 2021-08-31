// Start with nodemon server

const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("This is from the backend")
})

const port = 8000;

app.listen(port, ()=> console.log('nodejs server started'))