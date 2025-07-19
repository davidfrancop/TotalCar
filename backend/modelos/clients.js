// File: backend/modelos/clients.js
import pool from "../db/pool.js";

// Obtener todos los clientes
export const getAll = () => {
  return pool.query(`
    SELECT
        client_id, first_name, last_name, dni,
        client_type, company_name, registration_number, email, phone_number,
        street, house_number, postal_code, city, region, country, created_at
    FROM clients
    ORDER BY client_id DESC
  `);
};

// Obtener cliente por ID
export const getById = (id) => {
  return pool.query(`
    SELECT
        client_id, first_name, last_name, dni,
        client_type, company_name, registration_number, email, phone_number,
        street, house_number, postal_code, city, region, country, created_at
    FROM clients
    WHERE client_id = $1`,
  [id]);
};

// Crear nuevo cliente
export const create = (data) => {
  const {
    client_type,
    first_name,
    last_name,
    dni,
    company_name,
    registration_number,
    email,
    phone_number,
    street,
    house_number,
    postal_code,
    city,
    region,
    country,
  } = data;

  return pool.query(
    `INSERT INTO clients (
      client_type, first_name, last_name, dni,
      company_name, registration_number, email, phone_number,
      street, house_number, postal_code, city, region, country
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING client_id`,
    [
      client_type,
      first_name,
      last_name,
      dni,
      company_name,
      registration_number,
      email,
      phone_number,
      street,
      house_number,
      postal_code,
      city,
      region,
      country,
    ]
  );
};

// Actualizar cliente
export const update = (id, data) => {
  const {
    client_type,
    first_name,
    last_name,
    dni,
    company_name,
    registration_number,
    email,
    phone_number,
    street,
    house_number,
    postal_code,
    city,
    region,
    country,
  } = data;

  return pool.query(
    `UPDATE clients SET
      client_type = $1,
      first_name = $2,
      last_name = $3,
      dni = $4,
      company_name = $5,
      registration_number = $6,
      email = $7,
      phone_number = $8,
      street = $9,
      house_number = $10,
      postal_code = $11,
      city = $12,
      region = $13,
      country = $14
    WHERE client_id = $15
    RETURNING client_id, first_name, last_name, dni, client_type, company_name, registration_number, email, phone_number, street, house_number, postal_code, city, region, country`,
    [
      client_type,
      first_name,
      last_name,
      dni,
      company_name,
      registration_number,
      email,
      phone_number,
      street,
      house_number,
      postal_code,
      city,
      region,
      country,
      id,
    ]
  );
};

// Eliminar cliente
export const remove = (id) => {
  return pool.query("DELETE FROM clients WHERE client_id = $1 RETURNING client_id", [id]);
};

// Contar total de clientes
export const count = () => {
  return pool.query("SELECT COUNT(*) FROM clients");
};

// ✅ Obtener vehículos de un cliente (usando vehicle_id real, sin alias)
export const getVehiclesByClientId = (clientId) => {
  return pool.query(
    `SELECT vehicle_id, plate, make, model, year FROM vehicles WHERE client_id = $1 ORDER BY vehicle_id DESC`,
    [clientId]
  );
};
