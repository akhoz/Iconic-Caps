import express from 'express'
import { getAllComentarios, getComentarioByModel, getComentarioByCedula, getCometarioById, createComentario, 
    updateComentario, deleteComentario
} from '../controllers/ComentarioController.js'

const router = express.Router()

router.get('/', getAllComentarios)
router.get('/modelo/:ModeloProducto', getComentarioByModel)
router.get('/cedula/:CedulaCliente', getComentarioByCedula)
router.get('/id/:IdComentario', getCometarioById)
router.post('/', createComentario)
router.put('/:idComentario', updateComentario)
router.delete('/:IdComentario', deleteComentario)

export default router;