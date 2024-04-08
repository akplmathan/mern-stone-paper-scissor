const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.URL);
        console.log('DB Connected SuccessFully');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;