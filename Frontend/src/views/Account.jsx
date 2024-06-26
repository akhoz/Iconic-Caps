import {Link, useNavigate} from "react-router-dom";
import NoOrders from "../components/NoOrders.jsx";
import {useUser} from "../contexts/UserContext.jsx";
import UserComments from "../components/UserComments.jsx";
import DeleteAccountModal from "../components/DeleteAccountModal.jsx";
import DeleteCommentModal from "../components/DeleteCommentModal.jsx";
import {useEffect, useState} from "react";
import Order from "../components/Order.jsx";
import axios from "axios";
import ModifyUsernameModal from "../components/ModifyUsernameModal.jsx";
import ModifyPasswordModal from "../components/ModifyPasswordModal.jsx";
import CancelOrderModal from "../components/CancelOrderModal.jsx";

function Account() {
    const { user, logOut } = useUser();
    const URI = `http://localhost:8000/consultas/pedidos/${user?.CedulaCliente}`;
    const navigate = useNavigate();

    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalButtonText, setModalButtonText] = useState("");

    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [pedidosEnProceso, setPedidosEnProceso] = useState([]);
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
    const [orderSelected, setOrderSelected] = useState(0);

    useEffect( ()=>{
        if (user) {
            getPedidos()
        }
    });

    const getPedidos = async () => {
        const res = await axios.get(URI);
        const pedidosData = res.data;

        const pedidosAgrupados = {};
        pedidosData.forEach(pedido => {
            if (pedidosAgrupados.hasOwnProperty(pedido.NumeroFactura)) {
                pedidosAgrupados[pedido.NumeroFactura].push({
                    Modelo: pedido.ModeloProducto,
                    Cantidad: pedido.CantidadProducto
                });
            } else {
                pedidosAgrupados[pedido.NumeroFactura] = [{
                    Modelo: pedido.ModeloProducto,
                    Cantidad: pedido.CantidadProducto
                }];
            }
        });

        const pedidosAgrupadosArray = Object.keys(pedidosAgrupados).map(numeroFactura => ({
            NumeroFactura: parseInt(numeroFactura),
            ModeloProducto: pedidosAgrupados[numeroFactura],
            Estado: pedidosData.find(pedido => pedido.NumeroFactura === parseInt(numeroFactura)).Estado,
            FechaDeCompra: pedidosData.find(pedido => pedido.NumeroFactura === parseInt(numeroFactura)).FechaDeCompra,
            Repartidor: pedidosData.find(pedido => pedido.NumeroFactura === parseInt(numeroFactura)).Repartidor
        }));

        const pedidosEntregadosArray = pedidosAgrupadosArray.filter(pedido => pedido.Estado === "Entregado");
        const pedidosEnProcesoArray = pedidosAgrupadosArray.filter(pedido => pedido.Estado === "En proceso");
        setPedidosEntregados(pedidosEntregadosArray);
        setPedidosEnProceso(pedidosEnProcesoArray);
    }


    const handleLogOutClick =  () => {
        logOut();
        navigate('/');
        window.location.reload();
    }

    const handleCloseModal = () => {
        setShowAccountModal(false);
        setShowCommentModal(false);
        setShowModifyUsernameModal(false);
        setShowModifyPasswordModal(false);
        setShowCancelOrderModal(false);
    }

    const handleDeleteAccount = () => {
        setShowAccountModal(true);
        setModalTitle("Are you sure you want to delete your account?");
        setModalDescription("This action cannot be undone. Your account will be permanently deleted.");
        setModalButtonText("Delete Account");
    }

    const handleClickComment = () => {
        setShowCommentModal(true);
        setModalTitle("Are you sure you want to delete this comment?");
        setModalDescription("This action cannot be undone. Your comment will be permanently deleted.");
        setModalButtonText("Delete Comment");
    }

    const [showModifyUsernameModal, setShowModifyUsernameModal] = useState(false)
    const handleModifyUsername = () => {
        setShowModifyUsernameModal(true);
    }

    const [showModifyPasswordModal, setShowModifyPasswordModal] = useState(false)
    const handleModifyPassword = () => {
        setShowModifyPasswordModal(true);
    }

    const handleCancelOrder = (orderNumber) => {
        setOrderSelected(orderNumber);
        setShowCancelOrderModal(true);
    }


    return (
        <>
            {user &&
            <div className="flex flex-col w-full items-center justify-center" data-aos="fade-up">
                <div className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
                    <h1 className="text-5xl text-center text-white z-10">
                        {user.Usuario}
                    </h1>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div
                    className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40">
                    <button
                        className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                        onClick={handleModifyUsername}>
                        Modify Username
                    </button>
                    <button
                        className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                        onClick={handleModifyPassword}>
                        Change Password
                    </button>
                    <Link
                        to="/"
                        className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                        Go Back To Home
                    </Link>
                    <button
                        onClick={handleLogOutClick}
                        className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                        Log Out
                    </button>
                    <button
                        className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                        onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                </div>
                {pedidosEntregados.length === 0 && pedidosEnProceso.length === 0 && <NoOrders/>}
                {pedidosEnProceso.length > 0 &&
                    <div className="flex flex-col items-center justify-center w-10/12 mt-20">
                        <h1 className="text-2xl font-bold mb-14">
                            Your Pending Orders
                        </h1>
                        <div className="flex flex-row justify-between w-full font-bold text-xs md:text-lg xl:text-xl">
                            <p className="w-1/5 text-center">
                                Products
                            </p>
                            <p className="w-1/5 text-center">
                                Status
                            </p>
                            <p className="w-1/5 text-center">
                                Order Number
                            </p>
                            <p className="w-1/5 text-center">
                                Purchase Date
                            </p>
                            <p className="w-1/5 text-center">
                                Deliverer
                            </p>
                        </div>
                        <hr className="w-full border-b border-gray-100 xl:mb-8"/>
                    </div>}
                {pedidosEnProceso.map(pedido => (
                    <Order
                        key={pedido.NumeroFactura}
                        modelos={pedido.ModeloProducto}
                        status={pedido.Estado}
                        orderNumber={pedido.NumeroFactura}
                        purchaseDate={pedido.FechaDeCompra}
                        deliverer={pedido.Repartidor}
                        handleCancelOrder={() => handleCancelOrder(pedido.NumeroFactura)}
                    />
                ))}
                {pedidosEntregados.length > 0 &&
                    <div className="flex flex-col items-center justify-center w-10/12 mt-20">
                        <h1 className="text-2xl font-bold mb-14">
                            Your Previous Orders
                        </h1>
                        <div className="flex flex-row justify-between w-full font-bold text-xs md:text-lg xl:text-xl">
                            <p className="w-1/5 text-center">
                                Products
                            </p>
                            <p className="w-1/5 text-center">
                                Status
                            </p>
                            <p className="w-1/5 text-center">
                                Order Number
                            </p>
                            <p className="w-1/5 text-center">
                                Purchase Date
                            </p>
                            <p className="w-1/5 text-center">
                                Deliverer
                            </p>
                        </div>
                        <hr className="w-full border-b border-gray-100 xl:mb-8"/>
                    </div>}
                {pedidosEntregados.map(pedido => (
                    <Order
                        key={pedido.NumeroFactura}
                        modelos={pedido.ModeloProducto}
                        status={pedido.Estado}
                        orderNumber={pedido.NumeroFactura}
                        purchaseDate={pedido.FechaDeCompra}
                        deliverer={pedido.Repartidor}
                    />
                ))}
                <UserComments handleClickComment={handleClickComment}/>
            </div>
            }
            {showAccountModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <DeleteAccountModal
                        modalTitle={modalTitle}
                        modalDescription={modalDescription}
                        modalButtonText={modalButtonText}
                        handleCloseModal={handleCloseModal}
                    />
                </div>

            )}
            {showAccountModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showCommentModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <DeleteCommentModal
                        modalTitle={modalTitle}
                        modalDescription={modalDescription}
                        modalButtonText={modalButtonText}
                        handleCloseModal={handleCloseModal}
                    />
                </div>

            )}
            {showCommentModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showModifyUsernameModal && (
                <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <ModifyUsernameModal
                        handleCloseModal={handleCloseModal}
                        user={user}/>
                </div>

            )}
            {showModifyUsernameModal && (
                <div className="fixed inset-0 w-screen h-screen bg-black z-30 opacity-80">
                </div>
            )}
            {showModifyPasswordModal && (
                <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <ModifyPasswordModal
                        handleCloseModal={handleCloseModal}
                        user={user}/>
                </div>

            )}
            {showModifyPasswordModal && (
                <div className="fixed inset-0 w-screen h-screen bg-black z-30 opacity-80">
                </div>
            )}
            {showCancelOrderModal && (
                <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <CancelOrderModal
                        handleCloseModal={handleCloseModal}
                        orderNumber={orderSelected}/>
                </div>

            )}
            {showCancelOrderModal && (
                <div className="fixed inset-0 w-screen h-screen bg-black z-30 opacity-80">
                </div>
            )}
        </>
    );
}

export default Account;
