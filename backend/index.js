// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './rutas/users.js';
import clientsRouter from './rutas/clients.js';
import vehiclesRouter from './rutas/vehicles.js';
import companiesRouter from './rutas/companies.js';
import inspectionTemplatesRoutes from './rutas/inspectionTemplates.js';
import preWorkOrdersRoutes from './rutas/preWorkOrders.js';
import loginRouter from './rutas/login.js';
import appointmentsRouter from './rutas/appointments.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/clients', clientsRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/inspection-templates', inspectionTemplatesRoutes);
app.use('/api/pre-work-orders', preWorkOrdersRoutes);
app.use('/api/login', loginRouter);
app.use('/api/appointments', appointmentsRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
