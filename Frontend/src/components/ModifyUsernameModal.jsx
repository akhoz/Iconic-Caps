import PropTypes from "prop-types";
import {IoClose} from "react-icons/io5";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUser} from "../contexts/UserContext.jsx";

function ModifyUsernameModal(props) {
    const navigate = useNavigate();
    const { user, logOut } = useUser();
    const [cookie, setCookie, removeCookie] = useCookies(['username']);

    const [newUsername, setNewUsername] = useState("");
    const [currentUsernames, setCurrentUsernames] = useState([]);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);


    const handleNewUsernameChange = (event) => {
        setNewUsername(event.target.value);
        setInvalidUsername(false);
        setUsernameAlreadyExists(false);
    }

    const getExistingUsernames = async () => {
        const res = await axios.get('http://localhost:8000/clientes');
        const clientes = res.data;
        const usernames = clientes.map(cliente => cliente.Usuario);
        setCurrentUsernames(usernames);
    }

    getExistingUsernames();
    const handleModifyUsername = async () => {
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

        props.handleCloseModal();
        const res = await axios.put(`http://localhost:8000/clientes/${props.user.Usuario}`, {
            Usuario: newUsername
        });
        console.log(res.data);

        logOut();
        removeCookie('username', { path: '/' });
        navigate('/LogIn');
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md px-20 py-10 relative" data-aos="zoom-in">
            <h1 className="text-2xl font-bold">
                Write your new username below
            </h1>
            <p className="text-lg mt-3">
                Notice that if you change your username, you will have to log in again.
            </p>
            <input
                type="text"
                id="text"
                className={`border-0 border-b-2 p-1 mt-8 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0
                ${invalidUsername || usernameAlreadyExists ? 'border-red-500' : 'border-black'}`}
                placeholder="Username"
                onChange={handleNewUsernameChange}
            />
            {invalidUsername && <p className="text-red-500 text-sm" data-aos="zoom-in" data-aos-duration="500">Please enter a valid username</p>}
            {usernameAlreadyExists && <p className="text-red-500 text-sm">This username is already taken</p>}
            <div className={`flex items-center justify-center mt-6 bg-black text-white p-2 rounded-md mb-5 duration-500
            ${invalidUsername || usernameAlreadyExists ? 'hover:bg-red-500 hover:text-white hover:border hover:border-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}>
                <button className="w-full h-full" onClick={handleModifyUsername}>
                    Modify Username
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

ModifyUsernameModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default ModifyUsernameModal;