import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://saimrafi123:Apply123@cluster0.fmwobj1.mongodb.net/';

export const connectDB = async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        console.log("✅ Using existing database connection");
        return;
      }
  
      await mongoose.connect(MONGODB_URI, {
        dbName: "Todo-next-App", 
      });
  
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      throw new Error("Database connection error");
    }
  };
