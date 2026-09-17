export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "SequelizeValidationError")
    return res.status(400).json({ message: err.errors[0].message });

  if (err.message === "User already exists")
    return res.status(400).json({ message: err.message });

  if (err.message === "Invalid email or password")
    return res.status(400).json({ message: err.message });

  res.status(500).json({ msg: err.message || "Server Error" });
}
