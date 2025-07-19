// File: backend/rutas/preWorkOrders.js
import express from 'express';
import {
  handleCreatePreWorkOrder,
  handleGetPreWorkOrderById,
  handleGetPreWorkOrders
} from '../controladores/preWorkOrdersController.js';

const router = express.Router();

// GET /api/pre-work-orders?status=pending_assignment
router.get('/', handleGetPreWorkOrders);

// POST /api/pre-work-orders
router.post('/', handleCreatePreWorkOrder);

// GET /api/pre-work-orders/:id
router.get('/:id', handleGetPreWorkOrderById);

export default router;
