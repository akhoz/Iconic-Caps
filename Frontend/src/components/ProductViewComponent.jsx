import PropTypes from 'prop-types';
import BagButton from "./BagButton.jsx";

function ProductViewComponent(props) {
    return (
        <div className="flex flex-row justify-center items-center space-x-8">
            <img
                src={props.imgSrc}
                alt={props.imgAlt}
                className="w-40 h-40 object-cover p-1 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96"/>
            <div className="flex flex-col">
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                    {props.model}
                </h1>
                <p className="text-black text-md md:text-lg lg:text-xl">
                    {props.brand}
                </p>
                <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                    {props.category}
                </p>
                <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                    {`Available stock: ${props.stock}`}
                </p>
                <hr className="border-1 border-gray-300 my-1 w-full"/>
                <p className="font-bold text-md md:text-lg mb-2 lg:text-xl">
                    {`$${props.price}`}
                </p>
                <BagButton/>
            </div>
        </div>
    );
}

ProductViewComponent.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    model: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.number
};

export default ProductViewComponent;