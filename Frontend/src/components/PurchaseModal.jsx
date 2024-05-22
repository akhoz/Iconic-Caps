import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function PurchaseModal() {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-20 relative" data-aos="zoom-in">
            <h1 className="text-2xl font-bold">Thanks for your Purchase</h1>
            <p className="text-lg mt-3">We hope you enjoy your brand new Iconic Caps</p>
            <Link to ='/Account'>
                You can cheek your order status in your account
            </Link>
            <button className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <Link to="/Shop">
                    <IoClose/>
                </Link>
            </button>
        </div>
    );
}

export default PurchaseModal;