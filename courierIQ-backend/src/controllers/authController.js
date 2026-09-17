import { registerSchema } from "../schema/authValidator.js";
import { loginService, registerService } from "../services/authService.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newUser = await registerService(name, email, password);

  return res
    .status(201)
    .json({ message: "Registration successful!", user: newUser });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please provide all fields" });

  const { userExists, token } = await loginService(email, password);

  return res.status(200).json({
    message: "Succesful login",
    user: { name: userExists.name, email: email, id: userExists.id },
    token: token,
  });
};
