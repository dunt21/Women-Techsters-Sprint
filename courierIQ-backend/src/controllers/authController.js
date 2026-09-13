import { loginService, registerService } from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const newUser = await registerService(name, email, password);

    return res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeValidationError")
      return res.status(400).json({ message: err.errors[0].message });

    if (err.message === "User already exists")
      return res.status(400).json({ message: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const { userExists, token } = await loginService(email, password);

    return res.status(200).json({
      message: "Succesful login",
      user: { name: userExists.name, email: email, id: userExists.id },
      token: token,
    });
  } catch (error) {
    if (err.message === "Invalid email or password")
      return res.status(400).json({ message: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};
