import mongoose from "mongoose";
import 'dotenv/config'
 const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>console.log("MongoDB connected successfully"));
        mongoose.connection.on('error',()=>console.log("MongoDB connection failed"));
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        console.log(error.message); 
    }
}   
 
export default connectDB;                 