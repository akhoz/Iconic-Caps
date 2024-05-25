import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";

function DeleteProviderModal(props) {
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [provedor, setProvedor] = useState(null);
    const [invalidProvedor, setInvalidProvedor] = useState(false);
    const [URI, setURI] = useState('');

    const handleNombreChange = (event) => {
        setNombreEmpresa(event.target.value);
    };

    useEffect(() => {
        if (nombreEmpresa) {
            setURI(`http://localhost:8000/provedores/${nombreEmpresa}`);
        } else {
            setProvedor(null);
            setInvalidProvedor(false);
        }
    }, [nombreEmpresa]);

    useEffect(() => {
        if (URI) {
            getProvedor();
        }
    }, [URI]);

    useEffect(() => {
        if (!provedor) {
            setInvalidProvedor(true);
        } else {
            setInvalidProvedor(false);
        }
    }, [provedor]);

    const getProvedor = async () => {
        try {
            const res = await axios.get(URI);
            setProvedor(res.data);
        } catch (error) {
            setProvedor(null);
            setInvalidProvedor(true);
        }
    };

    const handleDeleteProvedor = async () => {
        if (!invalidProvedor) {
            await fetch(URI, {
                method: 'DELETE',
            });
            console.log('Provider deleted');
            props.handleCloseModal();
            window.location.reload();
        }
    }

    console.log(provedor)
    console.log(URI)
    console.log(nombreEmpresa, provedor)
    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5 " data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden pl-5">
                <h1 className="text-2xl font-bold">
                    Delete Provider
                </h1>
                <p className="text-lg mt-3 text-center">
                    Write the company name of the provider you want to delete
                </p>
                <input
                    type="text"
                    id="name"
                    className="border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow"
                    placeholder="Company Name"
                    onChange={handleNombreChange}
                />
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidProvedor ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleDeleteProvedor}>
                    Delete Provider
                </button>
            </div>
            {invalidProvedor && (
                <div className="flex flex-row items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-2xl" data-aos="zoom-in">
                            Oops, we couldn't find that provider
                        </h1>
                        <p>
                            Please type a valid company name
                        </p>
                    </div>
                    <div className="w-1/2" data-aos="zoom-in">
                        <FaHandshake className="w-full h-24 text-2xl"/>
                    </div>
                </div>
            )}
            {!invalidProvedor && provedor &&
                <div className="flex flex-row items-center justify-center bg-white w-2/3 py-20 overflow-hidden pr-20 space-x-5">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                            {`${provedor.NombreEmpresa}`}
                        </h1>
                        <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                            {`Fiscal ID: ${provedor.IdentificadorFiscal}`}
                        </p>
                        <p className="text-gray-600 text-md md:text-lg lg:text-lg">
                            {`Provider's email: ${provedor.CorreoElectronico}`}
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

DeleteProviderModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteProviderModal;
