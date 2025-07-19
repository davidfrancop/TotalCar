// File: backend/modelos/inspectionTemplates.js
import pool from '../db/pool.js';

export async function getAllInspectionTemplates() {
  const result = await pool.query('SELECT * FROM inspection_templates ORDER BY template_id');
  return result.rows;
}

export async function getInspectionTemplateById(id) {
  const result = await pool.query('SELECT * FROM inspection_templates WHERE template_id = $1', [id]);
  return result.rows[0] || null;
}
