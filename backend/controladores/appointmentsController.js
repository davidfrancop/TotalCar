// Archivo: backend/controladores/appointmentsController.js

import pool from "../db/pool.js";

// Obtener todas las citas (appointments)
export async function getAllAppointments(req, res) {
  try {
    const result = await pool.query(`
      SELECT 
        a.appointment_id,
        a.start,
        a.end_time,
        a.reason,
        CONCAT(c.first_name, ' ', c.last_name) AS client_name,
        CONCAT(v.make, ' ', v.model) AS vehicle
      FROM appointments a
      JOIN clients c ON a.client_id = c.client_id
      JOIN vehicles v ON a.vehicle_id = v.vehicle_id
      ORDER BY a.start ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({ error: "Failed to load appointments" });
  }
}

// Obtener citas filtradas por fecha (YYYY-MM-DD)
export async function getAppointmentsByDate(req, res) {
  const { date } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        a.appointment_id,
        a.start,
        a.end_time,
        a.reason,
        CONCAT(c.first_name, ' ', c.last_name) AS client_name,
        CONCAT(v.make, ' ', v.model) AS vehicle
      FROM appointments a
      JOIN clients c ON a.client_id = c.client_id
      JOIN vehicles v ON a.vehicle_id = v.vehicle_id
      WHERE TO_CHAR(a.start, 'YYYY-MM-DD') = $1
      ORDER BY a.start ASC
      `,
      [date]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments by date:", error);
    res.status(500).json({ error: "Failed to load appointments for date" });
  }
}
