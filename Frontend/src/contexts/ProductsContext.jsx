import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
    const [bagItems, setBagItems] = useState(new Map());

    const addItemToBag = (product) => {
        if (bagItems.has(product)) {
            const newAmount = bagItems.get(product) + 1;
            setBagItems(new Map(bagItems.set(product, newAmount)));

        } else {
            setBagItems(new Map(bagItems.set(product, 1)));
        }
    }

    const removeItemFromBag = (product) => {
        if (bagItems.has(product)) {
            const newAmount = bagItems.get(product) - 1;
            if (newAmount === 0) {
                bagItems.delete(product);
            } else {
                setBagItems(new Map(bagItems.set(product, newAmount)));
            }
        }
    }

    const emptyBag = () => {
        setBagItems(new Map());
    }

    return (
        <ProductsContext.Provider value={{ bagItems, addItemToBag, removeItemFromBag, emptyBag }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
