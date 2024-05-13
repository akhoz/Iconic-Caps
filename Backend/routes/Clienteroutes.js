import express from 'express'

import {getAllClientes, getCliente} from '../controllers/ClienteController.js'


const router = express.Router()

router.get('/', getAllClientes)
router.get('/:Usuario', getCliente)

export default router;