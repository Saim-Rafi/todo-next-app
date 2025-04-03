import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://saimrafi123:Apply123@cluster0.fmwobj1.mongodb.net/';

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection error");
    }
};