import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";

function Order(props) {
    return (
        <div className="flex w-10/12 flex-col">
            <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-col items-start text-center w-fit">
                    {props.modelos.map((modeloCantidad, index) => (
                        <div key={index} className="flex flex-row items-start">
                            <h2 className="text-lg xl:text-xl">
                                {modeloCantidad.Modelo}
                            </h2>
                            <p className="text-lg ml-5 xl:text-xl">
                                {modeloCantidad.Cantidad}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="text-black w-fit xl:text-lg">
                    {props.status}
                </p>
                <p className="text-black w-fit text-center xl:text-lg">
                    {props.orderNumber}
                </p>
                <p className="text-black w-fit text-center xl:text-lg">
                    {props.purchaseDate}
                </p>
                <div className="flex flex-row items-center justify-center text-black w-1/6 text-right space-x-5 xl:text-lg">
                    <p>
                        {props.deliverer}
                    </p>
                    <MdCancel className="text-lg"/>
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
    deliverer: PropTypes.string
}

export default Order;
