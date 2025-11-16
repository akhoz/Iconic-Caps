import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { useState } from "react";
import WarningModal from "../components/WarningModal.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { useCookies } from "react-cookie";

function LogIn() {
  const { logIn } = useUser();
  const [cookie, setCookie, removeCookie] = useCookies(['username']);

  const [username, setUsername] = useState('x');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const v = e.target.value;
    setUsername(v === '' ? 'x' : v);
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleCloseModal = () => setShowModal(false);
  const handleRememberMe = () => setRememberMe(!rememberMe);

  const handleLogInClick = async () => {
    try {
      // Enviar credenciales al backend (flujo seguro)
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        {
          Usuario: username,
          Contrasena: password,
        },
        { withCredentials: true }
      );

      const usuario = data.user;

      // Guardar sesión en contexto
      logIn({ Usuario: usuario.Usuario, Admin: usuario.Admin });

      // Remember me
      if (rememberMe) {
        setCookie('username', usuario.Usuario, { path: '/' });
      }

      // Redirección por rol
      if (usuario.Admin) {
        navigate('/Admin');
      } else {
        navigate('/Account');
      }
    } catch (err) {
      const is401 = err?.response?.status === 401;

      setErrorTitle(is401 ? 'Invalid credentials' : 'Login error');
      setErrorMsg(
        is401
          ? 'The username or password is incorrect.'
          : 'There was a problem trying to sign you in. Please try again.'
      );
      setShowModal(true);

      console.error('Login error:', err);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-20 lg:mt-0 lg:h-screen lg:flex-row">
        <div
          className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:w-3/4"
          data-aos="fade-right"
        >
          <img src="/img/iconic-caps-logo.png" alt="iconic-caps-logo" className="w-1/6" />
          <h1 className="text-4xl font-bold">Log In</h1>

          <div className="flex flex-col w-1/3 mt-5">
            <input
              type="text"
              className="border-0 border-b-2 w-full border-black p-1 my-5 focus:ring-0"
              placeholder="Username"
              onChange={handleUsernameChange}
            />

            <input
              type="password"
              className="border-0 border-b-2 w-full border-black p-1 focus:ring-0"
              placeholder="Password"
              onChange={handlePasswordChange}
            />

            <div className="flex flex-row items-center my-5">
              <input
                type="checkbox"
                onChange={handleRememberMe}
                className="border-1 border-black text-black focus:ring-0"
              />
              <p className="text-md text-gray-600 pl-3">Remember Me</p>
            </div>

            <div className="flex items-center justify-center bg-black text-white font-bold p-2 rounded-md mb-5 hover:scale-105 transition-transform">
              <button onClick={handleLogInClick} className="w-full h-full">
                Log In
              </button>
            </div>

            <a
              className="text-md text-gray-600 mb-2 hover:scale-105 transition-transform"
              href="#"
            >
              I forgot my password
            </a>

            <Link
              to="/SignUp"
              className="text-md text-gray-600 hover:scale-105 transition-transform"
            >
              Create an Account
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-col bg-black justify-center items-center w-1/4">
          <img src="/img/slogan.png" alt="slogan" />
        </div>

        <Link
          to="/"
          className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md hover:scale-105 transition-transform"
        >
          <FaArrowLeft />
          <span>Home</span>
        </Link>
      </div>

      {showModal && (
        <>
          <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-y-auto">
            <WarningModal
              warningTitle={errorTitle}
              warningDescription={errorMsg}
              handleCloseModal={handleCloseModal}
            />
          </div>
          <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
        </>
      )}
    </>
  );
}

export default LogIn;
