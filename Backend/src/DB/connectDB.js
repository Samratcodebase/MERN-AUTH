import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  console.log(process.env.DB_URL);

  const conn = await mongoose.connect(process.env.DB_URL);
};

export default connectDB;
