import { useState, useEffect } from 'react';
import { useProducts } from "../contexts/ProductsContext.jsx";
import PropTypes from "prop-types";
import axios from 'axios'
import { LiaShoppingBagSolid } from 'react-icons/lia';
import {Link} from "react-router-dom";

function Bag() {
    const URI = 'http://localhost:8000/productos/'

    const { bagItems, addItemToBag, removeItemFromBag, emptyBag } = useProducts();
    const [isBagOpen, setIsBagOpen] = useState(false);

    const [productos, setProducto] = useState([])
    useEffect( ()=>{
        getProductos()
    },[])

    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }

    const [addedItems, setAddedItems] = useState([]);

    useEffect(() => {
        if (bagItems.length === 0) {
            setAddedItems([]);
            return;
        }

        const updatedAddedItems = Array.from(bagItems, ([id, amount]) => {
            const product = productos.find(producto => producto.Modelo === id);
            return {
                id,
                image: product ? `/img/caps/${product.Img}` : '',
                model: product ? product.Modelo : '',
                price: product ? product.Precio : 0,
                amount: amount
            };
        });
        setAddedItems(updatedAddedItems);
    }, [bagItems, productos]);

    const toggleBag = () => {
        setIsBagOpen(prevState => !prevState);
    };

    const handleRemoveClick = (id) => {
        removeItemFromBag(id);
        setAddedItems(addedItems.filter(item => item.id !== id));
    }

    const handleEmptyBagClick = () => {
        emptyBag();
        setAddedItems([]);
    }

    const handleCheckoutClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="relative flex items-center justify-center">
            <button onClick={toggleBag}>
                <LiaShoppingBagSolid className="h-6 w-6 mt-2 text-black lg:h-10 lg:w-10 transition-transform transform hover:scale-105 md:hover:scale-110" />
            </button>
            {isBagOpen && (
                <div
                    className="flex flex-col justify-center items-center bg-gray-50 rounded-xl py-4 absolute top-full mt-2 z-20 md:right-0 xl:px-10 ">
                    {addedItems.length === 0 && (
                        <p className="text-center text-nowrap w-fit px-10">No items in the bag</p>
                    )}
                    <table id="bag" className={`w-full ${addedItems.length === 0 ? 'hidden' : ''}`}>
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {addedItems.length > 0 && addedItems.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-2">
                                    <img src={item.image} alt="Product" className="h-8 w-8 lg:h-full lg:w-full"/>
                                </td>
                                <td className="text-center px-4 py-2">{item.model}</td>
                                <td className="text-center px-4 py-2">{`${"$" + item.price}`}</td>
                                <td className="text-center px-4 py-2">{item.amount}</td>
                                <td className="text-center px-4 py-2">
                                    <button onClick={() => handleRemoveClick(item.id)} className="text-red-500">Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {addedItems.length > 0 && (
                        <Link
                            to={"/Checkout"}
                            onClick={handleCheckoutClick}
                            className="bg-black w-11/12 rounded-lg py-2 text-center text-white mt-4 xl:w-full">
                            Go to checkout
                        </Link>
                    )}
                    {addedItems.length > 0 && (
                        <button
                            onClick={handleEmptyBagClick}
                            className="mt-2 underline-offset-1">
                            Empty Bag
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

Bag.propTypes = {
    hello: PropTypes.string
};

export default Bag;
