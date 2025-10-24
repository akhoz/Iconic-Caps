import express from 'express'

import {getAllClientes, getCliente, createCliente, updateUsuarioCliente, deleteCliente} from '../controllers/ClienteController.js'

import { requireAuth } from '../middleware/requireAuth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = express.Router()

router.get('/', requireAuth, requireAdmin, getAllClientes)
router.get('/:Usuario', getCliente)
router.post('/', createCliente)
router.put('/:Usuario', updateUsuarioCliente)
router.delete('/:Usuario', deleteCliente)

export default router;