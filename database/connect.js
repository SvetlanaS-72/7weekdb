const mongoose = require ("mongoose");


const DB_URL = "mongodb://localhost:27017/pindie";

const connectToDatabase = async() => {
    try{
        await  mongoose.connect(DB_URL);
        console.log("DB connection success!");
    }catch (error){
       console.log(`DB connection ${error}`);
    }
};

module.exports = connectToDatabase;