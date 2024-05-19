import express from 'express'

import { getAllEnvioXPedido, updateEstado} from '../controllers/EnvioXPedidoController.js'


const router = express.Router()

router.get('/', getAllEnvioXPedido)
router.put('/:NumeroFacturaPedido', updateEstado)
export default router;