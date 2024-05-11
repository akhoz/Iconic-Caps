import {FaCcVisa} from "react-icons/fa";
import {RiMastercardFill} from "react-icons/ri";
import PropTypes from "prop-types";

function PaymentForm(props) {
    return (
        <div className="flex flex-col w-full mt-8 ml-5 md:ml-0 md:mt-8 md:w-10/12  md:flex-row md:justify-between">
            <div className="flex flex-col justify-start items-start w-full md:w-1/2">
                <div className="flex flex-row w-full items-center justify-start">
                    <input
                        type="text"
                        id="text"
                        className="w-3/5 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0"
                        placeholder="Cardholer's Name"
                    />
                    <div className="flex flex-row items-center justify-center text-3xl ml-5 space-x-2">
                        <FaCcVisa/>
                        <RiMastercardFill/>
                    </div>
                </div>
                <div className="flex flex-row w-full space-x-3">
                    <input
                        type="text"
                        id="text"
                        className="w-1/2 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/2"
                        placeholder="Card Number"
                    />
                    <input
                        type="text"
                        id="text"
                        className="text-center w-1/6 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/4"
                        placeholder="Expire"
                    />
                    <input
                        type="text"
                        id="text"
                        className="text-center w-1/6 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/4"
                        placeholder="CVV"
                    />
                </div>
                <div className="flex flex-row w-full space-x-3">
                    <input
                        type="text"
                        id="text"
                        className="w-2/3 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-3/4"
                        placeholder="Delivery Direction"
                    />
                    <input
                        type="text"
                        id="text"
                        className="text-center w-1/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/4"
                        placeholder="Postal Code"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-end items-end w-11/12 mt-8 md:justify-start md:mt-0 md:w-1/2">
                <h1 className="text-3xl font bold">
                    {`Total: $${props.total}`}
                </h1>
                <p className="text-gray-600 text-md">
                    Garanty: 100%
                </p>
                <button
                    className="bg-black text-white rounded-lg text-center py-3 px-5 mt-3
                            duration-500 hover:bg-white hover:text-black hover:border hover:border-black"
                    onClick={props.handlePurchaseClick}>
                    Confirm Purchase
                </button>
            </div>
        </div>
    )
}

PaymentForm.propTypes = {
    total: PropTypes.number,
    handlePurchaseClick: PropTypes.func
}

export default PaymentForm;