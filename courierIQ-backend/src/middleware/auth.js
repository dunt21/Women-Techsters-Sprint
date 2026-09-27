import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).json({ message: "Access Denied" });

    const token = authHeader.split(" ")[1];

    console.log("MY TOKEN IS:", token);
    console.log("MY SECRET IS:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    console.log(req.user);

    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ message: "Token has expired, please log in again" });

    res.status(403).json({ message: "Invalid Token" });
  }
}
