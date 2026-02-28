const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { prisma } = require("../lib/prisma");
const { env } = require("../utils/env");
const { requireAuth } = require("../middleware/auth");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

router.use((req, _res, next) => {
  console.log("[USER ROUTER HIT]", req.method, req.originalUrl);
  next();
});

// POST /user/login
router.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user.id });

    res.cookie("pc_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (https)
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /user/me
router.get("/me", requireAuth, async (req, res) => {
  console.log("cookies:", req.cookies);
  try {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, created_at: true },
    });

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    return res.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /user/logout
router.post("/logout", (req, res) => {
  res.clearCookie("pc_token", { path: "/" });
  return res.json({ ok: true });
});

module.exports = router;