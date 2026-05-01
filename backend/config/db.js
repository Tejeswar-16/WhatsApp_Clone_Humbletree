require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/whatsapp");
        console.log("DB Connected");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDB;