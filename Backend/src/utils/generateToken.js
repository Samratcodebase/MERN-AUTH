import jwt from "jsonwebtoken";
export const genereatetoken = (token) => {
  return jwt.sign({ token }, "shhhhhh", { expiresIn: "7d" });
};
