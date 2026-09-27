import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

export const registerService = async (name, email, password) => {
  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) throw new Error("User already exists");

  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
  });

  const userToken = generateToken(newUser.id);

  return { newUser, userToken };
};

export const loginService = async (email, password) => {
  const userExists = await User.findOne({ where: { email: email } });

  if (!userExists) throw new Error("Invalid email or password");

  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

  if (!isPasswordCorrect) throw new Error("Invalid email or password");

  const token = generateToken(userExists.id);

  return {
    token,
    userExists,
  };
};
