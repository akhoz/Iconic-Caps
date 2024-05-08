import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import ProductViewComponent from "../components/ProductViewComponent.jsx";

function ProductView({productos}) {
    let { modelo } = useParams();
    console.log(modelo)

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