import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";
import {IoClose, IoSearchOutline} from "react-icons/io5";

function ModifyEmployeesModal(props) {
    const URI = 'http://localhost:8000/empleados';

    const [name, setName] = useState('');
    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');
    const [sucursalAsignada, setSucursalAsignada] = useState('');

    const [invalidSucursal, setInvalidSucursal] = useState(false);

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    }

    const handleSucursalChange = (e) => {
        setSucursalAsignada(e.target.value);
        setInvalidSucursal(false);
    }

    useEffect(() => {
        getEmpleados();
    }, [cedula]);

    const getEmpleados = async () => {
        try {
            const res = await axios.get(URI + `/${cedula}`);
            if (!res.data) {
                setName('');
                setEmail('');
                setSucursalAsignada('');
                return;
            }
            setName(res.data.Persona.Nombre + ' ' + res.data.Persona.PrimerApellido + ' ' + res.data.Persona.SegundoApellido);
            setEmail(res.data.Persona.Email);
            setSucursalAsignada(res.data.NumeroSucursalAsignada);
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleModifyEmployee = async () => {
        if (sucursalAsignada === '') {
            setInvalidSucursal(true);
            return;
        }
        setInvalidSucursal(false);

        const res = await axios.put(URI + `/${cedula}`, {
            NumeroSucursalAsignada: sucursalAsignada
        });
        console.log(res.data);
        props.handleCloseModal();
    }

    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-5 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Add Employee
                </h1>
                <p className="text-md mt-3 w-1/2 text-center">
                    Fill the following fields to add a new employee
                </p>
                <div className="relative w-1/2 mt-8">
                    <IoSearchOutline className="absolute left-2 top-2.5 text-gray-400"/>
                    <input
                        type="number"
                        id="cedula"
                        className={`border border-1 border-gray-300 focus:ring-0 focus:outline-0 w-full pl-8 remove-arrow duration-500 rounded-xl py-1 remove-arrow`}
                        placeholder="Employee ID"
                        onChange={handleCedulaChange}
                    />
                </div>
                <input
                    type="number"
                    id="sucursal"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidSucursal ? 'border-b-red-500' : ''}`}
                    placeholder="Store Number"
                    onChange={handleSucursalChange}
                    value={sucursalAsignada}
                />
                {invalidSucursal && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid store number
                    </p>
                )}
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidSucursal || !cedula ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleModifyEmployee}>
                    Modify Employee
                </button>
            </div>
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="font-bold text-xl">
                    {name ? name : 'Employee Name'}
                </h1>
                <p className="text-black text-md">
                    {cedula ? cedula : '123456789'}
                </p>
                <p className="text-gray-600 text-md">
                    {email ? email : 'email@example.com'}
                </p>
                <p className="text-gray-600 text-md">
                    {`Store Number: ${sucursalAsignada ? sucursalAsignada : 'X'}`}
                </p>
            </div>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

ModifyEmployeesModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModifyEmployeesModal;