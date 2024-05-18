import express from 'express'

import { getAllEnvioXPedido} from '../controllers/EnvioXPedidoController.js'


const router = express.Router()

router.get('/', getAllEnvioXPedido)

export default router;