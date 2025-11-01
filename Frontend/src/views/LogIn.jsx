import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios'
import { useState } from "react";
import WarningModal from "../components/WarningModal.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { useCookies } from "react-cookie";
import bcrypt from 'bcryptjs';

const looksHashed = (v = "") =>
  typeof v === "string" && (/^\$2[aby]\$/.test(v) || /^\$argon2/.test(v));
const API_BASE = "http://localhost:8000";

function LogIn() {
  const { logIn } = useUser();
  const [cookie, setCookie, removeCookie] = useCookies(['username']);

  const [username, setUsername] = useState('x');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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
    const res = await axios.get(`${API_BASE}/clientes/${username}?withPassword=true`);
    const clienteData = res.data;

    if (!clienteData) {
      setErrorTitle('User not found');
      setErrorMsg('The username you entered does not exist.');
      setShowModal(true);
      return;
    }

    const stored = clienteData.Contrasena; 
    if (typeof stored !== 'string' || stored.length === 0) {
      setErrorTitle('Login error');
      setErrorMsg('Could not get password hash from server.');
      setShowModal(true);
      return;
    }

    let ok = false;

    if (looksHashed(stored)) {
      ok = await bcrypt.compare(password, stored);
    } else {
      ok = (password === stored);
      if (ok) {
        try {
          await axios.put(`${API_BASE}/clientes/${username}`, {
            Contrasena: password,
          });
        } catch (e) {
          console.warn('Hot-migrate failed (will try next login):', e);
        }
      }
    }

    if (!ok) {
      setErrorTitle('Your password is incorrect');
      setErrorMsg('Please try again and make sure your password is correct.');
      setShowModal(true);
      return;
    }

    const { Contrasena, ...safeUser } = clienteData;
    logIn(safeUser);

    if (rememberMe) {
      setCookie('username', safeUser.Usuario, { path: '/' });
    }

    if (safeUser.Admin) {
      navigate('/Admin');
    } else {
      navigate('/Account');
    }
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    setErrorTitle('Login error');
    setErrorMsg('An unexpected error happened. Check console.');
    setShowModal(true);
  }
};

  return (
    <>
      <div className="flex flex-col mt-20 lg:mt-0 lg:h-screen lg:flex-row">
        <div className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:w-3/4" data-aos="fade-right">
          <img src="/img/iconic-caps-logo.png" alt="iconic-caps-logo" className="w-1/6" />
          <h1 className="text-4xl font-bold">Log In</h1>
          <div className="flex flex-col w-1/3 mt-5">
            <input
              type="text"
              id="text"
              className="border-0 border-b-2 w-full border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0"
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
              <p className="text-md text-gray-600 pl-3">Remember Me</p>
            </div>

            <div className="flex items-center justify-center bg-black text-white font-bold p-2 rounded-md mb-5 transition-transform transform hover:scale-105">
              <button onClick={handleLogInClick} className="w-full h-full">Log In</button>
            </div>

            <a className="text-md text-gray-600 mb-2 transition-transform transform hover:scale-105" href="#">
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
          <WarningModal warningTitle={errorTitle} warningDescription={errorMsg} handleCloseModal={() => setShowModal(false)} />
        </div>
      )}
      {showModal && <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>}
    </>
  );
}

export default LogIn;
