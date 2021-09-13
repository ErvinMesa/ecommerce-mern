// Start with nodemon server
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var dbconnection = require('./db')
var productsRoute = require('./routes/productsRoute')
var userRoute = require("./routes/userRoute")
app.use(bodyParser.json())
app.use('/api/products/' , productsRoute)
app.use('/api/users/',userRoute)
app.get("/",(req,res)=>{
    res.send("This is from the backend")
})

const port = 8000;

app.listen(port, ()=> console.log('nodejs server started'))