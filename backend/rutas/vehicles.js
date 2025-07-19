import express from "express";
import {
  listarVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
  getVehicleCount,
} from "../controladores/vehiclesController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Proteger todas las rutas con el middleware
router.use(verifyToken);

router.get("/", listarVehiculos);
router.get("/count", getVehicleCount);
router.get("/:id", obtenerVehiculo);
router.post("/", crearVehiculo);
router.put("/:id", editarVehiculo);
router.delete("/:id", eliminarVehiculo);

export default router;
