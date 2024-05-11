import { IoClose } from "react-icons/io5";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function OutStockModal(props) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-20 relative" data-aos="zoom-in">
            <h1 className="text-2xl font-bold">Oops, out of stock!</h1>
            <p className="text-lg mt-3">
                {`Seems like you're trying to buy more of this product (${props.model}) than we have in stock`}
            </p>
            <p>
                {`But you can purchase the ${props.amount} units of this product that you have in your bag`}
            </p>
            <Link to={"/Shop"} className="underline">
                <p>
                    Or check out our other products
                </p>
            </Link>
            <button className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150"
                    onClick={props.onCloseModal}>
                <IoClose/>
            </button>
        </div>
    );
}

OutStockModal.propTypes = {
    model: PropTypes.string,
    amount: PropTypes.number,
    onCloseModal: PropTypes.func
}

export default OutStockModal;