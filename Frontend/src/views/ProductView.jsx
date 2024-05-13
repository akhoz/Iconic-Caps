import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'
import ProductViewComponent from "../components/ProductViewComponent.jsx";
import axios from 'axios';
import Stars from "../components/Stars.jsx";

function ProductView({productos}) {
    let { modelo } = useParams();

    const URI = `http://localhost:8000/comentarios/modelo/${modelo}`

    const [comentarios, setComentarios] = useState([])
    useEffect( ()=>{
        getComentario()
    },[])

    const getComentario = async () => {
        const res = await axios.get(URI)
        setComentarios(res.data)
    }


    const producto = productos.find(producto => producto.Modelo === modelo);

    if (!producto) {
        return <div>No se encontró el producto</div>;
    }

  return (
    <div className="flex flex-col min-h-screen mt-10">
        <ProductViewComponent
            imgSrc={`/img/caps/${producto.Img}`}
            imgAlt={producto.Img}
            model={producto.Modelo}
            brand={producto.Provedor.NombreEmpresa}
            category={producto.Categoria}
            stock={producto.ExistenciasDisponibles}
            price={producto.Precio}/>
        <div className="flex-grow bg-black w-full text-white mt-20 py-20 relative">
            <h1 className="font-bold text-2xl absolute top-8 left-8">
                Comments
            </h1>
            <p className={`${comentarios.length > 0 ? 'hidden' : ''} text-lg ml-8`}>
                This product has no comments yet
            </p>
            <div className="flex w-full justify-center">
                <div className="grid grid-cols-1 gap-x-10 gap-y-20 mx-8 w-full md:grid-cols-2 lg:grid-cols-3">
                    {comentarios.map((comentario) => (
                        <div key={comentario.id}>
                            <div className="flex flex-row justify-between items-center">
                                <h2 className="font-bold text-lg">
                                    {comentario.Cliente.Usuario}
                                </h2>
                                <Stars rating={comentario.Estrellas}/>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <p>
                                    {`${comentario.Fecha} ${comentario.Hora}`}
                                </p>
                            </div>
                            <p className="text-sm mt-3 text-justify">
                                {comentario.Comentario}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

ProductView.propTypes = {
    productos: PropTypes.array
};

export default ProductView;