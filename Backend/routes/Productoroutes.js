 import express from 'express'
import { createProducto, deleteProducto, getAllProductos, getProducto, updateProducto } from '../controllers/ProductoController.js'

 
 const router = express.Router()

 router.get('/', getAllProductos)
 router.get('/:modelo', getProducto)
 router.post('/',createProducto)
 router.put('/:modelo', updateProducto)
 router.delete('/:modelo',deleteProducto)

 export default router;
 
