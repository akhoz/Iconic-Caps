import PropTypes from 'prop-types';
import BagButton from "./BagButton.jsx";

function Product(props) {
    return (
        <div className="flex flex-col">
            <div className="bg-gray-300 rounded-xl mb-2">
            <img
                src={props.imgSrc}
                alt={props.imgAlt}
                className="w-40 h-40 object-cover p-1"/>
            </div>
            <h1 className="font-bold text-xl">
                {props.model}
            </h1>
            <p className="text-gray-600">
                {props.category}
            </p>
            <p className="text-gray-600">
                {`Available stock: ${props.stock}`}
            </p>
            <hr className="border-1 border-gray-300 my-1 w-full"/>
            <p className="font-bold">
                {`$${props.price}`}
            </p>
        </div>
    )
}

Product.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    model: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.number
};

export default Product;