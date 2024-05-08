import PropTypes from 'prop-types';

function Product(props) {
    return (
        <div className="flex flex-col transition-transform transform hover:scale-105">
            <div className="bg-gray-100 mb-2 p-5">
                <img
                    src={props.imgSrc}
                    alt={props.imgAlt}
                    className="w-40 h-40 object-cover p-1 md:w-60 md:h-60 lg:w-80 lg:h-80"/>
            </div>
            <h1 className="font-bold text-xl lg:text-2xl">
                {props.model}
            </h1>
            <p className="text-black lg:text-lg">
                {props.brand}
            </p>
            <p className="text-gray-600 lg:text-lg">
                {props.category}
            </p>
            <p className="text-gray-600 lg:text-lg">
                {`Available stock: ${props.stock}`}
            </p>
            <hr className="border-1 border-gray-300 my-1 w-full"/>
            <p className="font-bold lg:text-lg">
                {`$${props.price}`}
            </p>
        </div>
    )
}

Product.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    model: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.number
};

export default Product;