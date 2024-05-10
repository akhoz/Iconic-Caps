import { useState, useEffect } from 'react';
import { useProducts } from "../contexts/ProductsContext.jsx";
import PropTypes from "prop-types";
import axios from 'axios'
import { LiaShoppingBagSolid } from 'react-icons/lia';

function Bag() {
    const URI = 'http://localhost:8000/productos/'

    const { bagItems, addItemToBag, removeItemFromBag } = useProducts();
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

    return (
        <div className="relative">
            <button onClick={toggleBag}>
                <LiaShoppingBagSolid className="h-6 w-6 mt-2 text-black lg:h-10 lg:w-10" />
            </button>
            {isBagOpen && (
                <div className="bg-gray-50 rounded-xl py-4 px-10 absolute top-full right-0 mt-2 z-10">
                    {addedItems.length === 0 && (
                        <p className="text-center text-nowrap w-fit">No items in the bag</p>
                    )}
                    <table id="bag" className={`w-full ${addedItems.length === 0 ? 'hidden' : ''}`}>
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Amount</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {addedItems.length > 0 && addedItems.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-2">
                                    <img src={item.image} alt="Product" className="h-8 w-8" />
                                </td>
                                <td className="px-4 py-2">{item.model}</td>
                                <td className="px-4 py-2">{item.price}</td>
                                <td className="px-4 py-2">{item.amount}</td>
                                <td className="px-4 py-2">
                                    <button onClick={() => handleRemoveClick(item.id)} className="text-red-500">Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

Bag.propTypes = {
    hello: PropTypes.string
};

export default Bag;
