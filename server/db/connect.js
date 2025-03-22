import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connect = async ()=>{
    try {
        console.log("hmmmmmm, wait a sec!")
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Dope! Database is connected");
    } catch (error) {
        console.log("Failed to connect to the database.....", error.message);  
        process.exit(1);      
    }
}

export default connect;
