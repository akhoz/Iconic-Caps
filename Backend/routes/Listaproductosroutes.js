import express from 'express'

import { getAllListaProductos, createListaPoductos} from '../controllers/ListaProductosPedidoController.js'


const router = express.Router()

router.get('/', getAllListaProductos)
router.post('/create',createListaPoductos)
export default router;