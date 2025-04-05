import connectDB from "./Db";
//const connectDB = require('./Db');

async function testConnection() {
  try {
    await connectDB();
    console.log("Connection test successful");
  } catch (error) {
    console.error("Connection test failed:", error.message, error.stack);
  }
}

testConnection();
