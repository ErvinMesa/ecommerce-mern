const mongoose = require("mongoose");

var mongoDBURL = 'mongodb+srv://Ervin:vfp3rNulBR3ASIL8@ecommerce-mern.sarc9.mongodb.net/ecommerce-mern';

mongoose.connect(mongoDBURL, {useUnifiedTopology:true,useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error', ()=>{
    console.log('connection failed');
})

dbconnect.on('connected', ()=>{
    console.log('successful connection');
})

module.exports = mongoose;