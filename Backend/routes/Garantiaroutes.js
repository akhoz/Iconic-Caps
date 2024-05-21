import express from 'express'
import {getAllGarantias} from '../controllers/GarantiaXPedidoController.js'

const router = express.Router()

router.get('/', getAllGarantias)

export default router;