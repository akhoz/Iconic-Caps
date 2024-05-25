import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";
import {IoClose} from "react-icons/io5";

function AddProvidersModal(props) {
    const URI = 'http://localhost:8000/provedores';
    const [provedores, setProvedores] = useState([]);

    const [identificadorFiscal, setIdentificadorFiscal] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [email, setEmail] = useState('');

    const [invalidIdentificadorFiscal, setInvalidIdentificadorFiscal] = useState(false);
    const [invalidNombreEmpresa, setInvalidNombreEmpresa] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [currentNames, setCurrentNames] = useState([]);
    const [currentIdentificadoresFiscales, setCurrentIdentificadoresFiscales] = useState([]);

    const handleIdentificadorFiscalChange = (e) => {
        setIdentificadorFiscal(e.target.value);
        setInvalidIdentificadorFiscal(false);
    }

    const handleNombreEmpresaChange = (e) => {
        setNombreEmpresa(e.target.value);
        setInvalidNombreEmpresa(false);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
    }

    useEffect(() => {
        getProvedores();
    }, []);

    const getProvedores = async () => {
        try {
            const res = await axios.get(URI);
            console.log(res.data);
            setProvedores(res.data);
            const identificadoresFiscales = res.data.map(provedor => provedor.IdentificadorFiscal);
            const nombres = res.data.map(provedor => provedor.NombreEmpresa);

            setCurrentIdentificadoresFiscales(identificadoresFiscales);
            setCurrentNames(nombres);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddEmployee = async () => {
        if (nombreEmpresa === '') {
            setInvalidNombreEmpresa(true);
            return;
        }
        if (identificadorFiscal === '') {
            setInvalidIdentificadorFiscal(true);
            return;
        }
        if (email === '') {
            setInvalidEmail(true);
            return;
        }

        if (currentIdentificadoresFiscales.includes(identificadorFiscal)) {
            setInvalidIdentificadorFiscal(true);
            return;
        }

        if (currentNames.includes(nombreEmpresa)) {
            setInvalidNombreEmpresa(true);
            return;
        }

        try {
            const res = await axios.post(URI, {
                IdentificadorFiscal: identificadorFiscal,
                NombreEmpresa: nombreEmpresa,
                CorreoElectronico: email
            });
            console.log(res.data);
            props.handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-row relative rounded-lg overflow-hidden w-4/5" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-5 overflow-hidden">
                <h1 className="text-2xl font-bold">
                    Add Provider
                </h1>
                <p className="text-md mt-3 w-1/2 text-center">
                    Fill the following fields to add a new provider
                </p>
                <input
                    type="text"
                    id="name"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow duration-500
                        ${invalidNombreEmpresa ? 'border-b-red-500' : ''}`}
                    placeholder="Company Name"
                    onChange={handleNombreEmpresaChange}
                />
                {invalidNombreEmpresa&& (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid company name
                    </p>
                )}
                <input
                    type="number"
                    id="cedula"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidIdentificadorFiscal ? 'border-b-red-500' : ''}`}
                    placeholder="Fiscal ID"
                    onChange={handleIdentificadorFiscalChange}
                />
                {invalidIdentificadorFiscal&& (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid fiscal ID
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
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidNombreEmpresa || invalidIdentificadorFiscal || invalidEmail ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleAddEmployee}>
                    Add Provider
                </button>
            </div>
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="font-bold text-xl">
                    {nombreEmpresa ? nombreEmpresa : 'Company name' }
                </h1>
                <p className="text-black text-md">
                    {`Fiscal ID: ${identificadorFiscal ? identificadorFiscal : '123456789'}`}
                </p>
                <p className="text-gray-600 text-md">
                    {email ? email : 'email@example.com'}
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

AddProvidersModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default AddProvidersModal;