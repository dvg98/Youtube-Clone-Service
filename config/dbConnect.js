const mongoose = require('mongoose');

const connectDB = async() => {
    const connect = await mongoose.connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log("MongoDB Connected : "+ "mongodb://localhost:27017/test");
}

module.exports = connectDB;