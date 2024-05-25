import PropTypes from "prop-types";
import {IoClose} from "react-icons/io5";
import axios from "axios";

function PendingOrderModal(props) {
    const handleDeliverOrder = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/envioxpedido/${props.orderSelected}`, {
                Estado: "Entregado"
            });
            console.log(res.data);
            props.handleCloseModal();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    console.log(`http://localhost:8000/envioxpedido/${props.orderSelected}`)


    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md px-12 py-12 relative"
             data-aos="zoom-in">
            <h1 className="text-2xl text-center font-bold lg:w-2/3">
                Is this order delivered?
            </h1>
            <p className="text-lg mt-3 text-center lg:w-2/3">
                Order: {props.orderSelected}
            </p>
            <p className="text-lg text-center w-4/5">
                {'Click the button below to confirm the delivery of this order'}
            </p>
            <button className="mt-5 bg-black text-white rounded-lg w-1/2 py-3 duration-500
                    hover:bg-white hover:text-black hover:border hover:border-black"
                    onClick={handleDeliverOrder}>
                Confirm Delivery
            </button>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

PendingOrderModal.propTypes = {
    orderSelected: PropTypes.number.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};


export default PendingOrderModal;