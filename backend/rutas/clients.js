// File: backend/rutas/clients.js
import express from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientCount, // ✅ Importar función para contar
} from "../controladores/clientsController.js";

const router = express.Router();

// ✅ Esta ruta debe ir antes que `/:id` para evitar conflicto
router.get("/count", getClientCount);

// GET all clients
router.get("/", getAllClients);

// GET client by ID
router.get("/:id", getClientById);

// POST new client
router.post("/", createClient);

// PUT update client
router.put("/:id", updateClient);

// DELETE client
router.delete("/:id", deleteClient);

export default router;
