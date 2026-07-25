import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/DB/connectDB.js";
dotenv.config();
connectDB()
  .then(() => {
    console.log("Database Connection Sucessfull");

    app.listen(process.env.PORT, () => {
      console.log("Server is Running on PORT", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Server Crash Due to DB connection Error", err);
    process.exit(1);
  });
