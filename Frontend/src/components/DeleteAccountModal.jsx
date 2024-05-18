import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { useNavigate} from "react-router-dom";
import {useUser} from "../contexts/UserContext.jsx";

function DeleteAccountModal(props) {
    const [cookie, setCookie, removeCookie] = useCookies(['username']);
    const { user, logOut } = useUser();
    const navigate = useNavigate();
    const URI = `http://localhost:8000/clientes/${user.Usuario}`;



    const handleButtonClick = async () => {
        props.handleCloseModal();
        removeCookie('username', { path: '/' });
        logOut();

        await fetch(URI, {
            method: 'DELETE',
        });

        await navigate('/');
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md px-12 py-12 relative" data-aos="zoom-in">
            <h1 className="text-2xl text-center font-bold lg:w-2/3">
                {props.modalTitle}
            </h1>
            <p className="text-lg mt-3 text-center lg:w-2/3">
                {props.modalDescription}
            </p>
            <button className="mt-5 bg-black text-white rounded-lg w-1/2 py-3 duration-500
                    hover:bg-red-500 "
                    onClick={handleButtonClick}>
                {props.modalButtonText}
            </button>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

DeleteAccountModal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    modalDescription: PropTypes.string.isRequired,
    modalButtonText: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteAccountModal;
