// Archivo: backend/modelos/users.js

import pool from '../db/pool.js';
import bcrypt from 'bcrypt';

// GET all users
export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY user_id ASC');
  return result.rows;
};

// GET user by ID
export const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
  return result.rows[0];
};

// CREATE user
export const createUser = async (data) => {
  const { first_name, last_name, username, email, role, password } = data;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, username, email, role, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [first_name, last_name, username, email, role, hashed]
  );

  return result.rows[0];
};

// UPDATE user
export const updateUser = async (id, data) => {
  const {
    first_name,
    last_name,
    username,
    email,
    role,
    password, // optional
  } = data;

  let query;
  let values;

  if (password && password.trim() !== "") {
    const hashed = await bcrypt.hash(password, 10);
    query = `
      UPDATE users SET
        first_name = $1,
        last_name = $2,
        username = $3,
        email = $4,
        role = $5,
        password_hash = $6
      WHERE user_id = $7
      RETURNING *`;
    values = [first_name, last_name, username, email, role, hashed, id];
  } else {
    query = `
      UPDATE users SET
        first_name = $1,
        last_name = $2,
        username = $3,
        email = $4,
        role = $5
      WHERE user_id = $6
      RETURNING *`;
    values = [first_name, last_name, username, email, role, id];
  }

  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE user
export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
};
