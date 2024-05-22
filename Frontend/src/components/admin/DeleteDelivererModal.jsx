import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";

function DeleteDelivererModal(props) {
    const [cedulaRepartidor, setCedulaRepartidor] = useState(0);
    const [repartidor, setRepartidor] = useState(null);
    const [invalidRepartidor, setInvalidRepartidor] = useState(false);
    const [URI, setURI] = useState('');

    const handleModelChange = (event) => {
        setCedulaRepartidor(event.target.value);
    };

    useEffect(() => {
        if (cedulaRepartidor) {
            setURI(`http://localhost:8000/repartidores/${cedulaRepartidor}`);
        } else {
            setRepartidor(null);
            setInvalidRepartidor(false);
        }
    }, [cedulaRepartidor]);

    useEffect(() => {
        if (URI) {
            getRepartidor();
        }
    }, [URI]);

    useEffect(() => {
        if (!repartidor) {
            setInvalidRepartidor(true);
        } else {
            setInvalidRepartidor(false);
        }
    }, [repartidor]);

    const getRepartidor = async () => {
        try {
            const res = await axios.get(URI);
            setRepartidor(res.data);
        } catch (error) {
            setRepartidor(null);
            setInvalidRepartidor(true);
        }
    };

    const handleDeleteRepartidor = async () => {
        if (!invalidRepartidor) {
            await fetch(URI, {
                method: 'DELETE',
            });
            console.log('Store deleted');
            props.handleCloseModal();
            window.location.reload();
        }
    }

    console.log(repartidor)
    console.log(URI);
    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5 " data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Delete Deliverer
                </h1>
                <p className="text-lg mt-3">
                    Write the Deliverer's ID below
                </p>
                <input
                    type="number"
                    id="number"
                    className="border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow"
                    placeholder="Deliverer's ID"
                    onChange={handleModelChange}
                />
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidRepartidor ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleDeleteRepartidor}>
                    Delete Deliverer
                </button>
            </div>
            {invalidRepartidor && (
                <div className="flex flex-row items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-2xl" data-aos="zoom-in">
                            Oops, we couldn't find that deliverer
                        </h1>
                        <p>
                            Please type a valid deliverer ID
                        </p>
                    </div>
                    <div className="w-1/2" data-aos="zoom-in">
                        <FaShippingFast className="w-full h-24 text-2xl"/>
                    </div>
                </div>
            )}
            {!invalidRepartidor && repartidor &&
                <div className="flex flex-row items-center justify-center bg-white w-2/3 py-20 overflow-hidden pr-20 space-x-5">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                            {`${repartidor.Persona.Nombre + ' ' + repartidor.Persona.PrimerApellido + ' ' + repartidor.Persona.SegundoApellido}`}
                        </h1>
                        <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                            {`Store assigned: ${repartidor.NumeroSucursalAsignada ? repartidor.NumeroSucursalAsignada.Nombre : 'No store assigned'}`}
                        </p>
                        <p className="text-gray-600 text-md md:text-lg lg:text-lg">
                            {`${repartidor.Persona.Nombre}'s email: ${repartidor.Persona.Email}`}
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

DeleteDelivererModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteDelivererModal;
