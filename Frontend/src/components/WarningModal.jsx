import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {IoClose} from "react-icons/io5";

function WarningModal(props) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-20 relative" data-aos="zoom-in">
            <h1 className="text-2xl font-bold">
                {props.warningTitle}
            </h1>
            <p className="text-lg mt-3">
                {props.warningDescription}
            </p>
            <button
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <Link to="/Shop">
                    <IoClose/>
                </Link>
            </button>
        </div>
    );
}

WarningModal.propTypes = {
    warningTitle: PropTypes.string.isRequired,
    warningDescription: PropTypes.string.isRequired
};

export default WarningModal;