import PropTypes from "prop-types";

function CheckoutProduct(props) {
    return (
        <div className="flex w-10/12 flex-col">
            <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-row w-1/3 md:space-x-5 lg:w-1/2 lg:py-10 lg:space-x-10 xl:py-5 xl:space-x-20">
                    <img src={props.imgSrc} alt={props.imgSrc} className="hidden w-1/4 md:block md:w-1/4 xl:w-1/3"/>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-lg font-bold xl:text-xl">
                            {props.model}
                        </h2>
                        <p className="text-black xl:text-lg">
                            {props.brand}
                        </p>
                        <p className="text-black xl:text-lg">
                            {props.category}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center w-2/3 lg:w-1/2 lg:py-5">
                    <p className="text-black xl:text-lg">
                        {`${'$' + props.price}`}
                    </p>
                    <p className="text-black xl:text-lg">
                        {props.quantity}
                    </p>
                    <p className="text-black xl:text-lg">
                        {`${'$' + props.total}`}
                    </p>
                </div>
            </div>
            <hr className="w-full border-b border-gray-100 xl:mt-10 xl:mb-14"/>
        </div>
    )
}

CheckoutProduct.propTypes = {
    imgSrc: PropTypes.string,
    model: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    total: PropTypes.number
}

export default CheckoutProduct