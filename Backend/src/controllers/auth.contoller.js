import { json } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genereatetoken } from "../utils/generateToken.js";
import { SendMail } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  //TODO  Request Validation ,  i will Skip for now

  let user = await User.findOne({ email });
  console.log("Front end Hit");

  if (user) {
    (res.status(401),
      json({ message: "User With this Email Exist Try logging in" }));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const verficationToken = Math.floor(Math.random() * 10000);
  user.verficationToken = verficationToken;
  await user.save();

  const mailData = {
    to: "lordsamrat85@gmail.com",
    subject: "signup ooyeha",
    text: "wellcomme ",
    token: verficationToken,
  };
  await SendMail(mailData);
  console.log("Verificaiton Code", verficationToken);

  res.status(201).json({
    message: "User Creation Sucessfull",
    statusCode: 201,
    Data: {
      ...user._doc,
      password: "no passs",
    },
  });
};
const verifyEmail = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "No token ",
    });
  }
  const { verifycation } = req.body;
  console.log("from body", verifycation);

  const decoded = jwt.verify(token, "shhhhhh");

  console.log("Decoded Token", decoded);

  const user = await User.findOne({ email: decoded.token });
  if (!user) {
    return res.status(401).json({
      message: "No user Exist",
    });
  }
  console.log("The user object", user);

  console.log("Verification Token", user.verficationToken);

  if (user.verficationToken != Number(verifycation)) {
    return res.status(404).json({
      message: "Wrong Code",
    });
  }

  user.verficationToken = undefined;

  await user.save();

  res.status(200).json({ message: "Verification Sucessfull" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (req.cookies.token) {
    res.status(401).json({
      message: "Already Loged in token ",
    });
  }
  if (!email || !password) {
    return res.status(401).json({ message: "Check Email or Password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401).json({
      message: "No User Found",
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(401).json({
      message: "Email or Password is Wrong",
    });
  }
  user.lastLogin = new Date();
  await user.save();
  const token = genereatetoken(user.email);

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login Sucessfull",
  });
};

const logout = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "No token ",
    });
  }

  const decoded = jwt.verify(token, "shhhhhh");

  res.cookie("token", "");

  res.status(200).json({
    message: "Logout Sucessfull",
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({
      message: "Invalid User Input",
    });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 1 * 60 * 60 * 1000;
    user.save();
    console.log(`127.0.0.1:3000/api/v1/auth/rest-password/${token}`);
  }

  res.status(200).json({
    message: `If the Account Exist then You will recive and Email on ${email} and`,
  });
};
const restPassword = async (req, res) => {
  const Resettoken = req.params.id;
  const { newPassword } = req.body;
  console.log("Token is ", Resettoken);

  if (!newPassword) {
    res.status(400).json({
      message: "Invaild User Input",
    });
  }

  const user = await User.findOne({ resetPasswordToken: Resettoken });

  if (!user) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    message: "Password Rest Sucessfull",
  });
};

const checkAuth = async (req, res) => {
  const userId = req.userID;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(40).json({
      sucesss: false,
      message: "user not found",
    });
  }

  return res.status(200).json({
    sucesss: true,
    user: {
      ...user._doc,
      password: undefined,
    },
  });
};
export default {
  signup,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  restPassword,
  checkAuth,
};
