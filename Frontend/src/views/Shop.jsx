import axios from 'axios'
import {useState, useEffect} from 'react'
import Product from "../components/Product.jsx";

function Shop () {
    const URI = 'http://localhost:8000/productos/'

    const [productos, setProducto] = useState([])
    useEffect( ()=>{
        getProductos()
    },[])

    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-6">
                {productos.map(producto => (
                    <div key={producto.id} className="w-fit" data-aos="fade-up">
                        <Product
                            imgSrc={"/img/example-cap-transparent.png"}
                            imgAlt="Cap"
                            model={producto.Modelo}
                            brand={producto.Provedor.NombreEmpresa}
                            category={producto.Categoria}
                            stock={producto.ExistenciasDisponibles}
                            price={producto.Precio}
                            name={producto.Provedor.NombreEmpresa}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop;