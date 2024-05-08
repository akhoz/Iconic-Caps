import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'
import ProductViewComponent from "../components/ProductViewComponent.jsx";
import axios from 'axios';

function ProductView({productos}) {
    let { modelo } = useParams();
    // console.log(modelo)

    const URI = `http://localhost:8000/comentarios/AD5`
    console.log(URI)

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
    <div>
        <p>
            {comentarios[0].Cliente}
        </p>
        <ProductViewComponent
            imgSrc={"/img/example-cap-transparent.png"}
            imgAlt="Cap"
            model={producto.Modelo}
            brand={producto.Provedor.NombreEmpresa}
            category={producto.Categoria}
            stock={producto.ExistenciasDisponibles}
            price={producto.Precio}/>
    </div>
  );
}

ProductView.propTypes = {
    productos: PropTypes.array
};

export default ProductView;