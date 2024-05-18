import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

function CancelOrderModal(props) {

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
                    onClick={}>
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

CancelOrderModal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    modalDescription: PropTypes.string.isRequired,
    modalButtonText: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default CancelOrderModal;
