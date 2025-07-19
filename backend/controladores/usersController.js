// Archivo: backend/controladores/usersController.js

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../modelos/users.js';

export const listarUsuarios = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("❌ Error listing users:", err.message);
    res.status(500).json({ error: "Error listing users" });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    user
      ? res.json(user)
      : res.status(404).json({ error: "User not found" });
  } catch (err) {
    console.error("❌ Error getting user:", err.message);
    res.status(500).json({ error: "Error getting user" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const nuevo = await createUser(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    console.log("📥 Edit request:", req.body);
    const actualizado = await updateUser(req.params.id, req.body);
    console.log("✅ User updated:", actualizado);
    res.json(actualizado);
  } catch (err) {
    console.error("❌ Error updating user:", err.message);
    res.status(500).json({ error: "Error updating user", details: err.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("❌ Error deleting user:", err.message);
    res.status(500).json({ error: "Error deleting user" });
  }
};
