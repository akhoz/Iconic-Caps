import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";
import {GiBilledCap} from "react-icons/gi";
import {IoClose} from "react-icons/io5";

function AddEmployeesModal(props) {
    const URI = 'http://localhost:8000/empleados';
    const [empleados, setEmpleados] = useState([]);

    const [name, setName] = useState('');
    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');
    const [sucursalAsignada, setSucursalAsignada] = useState('');

    const [invalidName, setInvalidName] = useState(false);
    const [invalidCedula, setInvalidCedula] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidSucursal, setInvalidSucursal] = useState(false);

    const [nombre, setNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');

    const [currentNames, setCurrentNames] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setInvalidName(false);
    }

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
        setInvalidCedula(false);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
    }

    const handleSucursalChange = (e) => {
        setSucursalAsignada(e.target.value);
        setInvalidSucursal(false);
    }

    useEffect(() => {
        getEmpleados();
    }, []);

    const getEmpleados = async () => {
        try {
            const res = await axios.get(URI);
            console.log(res.data);
            setEmpleados(res.data);
            const nombres = res.data.map(empleado => empleado.Persona.Nombre);
            const apellidos = res.data.map(empleado => empleado.Persona.PrimerApellido);
            const apellidos2 = res.data.map(empleado => empleado.Persona.SegundoApellido);

            const currentNames = nombres.map((nombre, index) => {
                return `${nombre}${apellidos[index]}${apellidos2[index]}`;
            });
            setCurrentNames(currentNames);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddEmployee = async () => {
        if (name === '' || !name.replace(/\s/g, '').length > 2 || name.split(' ').length - 1 !== 2 ) {
            setInvalidName(true);
            return;
        }
        if (currentNames.includes(name.replace(/\s/g, ''))) {
            setInvalidName(true);
            return;
        }
        setInvalidName(false);
        if (cedula === '' || cedula.length !== 9) {
            setInvalidCedula(true);
            return;
        }
        if (empleados.find(empleado => empleado.Persona.Cedula === cedula)) {
            setInvalidCedula(true);
            return;
        }
        setInvalidCedula(false);
        if (email === '' || !email.includes('@') || !email.includes('.')) {
            setInvalidEmail(true);
            return;
        }
        setInvalidEmail(false);
        if (sucursalAsignada === '') {
            setInvalidSucursal(true);
            return;
        }
        if (empleados.find(empleado => empleado.NumeroSucursalAsignada === sucursalAsignada)) {
            setInvalidSucursal(true);
            return;
        }
        setInvalidSucursal(false);

        const nombre = name.split(' ')[0];
        const primerApellido = name.split(' ')[1];
        const segundoApellido = name.split(' ')[2];

        const res = await axios.post('http://localhost:8000/personas', {
            Cedula: cedula,
            Nombre: nombre,
            PrimerApellido: primerApellido,
            SegundoApellido: segundoApellido,
            Email: email
        });
        console.log(res.data);

        const res2 = await axios.post(URI, {
            CedulaEmpleado: cedula,
            NumeroSucursalAsignada: sucursalAsignada
        });
        console.log(res2.data);
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
                <input
                    type="text"
                    id="name"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow duration-500
                        ${invalidName ? 'border-b-red-500' : ''}`}
                    placeholder="Complete Name"
                    onChange={handleNameChange}
                />
                {invalidName&& (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid employee name
                    </p>
                )}
                <input
                    type="number"
                    id="cedula"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidCedula ? 'border-b-red-500' : ''}`}
                    placeholder="Employee ID"
                    onChange={handleCedulaChange}
                />
                {invalidCedula && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid employee ID
                    </p>
                )}
                <input
                    type="text"
                    id="email"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidEmail? 'border-b-red-500' : ''}`}
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
                {invalidEmail && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid employee email
                    </p>
                )}
                <input
                    type="number"
                    id="sucursal"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidSucursal ? 'border-b-red-500' : ''}`}
                    placeholder="Store Number"
                    onChange={handleSucursalChange}
                />
                {invalidSucursal && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid store number
                    </p>
                )}
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidName || invalidCedula || invalidEmail || invalidSucursal ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleAddEmployee}>
                    Add Employee
                </button>
            </div>
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                    <h1 className="font-bold text-xl">
                        {name ? name : 'Employee Name' }
                    </h1>
                    <p className="text-black text-md">
                        {cedula? cedula : '123456789'}
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

AddEmployeesModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default AddEmployeesModal;