// backend/rutas/users.js
import express from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario
} from '../controladores/usersController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', editarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
