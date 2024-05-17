import express from 'express'

import {getAllClientes, getCliente, createCliente, updateCliente, deleteCliente} from '../controllers/ClienteController.js'


const router = express.Router()

router.get('/', getAllClientes)
router.get('/:Usuario', getCliente)
router.post('/', createCliente)
router.put('/:Usuario', updateCliente)
router.delete('/:Usuario', deleteCliente)

export default router;