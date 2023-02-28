
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://asingh:d9MfySJxzfduK4zz@cluster0.fezphsf.mongodb.net/test";
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully")
    })
    mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');

    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names);
    });
})
}

module.exports = connectToMongo 
