// Archivo: backend/controladores/vehiclesController.js

import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  countVehicles,
} from "../modelos/vehicles.js";

// GET todos los vehículos
export const listarVehiculos = async (req, res) => {
  try {
    const vehicles = await getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).json({ error: "Failed to retrieve vehicles", message: error.message });
  }
};

// GET vehículo por ID
export const obtenerVehiculo = async (req, res) => {
  try {
    const vehicle = await getVehicleById(req.params.id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    console.error("Error al obtener vehículo por ID:", error);
    res.status(500).json({ error: "Failed to retrieve vehicle", message: error.message });
  }
};

// POST crear vehículo
export const crearVehiculo = async (req, res) => {
  try {
    console.log("➡️ [vehiclesController] Recibiendo datos para crear vehículo:", req.body);
    const nuevoVehiculo = await createVehicle(req.body);
    console.log("✅ [vehiclesController] Vehículo creado exitosamente:", nuevoVehiculo);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    console.error("❌ [vehiclesController] Error al crear vehículo:", error);
    res.status(500).json({ error: "Failed to create vehicle", message: error.message });
  }
};

// PUT editar vehículo (protegido para 'mechanic')
export const editarVehiculo = async (req, res) => {
  try {
    if (req.user?.role === "mechanic") {
      return res.status(403).json({ error: "Mechanics are not allowed to edit vehicles" });
    }

    const { id } = req.params;
    const actualizado = await updateVehicle(id, req.body);
    if (!actualizado) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    res.status(500).json({ error: "Failed to update vehicle", message: error.message });
  }
};

// DELETE vehículo (protegido para 'mechanic')
export const eliminarVehiculo = async (req, res) => {
  try {
    if (req.user?.role === "mechanic") {
      return res.status(403).json({ error: "Mechanics are not allowed to delete vehicles" });
    }

    const { id } = req.params;
    const eliminado = await deleteVehicle(id);
    if (!eliminado) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res.status(500).json({ error: "Failed to delete vehicle", message: error.message });
  }
};

// GET contar vehículos
export const getVehicleCount = async (req, res) => {
  try {
    const result = await countVehicles();
    const count = parseInt(result.rows[0].count, 10);
    res.json({ count });
  } catch (error) {
    console.error("❌ Error al contar vehículos:", error.message);
    res.status(500).json({ error: "Error counting vehicles" });
  }
};
