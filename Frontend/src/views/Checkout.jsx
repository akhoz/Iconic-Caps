import CheckoutProduct from "../components/CheckoutProduct.jsx";
import {Link} from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext.jsx";
import axios from 'axios'
import {FaArrowLeft} from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {useEffect, useState} from "react";
import PurchaseModal from "../components/PurchaseModal.jsx";

function Checkout() {
    const URI = 'http://localhost:8000/productos/'
    const { bagItems, addItemToBag, removeItemFromBag, emptyBag } = useProducts();

    const [productos, setProducto] = useState([])
    useEffect( ()=>{
        getProductos()
    },[])

    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }

    const [addedItems, setAddedItems] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        if (bagItems.length === 0) {
            setAddedItems([]);
            return;
        }
    console.log(total)
    const updatedAddedItems = Array.from(bagItems, ([id, amount]) => {
        const product = productos.find(producto => producto.Modelo === id)

        return {
            id,
            image: product ? `/img/caps/${product.Img}` : '',
            model: product ? product.Modelo : '',
            price: product ? product.Precio : 0,
            amount: amount,
        };
    });
        setAddedItems(updatedAddedItems);
        setTotal(updatedAddedItems.reduce((acc, item) => acc + item.price * item.amount, 0));
    }, [bagItems, productos]);

    const [showModal, setShowModal] = useState(false);
    const handlePurchaseClick = () => {
        emptyBag();
        setAddedItems([]);
        setShowModal(true);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center my-24" data-aos="fade-up">
                <h1 className="text-black font-bold text-3xl">
                    Your Bag
                </h1>
                <div className="flex w-10/12 flex-row justify-between items-center mt-20">
                    <p className="text-lg font-bold w-1/3 lg:w-1/2 xl:text-xl">
                        Product
                    </p>
                    <div className="flex flex-row justify-between items-center text-lg font-bold w-2/3 lg:w-1/2 xl:text-xl">
                        <p>
                            Price
                        </p>
                        <p>
                            Quantity
                        </p>
                        <p>
                            Total
                        </p>
                    </div>
                </div>
                <hr className="w-10/12 border-b border-gray-100 xl:mb-8"/>
                {addedItems.map(item => (
                    <CheckoutProduct
                        key={item.id}
                        imgSrc={item.image}
                        model={item.model}
                        price={item.price}
                        quantity={item.amount}
                        total={item.price * item.amount}
                    />
                ))}
                <div className="flex flex-col w-full mt-8 ml-5 md:ml-0 md:mt-14 md:w-10/12  md:flex-row md:justify-between">
                    <div className="flex flex-col justify-start items-start w-full md:w-1/2">
                        <div className="flex flex-row w-full items-center justify-start">
                            <input
                                type="text"
                                id="text"
                                className="w-3/5 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                                placeholder="Cardholer's Name"
                            />
                            <div className="flex flex-row items-center justify-center text-3xl ml-5 space-x-2">
                                <FaCcVisa/>
                                <RiMastercardFill/>
                            </div>
                        </div>
                        <div className="flex flex-row w-full space-x-3">
                            <input
                                type="text"
                                id="text"
                                className="w-1/2 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 md:w-1/2"
                                placeholder="Card Number"
                            />
                            <input
                                type="text"
                                id="text"
                                className="text-center w-1/6 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 md:w-1/4"
                                placeholder="Expire"
                            />
                            <input
                                type="text"
                                id="text"
                                className="text-center w-1/6 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 md:w-1/4"
                                placeholder="CVV"
                            />
                        </div>
                        <div className="flex flex-row w-full space-x-3">
                            <input
                                type="text"
                                id="text"
                                className="w-2/3 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 md:w-3/4"
                                placeholder="Delivery Direction"
                            />
                            <input
                                type="text"
                                id="text"
                                className="text-center w-1/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 md:w-1/4"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-end items-end w-11/12 mt-8 md:justify-start md:mt-0 md:w-1/2">
                        <h1 className="text-3xl font bold">
                            {`Total: $${total}`}
                        </h1>
                        <p className="text-gray-600 text-md">
                            Garanty: 100%
                        </p>
                        <button
                            className="bg-black text-white rounded-lg text-center py-3 px-5 mt-3
                            duration-300 hover:bg-white hover:text-black hover:border hover:border-black"
                            onClick={handlePurchaseClick}>
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            </div>
            <Link to="/Shop"
                  className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105"
                  data-aos="fade-up">
                <FaArrowLeft/>
                <span>Keep Shopping</span>
            </Link>
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <PurchaseModal/>
                </div>

            )}
            {
                showModal && (
                    <div className="fixed inset-0 w-screen h-screen bg-black z-30 opacity-80">
                    </div>
                )}
        </>
    );
}

export default Checkout;