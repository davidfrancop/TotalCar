// backend/rutas/appointments.js
import express from "express";
import {
  getAllAppointments,
  getAppointmentsByDate,
} from "../controladores/appointmentsController.js";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/date/:date", getAppointmentsByDate);

export default router;
