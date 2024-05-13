import LinkButton from "./LinkButton.jsx";
import { FaShippingFast } from "react-icons/fa";

function NoOrders() {
    return (
        <div className="flex flex-row items-center justify-between w-full px-40 my-24">
            <div className="flex flex-col justify-center items-start w-1/2">
                <h2 className="w-full text-3xl font-bold">
                    You don't have any orders yet
                </h2>
                <p className="w-2/3 text-xl mt-5 mb-2">
                    Start shopping now so you can view your pending
                    shipments from here.
                </p>
                <p className="w-2/3 text-xl mb-5">
                    Check out our shop section, we're sure you'll find
                    the perfect product for you, so we suggest you take
                    a look!
                </p>
                <LinkButton
                    bgColor={"bg-black"}
                    textColor={"text-white"}
                    text={"Go to Shop"}
                    href={"/Shop"}/>
            </div>
            <div className="flex flex-row-reverse w-1/2">
                <FaShippingFast className="w-2/3 h-2/3 font-bold"/>
            </div>

        </div>
    );
}

export default NoOrders;