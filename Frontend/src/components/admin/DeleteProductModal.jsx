import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiBilledCap } from "react-icons/gi";

function DeleteProductModal(props) {
    const [modelo, setModelo] = useState('');
    const [producto, setProducto] = useState(null);
    const [invalidProduct, setInvalidProduct] = useState(false);
    const [URI, setURI] = useState('');

    const handleModelChange = (event) => {
        setModelo(event.target.value);
    };

    useEffect(() => {
        if (modelo) {
            setURI(`http://localhost:8000/productos/${modelo}`);
        } else {
            setProducto(null);
            setInvalidProduct(false);
        }
    }, [modelo]);

    useEffect(() => {
        if (URI) {
            getProductos();
        }
    }, [URI]);

    useEffect(() => {
        if (producto === null || producto.length === 0) {
            setInvalidProduct(true);
        } else {
            setInvalidProduct(false);
        }
    }, [producto]);

    const getProductos = async () => {
        try {
            const res = await axios.get(URI);
            setProducto(res.data);
        } catch (error) {
            setProducto(null);
            setInvalidProduct(true);
        }
    };

    return (
        <div className="flex flex-row relative w-1/2 rounded-md" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Delete Product
                </h1>
                <p className="text-lg mt-3">
                    Write the product model below
                </p>
                <input
                    type="text"
                    id="model"
                    className="border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0"
                    placeholder="Product Model"
                    onChange={handleModelChange}
                />
                <div
                    className="flex items-center justify-center mt-10 bg-black text-white p-2 rounded-md mb-5 duration-500 w-1/3">
                    <button className="w-full h-full">
                        Delete Product
                    </button>
                </div>
            </div>
            {invalidProduct && (
                <div className="flex flex-row items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-2xl">
                            Oops, we couldn't find that product
                        </h1>
                        <p>
                            Please type a valid product model
                        </p>
                    </div>
                    <div className="w-1/2">
                        <GiBilledCap className="w-full h-24 text-2xl"/>
                    </div>
                </div>
            )}
            {!invalidProduct && producto &&
                <div className="flex flex-row items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <img
                        src={`img/caps/${producto.Img}`}
                        alt={`img/caps/${producto.Img}`}
                        className="w-40 h-40 object-cover p-1 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96"/>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                            {producto.Modelo}
                        </h1>
                        <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                            {producto.Categoria}
                        </p>
                        <hr className="border-1 border-gray-300 my-1 w-full"/>
                        <p className="font-bold text-md md:text-lg mb-2 lg:text-xl">
                            {`$${producto.Precio}`}
                        </p>
                    </div>
                </div>
            }
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

DeleteProductModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteProductModal;
