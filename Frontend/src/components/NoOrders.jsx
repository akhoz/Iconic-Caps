import LinkButton from "./LinkButton.jsx";
import { FaShippingFast } from "react-icons/fa";

function NoOrders() {
    return (
        <div className="flex flex-col items-center justify-between w-full px-14 my-16 md:flex-row md:px-28 md:my-20 lg:px-40 lg:mt-24 lg:mb-8 xl:px-60">
            <div className="flex flex-col justify-center items-center w-full md:items-start">
                <h2 className="w-full text-center font-bold text-2xl md:text-start md:text-3xl">
                    You don't have any orders yet
                </h2>
                <p className="mt-5 mb-2 text-lg text-center md:text-start md:w-2/3 md:text-xl">
                    Start shopping now so you can view your pending
                    shipments from here.
                </p>
                <p className="mb-5 text-lg text-center md:text-start md:w-2/3 md:text-xl">
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
                <FaShippingFast className="hidden md:block font-bold md:w-2/3 md:h-2/3 lg:w-2/3 lg:h-2/3 xl:h-2/5 xl:w-2/5"/>
            </div>

        </div>
    );
}

export default NoOrders;