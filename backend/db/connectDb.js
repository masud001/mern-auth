import mongoose from "mongoose";

export const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI environment variable is not set.");
    process.exit(1);
  }
  try {
    const connect = await mongoose.connect(mongoUri);
    console.log(
      "MongoDB connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
