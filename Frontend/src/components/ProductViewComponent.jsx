import PropTypes from 'prop-types';
import {useState, useEffect} from "react";
import BagButton from "./BagButton.jsx";
import { useProducts } from "../contexts/ProductsContext.jsx";
import OutStockModal from "./OutStockModal.jsx";

function ProductViewComponent(props) {
    const { bagItems, addItemToBag } = useProducts();
    const [showModal, setShowModal] = useState(false);
    const [buyingAmount, setBuyingAmount] = useState(0);

    const handleBagButtonClick = () => {
        addItemToBag(props.model);
        console.log(`Added ${props.model} to bag`);
    }

    const [availableStock, setAvailableStock] = useState(true);

    const findById = (array, id) => {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }

    useEffect(() => {
        const addedItems = Array.from(bagItems, ([id, amount]) => {
            return {
                id,
                amount
            };
        });

        if (findById(addedItems, props.model) !== null) {
            const product = findById(addedItems, props.model);
            console.log(product.amount, props.stock)
            setBuyingAmount(product.amount);
            if (product.amount >= props.stock) {
                setAvailableStock(false);
                console.log('Out of stock')
            } else {
                setAvailableStock(true);
            }
        }
    }, [bagItems]);


    const outOfStock = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
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
                    <div className="w-full" onClick={availableStock ? handleBagButtonClick : outOfStock}>
                        <BagButton outStock={availableStock}/>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <OutStockModal model={props.model} amount={buyingAmount} onCloseModal={handleCloseModal}/>
                </div>

            )}
            {showModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
        </>
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