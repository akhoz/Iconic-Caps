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
        <>
            <div className="flex flex-col" data-aos="fade-up">
                <p className="flex justify-center items-center mt-5 mb-10 font-bold text-3xl lg:justify-start lg:ml-28"
                   >
                    Our Iconic Caps
                </p>
            </div>
            <div className="flex justify-center w-full items-center mb-20" data-aos="fade-up">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
                    {productos.map(producto => (
                        <div key={producto.id} className="w-fit">
                            <Product
                                imgSrc={"/img/example-cap-transparent.png"}
                                imgAlt="Cap"
                                model={producto.Modelo}
                                brand={producto.Provedor.NombreEmpresa}
                                category={producto.Categoria}
                                stock={producto.ExistenciasDisponibles}
                                price={producto.Precio}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Shop;