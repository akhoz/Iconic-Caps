import express from 'express'

import { getAllRepartidores, deleteRepartidor} from '../controllers/RepartidorController.js'


const router = express.Router()

router.get('/', getAllRepartidores)
router.delete('/:Cedula', deleteRepartidor)
export default router;