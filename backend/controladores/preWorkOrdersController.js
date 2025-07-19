// File: backend/controladores/preWorkOrdersController.js
import {
  createPreWorkOrder,
  getPreWorkOrderById,
  getAllPreWorkOrders
} from '../modelos/preWorkOrders.js';

export async function handleCreatePreWorkOrder(req, res) {
  try {
    const {
      vehicle_id,
      template_id,
      note_from_reception,
      answers,
      additional_notes
    } = req.body;

    if (!vehicle_id || !template_id || !answers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPreWorkOrder = await createPreWorkOrder({
      vehicle_id,
      template_id,
      note_from_reception: note_from_reception || '',
      answers,
      additional_notes: additional_notes || ''
    });

    res.status(201).json(newPreWorkOrder);
  } catch (error) {
    console.error('Error creating pre-work order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function handleGetPreWorkOrderById(req, res) {
  try {
    const { id } = req.params;
    const preWorkOrder = await getPreWorkOrderById(id);

    if (!preWorkOrder) {
      return res.status(404).json({ error: 'Pre-work order not found' });
    }

    res.json(preWorkOrder);
  } catch (error) {
    console.error('Error fetching pre-work order by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function handleGetPreWorkOrders(req, res) {
  try {
    const { status } = req.query;
    const orders = await getAllPreWorkOrders(status);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching pre-work orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
