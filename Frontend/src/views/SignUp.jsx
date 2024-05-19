import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function SignUp () {
    const navigate = useNavigate();

    const [newName, setNewName] = useState("");
    const [newCedula, setNewCedula] = useState(0);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [primerApellido, setPrimerApellido] = useState("");
    const [segundoApellido, setSegundoApellido] = useState("");

    const [currentNames, setCurrentNames] = useState([]);
    const [currentCedulas, setCurrentCedulas] = useState([]);
    const [currentUsernames, setCurrentUsernames] = useState([]);
    const [currentEmails, setCurrentEmails] = useState([]);

    const [invalidName, setInvalidName] = useState(false);
    const [invalidCedula, setInvalidCedula] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [nameAlreadyExists, setNameAlreadyExists] = useState(false);
    const [cedulaAlreadyExists, setCedulaAlreadyExists] = useState(false);

    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const [secondPart, setSecondPart] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
        setInvalidName(false);
        setNameAlreadyExists(false);
    }

    const handleNewCedulaChange = (event) => {
        const cedulaInt = parseInt(event.target.value);
        setNewCedula(cedulaInt);
        setInvalidCedula(false);
        setCedulaAlreadyExists(false);
    }

    const handleNewUsernameChange = (event) => {
        setNewUsername(event.target.value);
        setInvalidUsername(false);
        setUsernameAlreadyExists(false);
    }

    const handleNewEmailChange = (event) => {
        setNewEmail(event.target.value);
        setEmailAlreadyExists(false);
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);

    }

    const handleTermsAccepted = () => {
        setTermsAccepted(!termsAccepted);

    }

    useEffect(() => {
        getExistingUsernames();
    })
    const getExistingUsernames = async () => {
        const res = await axios.get('http://localhost:8000/clientes');
        const clientes = res.data;
        const nombres = clientes.map(cliente => cliente.Persona.Nombre);
        const primerApellido = clientes.map(cliente => cliente.Persona.PrimerApellido);
        const segundoApellido = clientes.map(cliente => cliente.Persona.SegundoApellido);
        const cedulas = clientes.map(cliente => cliente.Persona.Cedula);
        const usernames = clientes.map(cliente => cliente.Usuario);
        const emails = clientes.map(cliente => cliente.Persona.Email);

        const names = nombres.map((nombre, index) => {
            return `${nombre}${primerApellido[index]}${segundoApellido[index]}`;
        })
        setCurrentNames(names);
        setCurrentCedulas(cedulas);
        setCurrentUsernames(usernames);
        setCurrentEmails(emails);
    }

    const handleContinue = () => {
        if (newName === "" || !newName.replace(/\s/g, '').length > 2 || newName.split(' ').length - 1 !== 2 ) {
            setInvalidName(true);
            return;
        }
        setNombre(newName.split(' ')[0]);
        setPrimerApellido(newName.split(' ')[1]);
        setSegundoApellido(newName.split(' ')[2]);
        setInvalidName(false);
        if (currentNames.includes(newName.replace(/\s/g, ''))) {
            setNameAlreadyExists(true);
            return;
        }
        setNameAlreadyExists(false);
        if (newCedula === 0 || newCedula.toString().length !== 9) {
            setInvalidCedula(true);
            return;
        }
        setInvalidCedula(false);
        if (currentCedulas.includes(newCedula)) {
            setCedulaAlreadyExists(true);
            return;
        }
        setCedulaAlreadyExists(false);

        setSecondPart(true);
    }

    const handleGoBack = () => {
        setSecondPart(false);
    }

    const handleSignUp = async () => {

        if (newUsername === "") {
            setInvalidUsername(true);
            return;
        }
        setInvalidUsername(false);
        if (currentUsernames.includes(newUsername)) {
            setUsernameAlreadyExists(true);
            return;
        }
        setUsernameAlreadyExists(false);
        if (newEmail === "" || !newEmail.includes('@') || !newEmail.includes('.')) {
            setInvalidEmail(true);
            return;
        }
        setInvalidEmail(false);
        if (currentEmails.includes(newEmail)) {
            setEmailAlreadyExists(true);
            return;
        }
        setEmailAlreadyExists(false);
        if (newPassword === "") {
            setInvalidPassword(true);
            return;
        }
        setInvalidPassword(false);
        if (!termsAccepted) {
            return;
        }

        console.log(newCedula, nombre, primerApellido, segundoApellido, newEmail, newUsername, newPassword );
        const res = await axios.post('http://localhost:8000/personas', {
            Cedula: newCedula,
            Nombre: nombre,
            PrimerApellido: primerApellido,
            SegundoApellido: segundoApellido,
            Email: newEmail
        });
        console.log(res.data);
        navigate('/LogIn')
    }

    return (
        <div className="flex flex-col mt-20 lg:mt-0 lg:h-screen lg:flex-row">
            <div className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:w-3/4" data-aos="fade-right">
                <img
                    src="/img/iconic-caps-logo.png"
                    alt="iconic-caps-logo"
                    className="w-1/6"/>
                <h1 className="text-4xl font-bold">Sign Up</h1>
                <div className={`${secondPart ? 'hidden' : 'flex flex-col w-1/3 mt-5'}`}>
                    <input
                        type="text"
                        id="text"
                        className={`border-0 border-b-2 p-1 mt-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                        ${invalidName || nameAlreadyExists ? 'border-red-500' : 'border-black'}`}
                        placeholder="Complete Name"
                        onChange={handleNewNameChange}
                    />
                    {invalidName &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a
                            valid name</p>}
                    {nameAlreadyExists &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">There already is an account with this name</p>}
                    <input
                        type="number"
                        id="number"
                        className={`remove-arrow border-0 border-b-2 p-1 mt-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                        ${invalidCedula || cedulaAlreadyExists ? 'border-red-500' : 'border-black'}`}
                        placeholder="ID Number"
                        onChange={handleNewCedulaChange}
                    />
                    {invalidCedula &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a
                            valid ID Number</p>}
                    {cedulaAlreadyExists &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">There already is an account with this ID Number</p>}
                    <button
                        className="bg-black text-white font-bold p-2 mt-8 rounded-md mb-5 transition-transform transform hover:scale-105"
                        onClick={handleContinue}>
                        Continue
                    </button>
                </div>


                <div className={`${secondPart ? 'flex flex-col w-1/3 mt-5' : 'hidden'}`}>
                    <input
                        type="text"
                        id="text"
                        className={`border-0 border-b-2 p-1 mt-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                        ${invalidUsername || usernameAlreadyExists ? 'border-red-500' : 'border-black'}`}
                        placeholder="Username"
                        onChange={handleNewUsernameChange}
                    />
                    {invalidUsername &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a
                            valid username</p>}
                    {usernameAlreadyExists &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">This username is
                            already taken</p>}
                    <input
                        type="email"
                        id="email"
                        className={`border-0 border-b-2 p-1 mt-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                        ${invalidEmail || emailAlreadyExists ? 'border-red-500' : 'border-black'}`}
                        placeholder="Email"
                        onChange={handleNewEmailChange}
                    />
                    {invalidEmail &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a
                            valid email</p>}
                    {emailAlreadyExists &&
                        <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">This email is
                            already taken</p>}
                    <input
                        type="password"
                        id="password"
                        className={`border-0 border-b-2 p-1 mt-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                        ${invalidPassword ? 'border-red-500' : 'border-black'}`}
                        placeholder="Password"
                        onChange={handleNewPasswordChange}
                    />
                    {invalidPassword && <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a valid password</p>}
                    <div className={`flex flex-row items-center my-5 ${!termsAccepted ? 'text-red-500' : ''}`}>
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="border-1 border-black text-black focus:ring-0"
                            onChange={handleTermsAccepted}
                        />
                        <p className="text-md text-gray-600 pl-3">
                            I accept the Terms and Conditions
                        </p>
                    </div>
                    <button
                        className="bg-black text-white font-bold p-2 rounded-md mb-5 transition-transform transform hover:scale-105"
                        onClick={handleSignUp}>
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="hidden lg:flex flex-col bg-black justify-center items-center w-1/4">
                <img src="/img/slogan.png" alt="slogan"/>
            </div>
            {!secondPart &&
            <Link to="/"
                  className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105">
                <FaArrowLeft/>
                <span>Home</span>
            </Link>
            }
            {secondPart &&
            <button
                onClick={handleGoBack}
                className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105">
                <FaArrowLeft/>
                <span>Go Back</span>
            </button>
            }
        </div>
    )
}

export default SignUp;