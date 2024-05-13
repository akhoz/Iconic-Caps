import express from 'express'
import { getAllComentarios, getComentarioByModel, getComentarioByCedula } from '../controllers/ComentarioController.js'

const router = express.Router()

router.get('/', getAllComentarios)
router.get('/modelo/:ModeloProducto', getComentarioByModel)
router.get('/cedula/:CedulaCliente', getComentarioByCedula)

export default router;