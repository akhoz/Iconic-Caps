import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


const URI = 'http://localhost:8000/productos/'
const CompShowProductos = () => {
    const [productos, setProducto] = useState([])
    useEffect( ()=>{
        getProductos()
    },[])

    //procedimiento para mostrar todos los blogs
    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }
    console.log(productos)
    return(
        <div>
                <table class="table-fixed">
                <thead>
                    <tr>
                    <th>Modelo</th>
                    <th>Categoria</th>
                    <th>Precio</th>
                    <th>ExistenciasDisponibles</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map ((producto) => (
                        <tr>
                            <td> {producto.Modelo}</td>
                            <td> {producto.Categoria}</td>
                            <td> {producto.Precio}</td>
                            <td> {producto.ExistenciasDisponibles}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
}

export default CompShowProductos;
    
