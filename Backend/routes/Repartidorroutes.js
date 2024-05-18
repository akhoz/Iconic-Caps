import express from 'express'

import { getAllRepartidores} from '../controllers/RepartidorController.js'


const router = express.Router()

router.get('/', getAllRepartidores)

export default router;