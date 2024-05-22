import express from 'express'

import { getAllRepartidores,getRepartidor, createRepartidor,updateRepartidor, deleteRepartidor} from '../controllers/RepartidorController.js'


const router = express.Router()

router.get('/', getAllRepartidores)
router.get('/:Cedula', getRepartidor)
router.post('/', createRepartidor)
router.put('/:Cedula', updateRepartidor)
router.delete('/:Cedula', deleteRepartidor)
export default router;