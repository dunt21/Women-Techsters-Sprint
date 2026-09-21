// import { token } from "morgan";
import { loginService, registerService } from "../services/authService.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { newUser, userToken } = await registerService(name, email, password);

  return res.status(201).json({
    message: "Registration successful!",
    user: newUser,
    token: userToken,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { userExists, token } = await loginService(email, password);

  return res.status(200).json({
    message: "Succesful login",
    user: { name: userExists.name, email: email, id: userExists.id },
    token: token,
  });
};
