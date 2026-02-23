import express from "express";
import { AdminLogin , AdminLogout } from "../Controllers/AuthController";
import { csrfProtection } from "../config/csrf";

const router = express.Router();

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

router.post("/login", csrfProtection, AdminLogin);
router.post("/logout", csrfProtection, AdminLogout);

export default router;