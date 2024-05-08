import express from 'express'
import { getAllComentarios, getComentario } from '../controllers/ComentarioController.js'

const router = express.Router()

router.get('/', getAllComentarios)
router.get('/:ModeloProducto', getComentario)

export default router;