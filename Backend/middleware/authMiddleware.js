const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET || !JWT_SECRET.trim()) {
    console.error("System Error: JWT_SECRET environment variable is missing.");
    return res.status(500).json({ success: false, message: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET.trim());
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
