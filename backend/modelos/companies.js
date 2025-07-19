// File: backend/modelos/companies.js
import pool from "../db/pool.js";

// Obtener todas las empresas
export async function getAllCompanies() {
  const result = await pool.query("SELECT * FROM companies ORDER BY created_at DESC");
  return result.rows;
}

// Obtener una empresa por ID
export async function getCompanyById(id) {
  const result = await pool.query("SELECT * FROM companies WHERE company_id = $1", [id]);
  return result.rows[0];
}

// Crear una nueva empresa
export async function createCompany(data) {
  const {
    name,
    registration_number,
    email,
    phone,
    contact_person,
    street,
    house_number,
    postal_code,
    city,
    region,
    country,
  } = data;

  const result = await pool.query(
    `INSERT INTO companies
    (name, registration_number, email, phone, contact_person, street, house_number, postal_code, city, region, country)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [name, registration_number, email, phone, contact_person, street, house_number, postal_code, city, region, country]
  );

  return result.rows[0];
}

// Actualizar empresa
export async function updateCompany(id, data) {
  const {
    name,
    registration_number,
    email,
    phone,
    contact_person,
    street,
    house_number,
    postal_code,
    city,
    region,
    country,
  } = data;

  const result = await pool.query(
    `UPDATE companies SET
      name = $1,
      registration_number = $2,
      email = $3,
      phone = $4,
      contact_person = $5,
      street = $6,
      house_number = $7,
      postal_code = $8,
      city = $9,
      region = $10,
      country = $11
    WHERE company_id = $12
    RETURNING *`,
    [name, registration_number, email, phone, contact_person, street, house_number, postal_code, city, region, country, id]
  );

  return result.rows[0];
}

// Eliminar empresa
export async function deleteCompany(id) {
  const result = await pool.query("DELETE FROM companies WHERE company_id = $1 RETURNING *", [id]);
  return result.rows[0];
}
