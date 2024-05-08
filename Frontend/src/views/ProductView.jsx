import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'
import ProductViewComponent from "../components/ProductViewComponent.jsx";

function ProductView({productos}) {
    let { modelo } = useParams();
    console.log(modelo)

    const URI = `http://localhost:8000/comentarios/${modelo}`

    const [comentarios, setComentarios] = useState([])
    useEffect( ()=>{
        getComentarios()
    },[])

    const getComentarios = async () => {
        const res = await axios.get(URI)
        setComentarios(res.data)
    }

    const producto = productos.find(producto => producto.Modelo === modelo);

    if (!producto) {
        return <div>No se encontró el producto</div>;
    }

  return (
    <div>
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