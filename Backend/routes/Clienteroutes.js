import express from 'express'

import {getAllClientes, getCliente, createCliente, updateUsuarioCliente, deleteCliente} from '../controllers/ClienteController.js'


const router = express.Router()

router.get('/', getAllClientes)
router.get('/:Usuario', getCliente)
router.post('/', createCliente)
router.put('/:Usuario', updateUsuarioCliente)
router.delete('/:Usuario', deleteCliente)

export default router;