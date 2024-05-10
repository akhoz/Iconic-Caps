import CheckoutProduct from "../components/CheckoutProduct.jsx";
import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";

function Checkout() {
    return (
        <>
            <div className="flex flex-col items-center justify-center my-24" data-aos="fade-up">
                <h1 className="text-black font-bold text-3xl">
                    Your Bag
                </h1>
                <div className="flex w-10/12 flex-row justify-between items-center mt-20">
                    <p className="text-lg font-bold w-1/3 lg:w-1/2 xl:text-xl">
                        Product
                    </p>
                    <div className="flex flex-row justify-between items-center text-lg font-bold w-2/3 lg:w-1/2 xl:text-xl">
                        <p>
                            Price
                        </p>
                        <p>
                            Quantity
                        </p>
                        <p>
                            Total
                        </p>
                    </div>
                </div>
                <hr className="w-10/12 border-b border-gray-100 xl:mb-8"/>
                <CheckoutProduct/>
                <CheckoutProduct/>
                <div className="flex flex-row justify-between w-10/12 mt-14">
                    <div className="flex flex-col justify-start items-start w-1/2">
                        <div className="flex flex-row w-full items-center justify-start">
                            <input
                                type="text"
                                id="text"
                                className="w-3/5 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
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
                                className="w-1/2 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                                placeholder="Card Number"
                            />
                            <input
                                type="text"
                                id="text"
                                className="w-1/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                                placeholder="Expire"
                            />
                            <input
                                type="text"
                                id="text"
                                className="w-1/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                                placeholder="CVV"
                            />
                        </div>
                        <div className="flex flex-row w-full space-x-3">
                            <input
                                type="text"
                                id="text"
                                className="w-3/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                                placeholder="Delivery Direction"
                            />
                            <input
                                type="text"
                                id="text"
                                className="w-1/4 text-xl border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-end w-1/2">
                        Information
                    </div>
                </div>
            </div>
            <Link to="/Shop"
                  className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105"
                  data-aos="fade-up">
                <FaArrowLeft/>
                <span>Keep Shopping</span>
            </Link>
        </>
    );
}

export default Checkout;