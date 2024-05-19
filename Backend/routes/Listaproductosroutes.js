import express from 'express'

import { getAllListaProductos} from '../controllers/ListaProductosPedidoController.js'


const router = express.Router()

router.get('/', getAllListaProductos)
export default router;