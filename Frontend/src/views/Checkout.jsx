import CheckoutProduct from "../components/CheckoutProduct.jsx";
import {Link} from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext.jsx";
import axios from 'axios'
import {FaArrowLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import PurchaseModal from "../components/PurchaseModal.jsx";
import PaymentForm from "../components/PaymentForm.jsx";

function Checkout() {
    const URI = 'http://localhost:8000/productos/'
    const { bagItems, addItemToBag, removeItemFromBag, emptyBag } = useProducts();
    const [addedItems, setAddedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [garantia, setGarantia] = useState(0)

    const [productos, setProducto] = useState([])
    useEffect( ()=>{
        getProductos()
    },[])

    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }

    useEffect(() => {
        if (total > 100) {
            setGarantia(100);
        } else {
            setGarantia(total);
        }
    },[total]);

    useEffect(() => {
        if (bagItems.length === 0) {
            setAddedItems([]);
            return;
        }

    const updatedAddedItems = Array.from(bagItems, ([id, amount]) => {
        const product = productos.find(producto => producto.Modelo === id)

        return {
            id,
            image: product ? `/img/caps/${product.Img}` : '',
            model: product ? product.Modelo : '',
            brand: product ? product.Provedor.NombreEmpresa : '',
            category: product ? product.Categoria : '',
            price: product ? product.Precio : 0,
            amount: amount,
        };
    });
        setAddedItems(updatedAddedItems);
        setTotal(updatedAddedItems.reduce((acc, item) => acc + item.price * item.amount, 0));
    }, [bagItems, productos]);

    const [showModal, setShowModal] = useState(false);
    const handlePurchaseClick = () => {
        setShowModal(true);
        emptyBag();
        setAddedItems([]);
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
                        brand={item.brand}
                        category={item.category}
                        price={item.price}
                        quantity={item.amount}
                        total={item.price * item.amount}
                    />
                ))}
                <PaymentForm
                total={total}
                warranty={garantia}
                products={addedItems}
                confirmPurchase={handlePurchaseClick}/>
            </div>
            <Link to="/Shop"
                  className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105"
                  data-aos="fade-up">
                <FaArrowLeft/>
                <span>Keep Shopping</span>
            </Link>
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
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