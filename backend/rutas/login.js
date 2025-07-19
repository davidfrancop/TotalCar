// Archivo: backend/rutas/login.js

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const router = express.Router();

// POST /api/login
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar usuario por nombre
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Comparar contraseña con hash
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "4h" }
    );

    // ✅ Guardar token en la base de datos
    await pool.query("UPDATE users SET token = $1 WHERE user_id = $2", [
      token,
      user.user_id,
    ]);

    // Devolver token y datos de sesión
    res.json({
      token,
      role: user.role.toLowerCase(),
      username: user.username,
      user_id: user.user_id,
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
