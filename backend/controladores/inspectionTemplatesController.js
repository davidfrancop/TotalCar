// File: backend/controladores/inspectionTemplatesController.js
import {
  getAllInspectionTemplates,
  getInspectionTemplateById
} from '../modelos/inspectionTemplates.js';

export async function getAllTemplates(req, res) {
  try {
    const templates = await getAllInspectionTemplates();
    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTemplateById(req, res) {
  const { id } = req.params;
  try {
    const template = await getInspectionTemplateById(id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
