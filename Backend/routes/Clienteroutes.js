import express from 'express'

import {getAllClientes} from '../controllers/ClienteController.js'


const router = express.Router()

router.get('/', getAllClientes)

export default router;