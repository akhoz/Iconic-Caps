import { useState, useEffect } from 'react';
import { useProducts } from "../contexts/ProductsContext.jsx";
import PropTypes from "prop-types";
import { LiaShoppingBagSolid } from 'react-icons/lia';

function Bag() {
    const { bagItems } = useProducts();

    console.log(bagItems);


    const [isBagOpen, setIsBagOpen] = useState(false);

    const toggleBag = () => {
        setIsBagOpen(prevState => !prevState);
    };

    const [addedItems, setAddedItems] = useState([]);

    useEffect(() => {
        const itemsArray = Array.from(bagItems, ([id, { image, model, price, amount }]) => ({
            id,
            image,
            model,
            price,
            amount
        }));
        setAddedItems(itemsArray);
    }, [bagItems]);


    return (
        <button className="relative">
            <div onClick={toggleBag}>
                <LiaShoppingBagSolid className="h-6 w-6 mt-2 text-black lg:h-10 lg:w-10" />
            </div>
            {isBagOpen && (
                <div className="bg-white py-4 px-10 absolute top-full right-0 mt-2 z-10">
                    <table id="bag" className="w-full">
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
                        {addedItems.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-2"><img src={item.image} alt="Product" className="h-8 w-8" /></td>
                                <td className="px-4 py-2">{item.model}</td>
                                <td className="px-4 py-2">{item.price}</td>
                                <td className="px-4 py-2">{item.amount}</td>
                                <td className="px-4 py-2">
                                    <button onClick={() => console.log('Remove')} className="text-red-500">Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </button>
    );
}

Bag.propTypes = {
    hello: PropTypes.string
};

export default Bag;
