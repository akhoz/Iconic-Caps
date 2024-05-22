import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiBilledCap } from "react-icons/gi";

function DeleteStoreModal(props) {
    const [numeroSucursal, setNumeroSucursal] = useState('');
    const [sucursal, setSucursal] = useState(null);
    const [invalidSucursal, setInvalidSucursal] = useState(false);
    const [URI, setURI] = useState('');

    const handleModelChange = (event) => {
        setNumeroSucursal(event.target.value);
    };

    useEffect(() => {
        if (numeroSucursal) {
            setURI(`http://localhost:8000/sucursales/${numeroSucursal}`);
        } else {
            setSucursal(null);
            setInvalidSucursal(false);
        }
    }, [numeroSucursal]);

    useEffect(() => {
        if (URI) {
            getSucursal();
        }
    }, [URI]);

    useEffect(() => {
        if (sucursal === null || sucursal.length === 0) {
            setInvalidSucursal(true);
        } else {
            setInvalidSucursal(false);
        }
    }, [sucursal]);

    const getSucursal = async () => {
        try {
            const res = await axios.get(URI);
            setSucursal(res.data[0]);
        } catch (error) {
            setSucursal(null);
            setInvalidSucursal(true);
        }
    };

    const handleDeleteSucursal = async () => {
        if (!invalidSucursal) {
            await fetch(URI, {
                method: 'DELETE',
            });
            console.log('Product deleted');
            props.handleCloseModal();
        }
    }

    console.log(sucursal)
    console.log(URI)
    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5 " data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Delete Store
                </h1>
                <p className="text-lg mt-3">
                    Write the store number below
                </p>
                <input
                    type="number"
                    id="number"
                    className="border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow"
                    placeholder="Store Number"
                    onChange={handleModelChange}
                />
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidSucursal ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleDeleteSucursal}>
                    Delete Store
                </button>
            </div>
            {invalidSucursal && (
                <div className="flex flex-row items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-2xl" data-aos="zoom-in">
                            Oops, we couldn't find that product
                        </h1>
                        <p>
                            Please type a valid product model
                        </p>
                    </div>
                    <div className="w-1/2" data-aos="zoom-in">
                        <GiBilledCap className="w-full h-24 text-2xl"/>
                    </div>
                </div>
            )}
            {!invalidSucursal && sucursal &&
                <div className="flex flex-row items-center justify-center bg-white w-2/3 py-20 overflow-hidden pr-20 space-x-5">
                    <img
                        src={`img/stores/${sucursal.Img}`}
                        alt={`img/stores/${sucursal.Img}`}
                        className="w-40 h-40 object-cover p-1 md:w-60 md:h-60 rounded-lg"
                        data-aos="zoom-in"/>
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                            {`${sucursal.Nombre}`}
                        </h1>
                        <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                            {`Store number: ${sucursal.NumeroSucursal}`}
                        </p>
                        <p className="text-gray-600 text-md md:text-lg lg:text-lg">
                            {`Store phone: ${sucursal.NumeroTelefono}`}
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

DeleteStoreModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteStoreModal;
