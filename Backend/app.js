import express from "express";
import cors from 'cors'

import db from '../Backend/database/db.js'
import productoRoutes from './routes/Productoroutes.js'
import clienteRoutes from './routes/Clienteroutes.js'
import comentatioRoutes from './routes/Comentarioroutes.js'
import empleadoRoutes from './routes/Empleadoroutes.js'
import sucursalRoutes from './routes/Sucursalroutes.js'
import repartidorRoutes from './routes/Repartidorroutes.js'
import pedidoRoutes from './routes/Pedidoroutes.js'
import listaProductosRoutes from './routes/Listaproductosroutes.js'
import envioxpedidoRoutes from './routes/Envioxpedidoroutes.js'
import consultaRoutes from './routes/Consultaroutes.js'
import personaRoutes from './routes/Personaroutes.js'
import garantiasRoutes from './routes/Garantiaroutes.js'
import provedorRoutes from './routes/Provedorroutes.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/productos', productoRoutes)
app.use('/clientes',clienteRoutes)
app.use('/comentarios',comentatioRoutes)
app.use('/empleados', empleadoRoutes)
app.use('/sucursales', sucursalRoutes)
app.use('/repartidores', repartidorRoutes)
app.use('/pedidos', pedidoRoutes)
app.use('/listaProductos', listaProductosRoutes)
app.use('/envioxpedido', envioxpedidoRoutes)
app.use('/consultas', consultaRoutes)
app.use('/personas', personaRoutes)
app.use ('/garantias',garantiasRoutes )
app.use('/provedores', provedorRoutes)
try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
})

app.listen (8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})