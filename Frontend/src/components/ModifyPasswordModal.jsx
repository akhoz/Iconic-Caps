import PropTypes from "prop-types";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUser} from "../contexts/UserContext.jsx";

import {IoClose} from "react-icons/io5";
import {FaEyeSlash} from "react-icons/fa";
import {FaEye} from "react-icons/fa";


function ModifyPasswordModal(props) {
    const navigate = useNavigate();
    const { user, logOut } = useUser();
    const [cookie, setCookie, removeCookie] = useCookies(['username']);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleNewUserPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setInvalidPassword(false);
        setPasswordsDontMatch(false);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setInvalidPassword(false);
        setPasswordsDontMatch(false);
    }


    const handleModifyUsername = async () => {
        if (newPassword === "") {
            setInvalidPassword(true);
            return;
        }
        setInvalidPassword(false);
        if (newPassword !== confirmPassword) {
            setPasswordsDontMatch(true);
            return;
        }
        setPasswordsDontMatch(false);

        props.handleCloseModal();
        const res = await axios.put(`http://localhost:8000/clientes/${props.user.Usuario}`, {
            Contrasena: newPassword
        });
        console.log(res.data);

        logOut();
        removeCookie('username', { path: '/' });
        navigate('/');
        window.location.reload();
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md px-20 py-10 relative"
             data-aos="zoom-in">
            <h1 className="text-2xl font-bold">
                Write your new password below
            </h1>
            <p className="text-lg mt-3">
                Notice that if you change your password, you will have to log in again.
            </p>
            <input
                type={showPassword ? "text" : "password"}
                id="text"
                className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                ${passwordsDontMatch || invalidPassword ? 'border-red-500' : 'border-black'}`}
                placeholder="New password"
                onChange={handleNewUserPasswordChange}
            />
            <div className="flex flex-row items-end pl-10">
                <input
                    type={showPassword ? "text" : "password"}
                    id="text"
                    className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                    ${passwordsDontMatch || invalidPassword ? 'border-red-500' : 'border-black'}`}
                    placeholder="Confirm password"
                    onChange={handleConfirmPasswordChange}
                />
                <button onClick={handleShowPassword} className="text-xl pl-5 duration-300 transition-transform transform hover:scale-125">
                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </button>
            </div>
            {invalidPassword &&
                <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a valid
                    password</p>}
            {passwordsDontMatch && <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">The passwords don't match</p>}
            <div className={`flex items-center justify-center mt-6 bg-black text-white p-2 rounded-md mb-5 duration-500
            ${invalidPassword || passwordsDontMatch ? 'hover:bg-red-500 hover:text-white hover:border hover:border-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}>
                <button className="w-full h-full" onClick={handleModifyUsername}>
                    Change Password
                </button>
            </div>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

ModifyPasswordModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default ModifyPasswordModal;