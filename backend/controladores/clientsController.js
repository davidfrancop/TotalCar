// File: backend/controladores/clientsController.js
import * as ClientsModel from "../modelos/clients.js";

// GET all clients with their vehicles
export const getAllClients = async (req, res) => {
  console.log("📥 [GET] /api/clients - Request received");

  try {
    const result = await ClientsModel.getAll();
    const clients = result.rows;

    console.log("📦 Total clients found:", clients.length);

    const clientsWithVehicles = await Promise.all(
      clients.map(async (client) => {
        const vehiclesResult = await ClientsModel.getVehiclesByClientId(client.client_id);
        console.log(`🚗 Client ${client.client_id} vehicles:`, vehiclesResult.rows.length);
        return {
          ...client,
          vehicles: vehiclesResult.rows, // ✅ vehicle_id incluido, no alias
        };
      })
    );

    console.log("✅ Sending clients with vehicles");
    res.json(clientsWithVehicles);
  } catch (error) {
    console.error("❌ Error in getAllClients:", error);
    res.status(500).json({ error: "Error fetching clients with vehicles" });
  }
};

// GET client by ID with vehicles
export const getClientById = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [GET] /api/clients/${id}`);

  try {
    const result = await ClientsModel.getById(id);
    if (result.rows.length === 0) {
      console.warn("⚠️ Client not found:", id);
      return res.status(404).json({ error: "Client not found" });
    }

    const client = result.rows[0];
    const vehiclesResult = await ClientsModel.getVehiclesByClientId(client.client_id);

    console.log(`✅ Found client ${id}, vehicles: ${vehiclesResult.rows.length}`);
    res.json({ ...client, vehicles: vehiclesResult.rows });
  } catch (error) {
    console.error("❌ Error in getClientById:", error);
    res.status(500).json({ error: "Error fetching client" });
  }
};

// POST create new client
export const createClient = async (req, res) => {
  console.log("📥 [POST] /api/clients - Creating client...");
  try {
    const result = await ClientsModel.create(req.body);
    console.log("✅ Client created with ID:", result.rows[0].client_id);
    res.status(201).json({ client_id: result.rows[0].client_id });
  } catch (error) {
    console.error("❌ Error creating client:", error.message);
    res.status(500).json({ error: "Error creating client" });
  }
};

// PUT update client
export const updateClient = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [PUT] /api/clients/${id} - Updating client`);
  try {
    const result = await ClientsModel.update(id, req.body);
    if (result.rows.length === 0) {
      console.warn("⚠️ Client not found for update:", id);
      return res.status(404).json({ error: "Client not found" });
    }
    console.log("✅ Client updated:", id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating client:", error.message);
    res.status(500).json({ error: "Error updating client" });
  }
};

// DELETE client
export const deleteClient = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [DELETE] /api/clients/${id} - Deleting client`);
  try {
    const result = await ClientsModel.remove(id);
    if (result.rows.length === 0) {
      console.warn("⚠️ Client not found for delete:", id);
      return res.status(404).json({ error: "Client not found" });
    }
    console.log("🗑️ Client deleted:", id);
    res.json({ message: "Client deleted", client: result.rows[0] });
  } catch (error) {
    console.error("❌ Error deleting client:", error.message);
    res.status(500).json({ error: "Error deleting client" });
  }
};

// GET client count
export const getClientCount = async (req, res) => {
  console.log("📥 [GET] /api/clients/count");
  try {
    const result = await ClientsModel.count();
    const count = parseInt(result.rows[0].count, 10);
    console.log("🔢 Total clients:", count);
    res.json({ count });
  } catch (error) {
    console.error("❌ Error counting clients:", error.message);
    res.status(500).json({ error: "Error counting clients" });
  }
};
