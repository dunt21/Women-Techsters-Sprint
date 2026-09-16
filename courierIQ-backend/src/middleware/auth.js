import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).json({ msg: "Access Denied" });

    const token = authHeader.split(" ")[1];
  

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
}
