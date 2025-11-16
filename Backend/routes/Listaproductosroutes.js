import express from 'express'

import { getAllListaProductos, createListaPoductos } from '../controllers/ListaProductosPedidoController.js'
import { validatePedidoData } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.get('/', getAllListaProductos)
router.post('/create', validatePedidoData, createListaPoductos)
export default router;
