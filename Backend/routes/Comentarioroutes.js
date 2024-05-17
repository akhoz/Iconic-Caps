import express from 'express'
import { getAllComentarios, getComentarioByModel, getComentarioByCedula, createComentario, 
    updateComentario, deleteComentario
} from '../controllers/ComentarioController.js'

const router = express.Router()

router.get('/', getAllComentarios)
router.get('/modelo/:ModeloProducto', getComentarioByModel)
router.get('/cedula/:CedulaCliente', getComentarioByCedula)
router.post('/', createComentario)
router.put('/:id', updateComentario)
router.delete('/:id', deleteComentario)

export default router;