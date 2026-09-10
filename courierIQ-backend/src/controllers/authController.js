import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const userExists = await User.findOne({ where: { email: email } });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeValidationError")
      return res.status(400).json({ message: err.errors[0].message });

    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const userExists = await User.findOne({ where: { email: email } });
    if (!userExists)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password,
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(userExists.id);
    return res.status(200).json({
      message: "Succesful login",
      user: { name: userExists.name, email: email, id: userExists.id },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
