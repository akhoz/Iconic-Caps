import CheckoutProduct from "../components/CheckoutProduct.jsx";
import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

function Checkout() {
    return (
        <div className="flex flex-col items-center justify-center my-24">
            <h1 className="text-black font-bold text-3xl" data-aos="fade-up">
                Your Bag
            </h1>
            <div className="flex w-10/12 flex-row justify-between items-center mt-20" data-aos="fade-up">
                <p className="w-1/2 text-lg font-bold">
                    Product
                </p>
                <div className="flex flex-row justify-between items-center w-1/2 text-lg font-bold">
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
            <hr className="w-10/12 border-b border-gray-100 xl:mb-8" data-aos="fade-up"/>
            <CheckoutProduct/>
            <CheckoutProduct/>
            <div className="flex flex-row justify-between w-10/12" data-aos="fade-up">
                <p className="flex flex-col justify-start items-start w-1/2">
                    Payment Form
                </p>
                <p className="flex flex-col justify-start items-end w-1/2">
                    Information
                </p>
            </div>
            <Link to="/Shop" className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105" data-aos="fade-up">
                <FaArrowLeft/>
                <span>Keep Shopping</span>
            </Link>
        </div>
    );
}

export default Checkout;