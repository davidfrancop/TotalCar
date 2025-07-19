// File: backend/controladores/companiesController.js
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../modelos/companies.js";

// GET /api/companies
export async function listarEmpresas(req, res) {
  try {
    const empresas = await getAllCompanies();
    res.json(empresas);
  } catch (error) {
    console.error("Error al listar empresas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// GET /api/companies/:id
export async function obtenerEmpresa(req, res) {
  try {
    const { id } = req.params;
    const empresa = await getCompanyById(id);
    if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
    res.json(empresa);
  } catch (error) {
    console.error("Error al obtener empresa:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// POST /api/companies
export async function crearEmpresa(req, res) {
  try {
    const nuevaEmpresa = await createCompany(req.body);
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    console.error("Error al crear empresa:", error);
    res.status(500).json({ error: "Error al crear empresa" });
  }
}

// PUT /api/companies/:id
export async function actualizarEmpresa(req, res) {
  try {
    const { id } = req.params;
    const actualizada = await updateCompany(id, req.body);
    res.json(actualizada);
  } catch (error) {
    console.error("Error al actualizar empresa:", error);
    res.status(500).json({ error: "Error al actualizar empresa" });
  }
}

// DELETE /api/companies/:id
export async function eliminarEmpresa(req, res) {
  try {
    const { id } = req.params;
    const eliminada = await deleteCompany(id);
    res.json(eliminada);
  } catch (error) {
    console.error("Error al eliminar empresa:", error);
    res.status(500).json({ error: "Error al eliminar empresa" });
  }
}
