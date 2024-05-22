import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";

function DeleteEmployeeModal(props) {
    const [cedulaEmpleado, setCedulaEmpleado] = useState(0);
    const [empleado, setEmpleado] = useState(null);
    const [invalidEmpleado, setInvalidEmpleado] = useState(false);
    const [URI, setURI] = useState('');

    const handleModelChange = (event) => {
        setCedulaEmpleado(event.target.value);
    };

    useEffect(() => {
        if (cedulaEmpleado) {
            setURI(`http://localhost:8000/empleados/${cedulaEmpleado}`);
        } else {
            setEmpleado(null);
            setInvalidEmpleado(false);
        }
    }, [cedulaEmpleado]);

    useEffect(() => {
        if (URI) {
            getEmpleado();
        }
    }, [URI]);

    useEffect(() => {
        if (!empleado) {
            setInvalidEmpleado(true);
        } else {
            setInvalidEmpleado(false);
        }
    }, [empleado]);

    const getEmpleado = async () => {
        try {
            const res = await axios.get(URI);
            setEmpleado(res.data);
        } catch (error) {
            setEmpleado(null);
            setInvalidEmpleado(true);
        }
    };

    const handleDeleteEmpleado = async () => {
        if (!invalidEmpleado) {
            await fetch(URI, {
                method: 'DELETE',
            });
            console.log('Store deleted');
            props.handleCloseModal();
            window.location.reload();
        }
    }

    console.log(empleado)
    console.log(URI);
    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5 " data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Delete Employee
                </h1>
                <p className="text-lg mt-3">
                    Write the Employee's ID below
                </p>
                <input
                    type="number"
                    id="number"
                    className="border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow"
                    placeholder="Store Number"
                    onChange={handleModelChange}
                />
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidEmpleado ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleDeleteEmpleado}>
                    Delete Employee
                </button>
            </div>
            {invalidEmpleado && (
                <div className="flex flex-row items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-2xl" data-aos="zoom-in">
                            Oops, we couldn't find that employee
                        </h1>
                        <p>
                            Please type a valid employee ID
                        </p>
                    </div>
                    <div className="w-1/2" data-aos="zoom-in">
                        <IoPerson className="w-full h-24 text-2xl"/>
                    </div>
                </div>
            )}
            {!invalidEmpleado && empleado &&
                <div className="flex flex-row items-center justify-center bg-white w-2/3 py-20 overflow-hidden pr-20 space-x-5">
                    <div className="flex flex-col" data-aos="zoom-in">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                            {`${empleado.Persona.Nombre + ' ' + empleado.Persona.PrimerApellido + ' ' + empleado.Persona.SegundoApellido}`}
                        </h1>
                        <p className="text-gray-600 text-md md:text-lg lg:text-xl">
                            {`Store assigned: ${empleado.SucursalAsignada ? empleado.SucursalAsignada.Nombre : 'No store assigned'}`}
                        </p>
                        <p className="text-gray-600 text-md md:text-lg lg:text-lg">
                            {`${empleado.Persona.Nombre}'s email: ${empleado.Persona.Email}`}
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

DeleteEmployeeModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteEmployeeModal;
