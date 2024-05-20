import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";

function CancelOrderModal(props) {
    const handleCancelOrder = async () => {
        const res = await axios.put(`http://localhost:8000/envioxpedido/${props.orderNumber}`, {
            Estado: "Cancelado"
        });
        console.log(res.data);
        props.handleCloseModal();
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md px-12 py-12 relative" data-aos="zoom-in">
            <h1 className="text-2xl text-center font-bold lg:w-2/3">
                Are you sure you want to cancel this order?
            </h1>
            <p className="text-lg mt-3 text-center lg:w-2/3">
                This action cannot be undone. A fee of 15% of the total price will be charged.
            </p>
            <button
                className="mt-5 bg-black text-white rounded-lg w-1/2 py-3 duration-500
                hover:bg-red-500 "
                onClick={handleCancelOrder}>
                Cancel Order
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
    handleCloseModal: PropTypes.func.isRequired,
    orderNumber: PropTypes.number.isRequired,
};

export default CancelOrderModal;
