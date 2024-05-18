import express from 'express'

import { getAllPedidos} from '../controllers/PedidoController.js'


const router = express.Router()

router.get('/', getAllPedidos)

export default router;