// Archivo: backend/modelos/vehicles.js
import pool from "../db/pool.js";

// GET all vehicles
export const getAllVehicles = async () => {
  const result = await pool.query("SELECT * FROM vehicles ORDER BY vehicle_id DESC");
  return result.rows;
};

// GET vehicle by ID
export const getVehicleById = async (id) => {
  const result = await pool.query("SELECT * FROM vehicles WHERE vehicle_id = $1", [id]);
  return result.rows[0];
};

// CREATE new vehicle
export const createVehicle = async (data) => {
  const {
    client_id,
    plate,
    vin,
    make,
    model,
    year,
    hsn,
    tsn,
    fuel_type,
    vehicle_type,
    drive,
    transmission,
    km,
    tuv_month,
    tuv_year,
    registration_date,
  } = data;

  const result = await pool.query(
    `INSERT INTO vehicles (
      client_id, plate, vin, make, model, year, hsn, tsn,
      fuel_type, vehicle_type, drive, transmission, km,
      tuv_month, tuv_year, registration_date
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    RETURNING *`,
    [
      client_id,
      plate,
      vin,
      make,
      model,
      year,
      hsn,
      tsn,
      fuel_type,
      vehicle_type,
      drive,
      transmission,
      km,
      tuv_month,
      tuv_year,
      registration_date,
    ]
  );

  return result.rows[0];
};

// UPDATE vehicle
export const updateVehicle = async (id, data) => {
  const {
    plate,
    vin,
    make,
    model,
    year,
    hsn,
    tsn,
    fuel_type,
    vehicle_type,
    drive,
    transmission,
    km,
    tuv_month,
    tuv_year,
    registration_date,
    last_service_date,
    client_id,
  } = data;

  const result = await pool.query(
    `UPDATE vehicles SET
      plate = $1,
      vin = $2,
      make = $3,
      model = $4,
      year = $5,
      hsn = $6,
      tsn = $7,
      fuel_type = $8,
      vehicle_type = $9,
      drive = $10,
      transmission = $11,
      km = $12,
      tuv_month = $13,
      tuv_year = $14,
      registration_date = $15,
      last_service_date = $16,
      client_id = $17
    WHERE vehicle_id = $18
    RETURNING *`,
    [
      plate,
      vin,
      make,
      model,
      year,
      hsn,
      tsn,
      fuel_type,
      vehicle_type,
      drive,
      transmission,
      km,
      tuv_month,
      tuv_year,
      registration_date,
      last_service_date,
      client_id,
      id,
    ]
  );

  return result.rows[0];
};

// DELETE vehicle
export const deleteVehicle = async (id) => {
  const result = await pool.query("DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING *", [id]);
  return result.rowCount > 0;
};

// ✅ COUNT vehicles
export const countVehicles = async () => {
  return pool.query("SELECT COUNT(*) FROM vehicles");
};
