import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const Protect = async (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({
      message: "No Token",
    });
  }

  try {
    const decoded = jwt.verify(token, "shhhhhh");
    const user = await User.findOne({ email: decoded.id });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "unauthorized - Invalid token",
      });
    }
    res.userID = user._id;

    next();
  } catch (error) {
    console.log("Error in Middleware", error);

    res.status(500).json({ message: "Auth Middleware Failed" });
  }
};
