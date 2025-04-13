import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // to parse json bodies req.body

// authentication routes
app.use("/api/auth", authRoutes);

// start the server
app.listen(PORT, async () => {
  await connectDb();
  console.log(" Database connected :", process.env.MONGO_URI);
  console.log(` Server is running on port ${PORT}`);
});
