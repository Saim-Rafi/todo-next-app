import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://saimrafi123:Apply123@cluster0.fmwobj1.mongodb.net/');
    console.log("Database connected");
}