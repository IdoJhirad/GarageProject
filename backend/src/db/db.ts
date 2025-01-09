import mongoose from 'mongoose'
import dotenv from "dotenv";
import * as process from "node:process";
dotenv.config();

/**
 * return type of Promise<void> type safety.*/
const connectToDb = async () :Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to DB");
    } catch (error) {
        console.log("failed to connect mongo db",error);
    }
}
export default connectToDb;

