import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";
import {useEffect, useState} from "react";

function Order(props) {
    const [status, setStatus] = useState(props.status);

    const traduceStatus = (status) => {
        if (status === "Entregado") {
            setStatus("Delivered");
        } else if (status === "En proceso") {
            setStatus("In process");
        }
    }

    useEffect(() => {
        traduceStatus(props.status);
    });

    return (
        <div className="flex w-10/12 flex-col">
            <div className="flex w-full flex-row justify-between items-center py-5">
                <div className="flex flex-col items-center justify-center text-center w-1/5">
                    {props.modelos.map((modeloCantidad, index) => (
                        <div key={index} className="flex flex-row items-center justify-center space-x-1">
                            <h2 className="text-xs md:text-lg xl:text-xl">
                                {`${modeloCantidad.Modelo}`}
                            </h2>
                            <p className="text-xs md:text-lg xl:text-xl">
                                <span className="text-xs">x</span>
                                {`${modeloCantidad.Cantidad}`}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-between w-3/5 items-center">
                    <p className="text-black w-1/3 text-center text-xs md:text-lg xl:text-xl">
                        {status}
                    </p>
                    <p className="text-black w-1/3 text-center text-xs md:text-lg xl:text-xl">
                        {props.orderNumber}
                    </p>
                    <p className="text-black w-1/3 text-center text-xs md:text-lg xl:text-xl">
                        {props.purchaseDate}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between text-black w-1/5 text-xs md:text-lg xl:text-xl">
                    <p className="w-11/12 text-center">
                        {props.deliverer}
                    </p>
                    <button
                        className={`ml-3 md:ml-0 1/12 duration-500 hover:text-red-500
                        ${status === "Delivered" ? "hidden" : ""}`}
                        onClick={props.handleCancelOrder}>
                        <MdCancel/>
                    </button>
                </div>
            </div>
            <hr className="w-full border-b border-gray-100 xl:mt-10 xl:mb-14"/>
        </div>
    );
}

Order.propTypes = {
    modelos: PropTypes.arrayOf(PropTypes.shape({
        Modelo: PropTypes.string,
        Cantidad: PropTypes.number
    })),
    status: PropTypes.string,
    orderNumber: PropTypes.number,
    purchaseDate: PropTypes.string,
    deliverer: PropTypes.string,
    handleCancelOrder: PropTypes.func
}

export default Order;
