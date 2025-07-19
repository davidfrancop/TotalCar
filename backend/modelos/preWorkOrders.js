// File: backend/modelos/preWorkOrders.js
import pool from '../db/pool.js';

export async function createPreWorkOrder({
  vehicle_id,
  template_id,
  note_from_reception,
  answers,
  additional_notes
}) {
  const query = `
    INSERT INTO pre_work_orders (
      vehicle_id,
      template_id,
      note_from_reception,
      answers,
      additional_notes
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    vehicle_id,
    template_id,
    note_from_reception,
    answers,
    additional_notes
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getPreWorkOrderById(id) {
  const result = await pool.query(
    'SELECT * FROM pre_work_orders WHERE pre_work_order_id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function getAllPreWorkOrders(status) {
  if (status) {
    const result = await pool.query(
      'SELECT * FROM pre_work_orders WHERE status = $1 ORDER BY created_at DESC',
      [status]
    );
    return result.rows;
  } else {
    const result = await pool.query(
      'SELECT * FROM pre_work_orders ORDER BY created_at DESC'
    );
    return result.rows;
  }
}
