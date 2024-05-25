import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";
import {IoClose, IoSearchOutline} from "react-icons/io5";

function ModifyProvidersModal(props) {
    const URI = 'http://localhost:8000/provedores';
    const [provedores, setProvedores] = useState([]);

    const [identificadorFiscal, setIdentificadorFiscal] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [email, setEmail] = useState('');

    const [invalidNombreEmpresa, setInvalidNombreEmpresa] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [currentNames, setCurrentNames] = useState([]);


    const handleIdentificadorFiscalChange = (e) => {
        setIdentificadorFiscal(e.target.value);
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
        if (provedores) {
            try {
                const provedor = provedores.find(provedor => provedor.IdentificadorFiscal === parseInt(identificadorFiscal));
                console.log(provedor)
                if (provedor) {
                    setNombreEmpresa(provedor.NombreEmpresa);
                    setEmail(provedor.CorreoElectronico);
                    console.log(provedor)

                } else {
                    setNombreEmpresa('');
                    setEmail('');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [identificadorFiscal]);

    useEffect(() => {
        getProvedores();
    }, []);

    const getProvedores = async () => {
        try {
            const res = await axios.get(URI + `/${nombreEmpresa}`);
            console.log(res.data);
            setProvedores(res.data);
            setCurrentNames(res.data.map(provedor => provedor.NombreEmpresa));
        } catch (error) {
            console.log(error);
        }
    }

    const handleModifyProvider = async () => {
        console.log(nombreEmpresa, email, identificadorFiscal)
        if (nombreEmpresa === '') {
            setInvalidNombreEmpresa(true);
            return;
        }
        setInvalidNombreEmpresa(false);

        if (email === '') {
            setInvalidEmail(true);
            return;
        }

        try {
            const res = await axios.put(URI + `/${identificadorFiscal}`, {
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
                    Modify Provider
                </h1>
                <p className="text-md mt-3 w-1/2 text-center">
                    Fill the following fields to modify a provider
                </p>
                <div className="relative w-1/2 mt-8">
                    <IoSearchOutline className="absolute left-2 top-2.5 text-gray-400"/>
                    <input
                        type="number"
                        id="cedula"
                        className={`border border-1 border-gray-300 focus:ring-0 focus:outline-0 w-full pl-8 remove-arrow duration-500 rounded-xl py-1 remove-arrow`}
                        placeholder="Fiscal ID"
                        onChange={handleIdentificadorFiscalChange}
                    />
                </div>
                <input
                    type="text"
                    id="name"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow duration-500
                        ${invalidNombreEmpresa ? 'border-b-red-500' : ''}`}
                    placeholder="Company Name"
                    onChange={handleNombreEmpresaChange}
                    value={nombreEmpresa}
                />
                {invalidNombreEmpresa && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid company name
                    </p>
                )}
                <input
                    type="text"
                    id="email"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 w-1/2 remove-arrow
                        ${invalidEmail ? 'border-b-red-500' : ''}`}
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                {invalidEmail && (
                    <p className="text-red-500 text-sm text-start" data-aos="fade-down">
                        Invalid company email
                    </p>
                )}
                <button className={`mt-8 rounded-lg w-1/2 py-3 duration-500 bg-black text-white
                    ${invalidNombreEmpresa || invalidEmail ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                        onClick={handleModifyProvider}>
                    Modify Provider
                </button>
            </div>
            <div className="flex flex-col items-center justify-center bg-white w-1/2 py-20 overflow-hidden">
                <h1 className="font-bold text-xl">
                    {nombreEmpresa ? nombreEmpresa : 'Company name'}
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

ModifyProvidersModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModifyProvidersModal;