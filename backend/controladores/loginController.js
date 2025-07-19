// Archivo: backend/controladores/loginController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db/pool.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await pool.query("UPDATE users SET token = $1 WHERE user_id = $2", [
      token,
      user.user_id,
    ]);

    res.json({
      token,
      username: user.username,
      role: user.role,
      userId: user.user_id,
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
