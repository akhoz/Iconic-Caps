import {FaCcVisa} from "react-icons/fa";
import {RiMastercardFill} from "react-icons/ri";
import PropTypes from "prop-types";
import {useState} from "react";

function PaymentForm(props) {
    const [cardholder, setCardholder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expire, setExpire] = useState("");
    const [cvv, setCvv] = useState("");
    const [direction, setDirection] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [formStatus, setFormStatus] = useState(false);

    const verifyPaymentForm = () => {
        if (!cardholder || !cardNumber || !expire || !cvv || !direction || !postalCode) {
            alert('Please fill all the fields');
            setFormStatus(false);
        } else {
            setFormStatus(true);
            props.confirmPurchase();
        }
    };

    const handlePurchaseClick = () => {
        verifyPaymentForm();
    };


    return (
        <div className="flex flex-col w-full mt-8 ml-5 md:ml-0 md:mt-8 md:w-10/12  md:flex-row md:justify-between">
            <div className="flex flex-col justify-start items-start w-full md:w-1/2">
                <div className="flex flex-row w-full items-center justify-start">
                    <input
                        type="text"
                        id="cardholder"
                        className="w-3/5 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0"
                        placeholder="Cardholer's Name"
                        onChange={(e) => setCardholder(e.target.value)}
                    />
                    <div className="flex flex-row items-center justify-center text-3xl ml-5 space-x-2">
                        <FaCcVisa/>
                        <RiMastercardFill/>
                    </div>
                </div>
                <div className="flex flex-row w-full space-x-3">
                    <input
                        type="number"
                        id="cardNumber"
                        className="remove-arrow w-1/2 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/2"
                        placeholder="Card Number"
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        id="expire"
                        className="text-center w-1/6 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/4"
                        placeholder="Expire"
                        onChange={(e) => setExpire(e.target.value)}
                    />
                    <input
                        type="number"
                        id="cvv"
                        className="remove-arrow text-center w-1/6 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/4"
                        placeholder="CVV"
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
                <div className="flex flex-row w-full space-x-3">
                    <input
                        type="text"
                        id="direction"
                        className="w-2/3 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-3/4"
                        placeholder="Delivery Direction"
                        onChange={(e) => setDirection(e.target.value)}
                    />
                    <input
                        type="number"
                        id="text"
                        className="remove-arrow text-center w-1/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:outline-0 md:w-1/4"
                        placeholder="Postal Code"
                        onChange={(e) => setPostalCode(e.target.value)}
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
                    onClick={handlePurchaseClick}>
                    Confirm Purchase
                </button>
            </div>
        </div>
    )
}

PaymentForm.propTypes = {
    total: PropTypes.number,
    confirmPurchase: PropTypes.func
}

export default PaymentForm;