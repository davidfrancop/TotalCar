// File: backend/rutas/companies.js
import express from "express";
import {
  listarEmpresas,
  obtenerEmpresa,
  crearEmpresa,
  actualizarEmpresa,
  eliminarEmpresa,
} from "../controladores/companiesController.js";

const router = express.Router();

router.get("/", listarEmpresas);
router.get("/:id", obtenerEmpresa);
router.post("/", crearEmpresa);
router.put("/:id", actualizarEmpresa);
router.delete("/:id", eliminarEmpresa);

export default router;
