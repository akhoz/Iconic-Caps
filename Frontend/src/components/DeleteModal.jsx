import {IoClose} from "react-icons/io5";
import PropTypes from "prop-types";

function DeleteModal(props) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-20 relative" data-aos="zoom-in">
            <h1 className="text-2xl font-bold">
                {props.modalTitle}
            </h1>
            <p className="text-lg mt-3">
                {props.modalDescription}
            </p>
            <button className="mt-5 bg-black text-white rounded-lg w-1/2 py-3 duration-500
                    hover:bg-red-500 ">
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

DeleteModal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    modalDescription: PropTypes.string.isRequired,
    modalButtonText: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired
};

export default DeleteModal;