import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios'
import { useState } from "react";
import WarningModal from "../components/WarningModal.jsx";
import {useUser} from "../contexts/UserContext.jsx";
import {useCookies} from "react-cookie";

function LogIn() {
    const { logIn } = useUser();
    const [cookie, setCookie, removeCookie] = useCookies(['username']);

    const [username, setUsername] = useState('x');
    const [cliente, setCliente] = useState(null);
    const [password, setPassword] = useState('');
    const [access, setAccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);

        if (e.target.value === '') {
            setUsername('x');
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const handleLogInClick = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/clientes/${username}`);
            const clienteData = res.data;
            if (clienteData) {
                setCliente(clienteData);
                if (clienteData.Contrasena === password) {
                    console.log('Acceso concedido');
                    logIn(clienteData);
                    if (rememberMe) {
                        setCookie('username', username, { path: '/' });
                        console.log(`Cookie set: ${cookie.username}`);
                    }
                    navigate('/Account');
                } else {
                    console.log('Contraseña incorrecta');
                    setAccess(false);
                    setErrorTitle('Your password is incorrect');
                    setErrorMsg('Please try again and make sure your password is correct.');
                    setShowModal(true);
                }
            } else {
                console.log('No existe el usuario');
                setAccess(false);
                setErrorTitle('User not found');
                setErrorMsg('The username you entered does not exist. Please try again or create an account.');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
        }
    }

    return (
        <>
            <div className="flex flex-col mt-20 lg:mt-0 lg:h-screen lg:flex-row">
                <div className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:w-3/4" data-aos="fade-right">
                    <img
                        src="/img/iconic-caps-logo.png"
                        alt="iconic-caps-logo"
                        className="w-1/6" />
                    <h1 className="text-4xl font-bold">Log In</h1>
                    <div className="flex flex-col w-1/3 mt-5">
                        <input
                            type="text"
                            id="text"
                            className="border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0"
                            placeholder="Username"
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="password"
                            id="password"
                            className="border-0 border-b-2 border-black p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                        <div className="flex flex-row items-center my-5">
                            <input
                                type="checkbox"
                                id="checkbox"
                                onChange={handleRememberMe}
                                className="border-1 border-black text-black focus:ring-0 focus:outline-0 checkbox-black"
                            />
                            <p className="text-md text-gray-600 pl-3">
                                Remember Me
                            </p>
                        </div>
                        <div
                              className="flex items-center justify-center bg-black text-white font-bold p-2 rounded-md mb-5 transition-transform transform hover:scale-105">
                            <button onClick={handleLogInClick} className="w-full h-full">
                                Log In
                            </button>
                        </div>
                        <a
                            className="text-md text-gray-600 mb-2 transition-transform transform hover:scale-105"
                            href="#">
                            I forgot my password
                        </a>
                        <Link to="/SignUp" className="text-md text-gray-600 transition-transform transform hover:scale-105">
                            Create an Account
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col bg-black justify-center items-center w-1/4">
                    <img src="/img/slogan.png" alt="slogan" />
                </div>
                <Link to="/" className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105" data-aos="fade-right">
                    <FaArrowLeft />
                    <span>Home</span>
                </Link>
            </div>
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <WarningModal
                        warningTitle={errorTitle}
                        warningDescription={errorMsg}
                        handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
        </>
    )
}

export default LogIn;