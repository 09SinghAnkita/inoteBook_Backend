
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://asingh:d9MfySJxzfduK4zz@cluster0.fezphsf.mongodb.net/test";
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully")
    })
}

module.exports = connectToMongo 
