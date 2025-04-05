import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    console.log("🔌 Connection state:", mongoose.connection.readyState); // 1 means connected
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log("🔄 Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ Connected to MongoDB");
        console.log("🔌 Host:", mongooseInstance.connection.host);
        console.log("🔌 Connection state:", mongooseInstance.connection.readyState); // Should be 1
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;


// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// async function connectDB() {
//   try {
//     const connection = await mongoose.connect(MONGODB_URI);
//     console.log("Connected to MongoDB");
//     return connection;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;
//   }
// }

// export default connectDB;
