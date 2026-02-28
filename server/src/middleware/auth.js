const jwt = require("jsonwebtoken");
const { env } = require("../utils/env");

function requireAuth(req, res, next) {
  const token = req.cookies?.pc_token;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { id: ... }
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { requireAuth };