// File: backend/rutas/inspectionTemplates.js
import express from 'express';
import {
  getAllTemplates,
  getTemplateById,
} from '../controladores/inspectionTemplatesController.js';

const router = express.Router();

// GET all templates
router.get('/', getAllTemplates);

// GET a specific template by ID
router.get('/:id', getTemplateById);

export default router;
