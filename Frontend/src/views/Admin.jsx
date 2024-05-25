import { useUser } from "../contexts/UserContext.jsx";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";

import AddProductModal from "../components/admin/AddProductModal.jsx";
import AddStoreModal from "../components/admin/AddStoreModal.jsx";
import AddEmployeesModal from "../components/admin/AddEmployees.Modal.jsx";
import AddDelivererModal from "../components/admin/AddDelivererModal.jsx";
import AddProvidersModal from "../components/admin/AddProvidersModal.jsx";

import ModifyProductModal from "../components/admin/ModifyProductModal.jsx";
import ModifyStoreModal from "../components/admin/ModifyStoreModal.jsx";
import ModifyEmployeeModal from "../components/admin/ModifyEmployeeModal.jsx";
import ModifyDelivererModal from "../components/admin/ModifyDelivererModal.jsx";

import DeleteProductModal from "../components/admin/DeleteProductModal.jsx";
import DeleteStoreModal from "../components/admin/DeleteStoreModal.jsx";
import DeleteEmployeeModal from "../components/admin/DeleteEmployeeModal.jsx";
import DeleteDelivererModal from "../components/admin/DeleteDelivererModal.jsx";

import Dashboard from "../components/admin/Dashboard.jsx";
import PendingOrderModal from "../components/admin/ordersManagement/PendingOrderModal.jsx";
import axios from "axios";

function Admin() {
    const { user, logOut } = useUser();
    const navigate = useNavigate();
    const [showFeatures, setShowFeatures] = useState(false);

    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showAddStoreModal, setShowAddStoreModal] = useState(false);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showAddDelivererModal, setShowAddDelivererModal] = useState(false);
    const [showAddProvidersModal, setShowAddProvidersModal] = useState(false);

    const [showModifyProductModal, setShowModifyProductModal] = useState(false);
    const [showModifyStoreModal, setShowModifyStoreModal] = useState(false);
    const [showModifyEmployeeModal, setShowModifyEmployeeModal] = useState(false);
    const [showModifyDelivererModal, setShowModifyDelivererModal] = useState(false);

    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showDeleteStoreModal, setShowDeleteStoreModal] = useState(false);
    const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
    const [showDeleteDelivererModal, setShowDeleteDelivererModal] = useState(false);

    const [showPendingOrderModal, setShowPendingOrderModal] = useState(false);

    const handleFeatures = () => {
        setShowFeatures(!showFeatures);
        if (!showFeatures) {
            window.scrollBy({ top: 110, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const handleLogOut = () => {
        logOut();
        navigate('/');
        window.location.reload();
    }

    const handleCloseModal = () => {
        setShowAddProductModal(false);
        setShowAddStoreModal(false);
        setShowAddEmployeeModal(false);
        setShowAddDelivererModal(false);
        setShowAddProvidersModal(false);

        setShowModifyProductModal(false);
        setShowModifyStoreModal(false);
        setShowModifyEmployeeModal(false);
        setShowModifyDelivererModal(false);

        setShowDeleteProductModal(false);
        setShowDeleteStoreModal(false);
        setShowDeleteEmployeeModal(false);
        setShowDeleteDelivererModal(false);

        setShowPendingOrderModal(false);
    }

    const handleAddProduct = () => {
        setShowAddProductModal(true);
    }

    const handleAddStore = () => {
        setShowAddStoreModal(true);
    }

    const handleAddEmployee = () => {
        setShowAddEmployeeModal(true);
    }

    const handleAddDeliverer = () => {
        setShowAddDelivererModal(true);
    }

    const handleAddProviders = () => {
        setShowAddProvidersModal(true);
    }

    const handleModifyProduct = () => {
        setShowModifyProductModal(true);
    }

    const handleModifyStore = () => {
        setShowModifyStoreModal(true);
    }

    const handleModifyEmployee = () => {
        setShowModifyEmployeeModal(true);
    }

    const handleModifyDeliverer = () => {
        setShowModifyDelivererModal(true);
    }

    const handleDeleteProduct = () => {
        setShowDeleteProductModal(true);
    }

    const handleDeleteStore = () => {
        setShowDeleteStoreModal(true);
    }

    const handleDeleteEmployee = () => {
        setShowDeleteEmployeeModal(true);
    }

    const handleDeleteDeliverer = () => {
        setShowDeleteDelivererModal(true);
    }

    const handleClickOrder = (order) => {
        setShowPendingOrderModal(true)
        setSelectedOrder(order)
    }

    const URI = `http://localhost:8000/consultas/pedidos-pendientes`
    const [pendingOrders, setPendingOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect( ()=>{
        getPendingOrders()
    },[])

    const getPendingOrders = async () => {
        const res = await axios.get(URI)
        setPendingOrders(res.data)
    }

    return (
        <>
            {user && (
                <div className="flex flex-col w-full items-center justify-center" data-aos="fade-up">
                    <div
                        className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
                        <h1 className="text-5xl text-center text-white z-10">
                            {user.Usuario}
                        </h1>
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40">
                        <button
                            className="flex flex-row justify-center items-center duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125 space-x-2"
                            onClick={handleFeatures}
                        >
                            <p>Display Features</p>
                            {showFeatures ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                    </div>
                    {showFeatures && (
                        <div
                            className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
                            data-aos="fade-down">
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125 text-center"
                                onClick={handleAddProduct}
                            >
                                Add Products
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleAddStore}>
                                Add Stores
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleAddEmployee}>
                                Add Employees
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleAddDeliverer}>
                                Add Deliverers
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleAddProviders}>
                                Add Providers
                            </button>
                        </div>
                    )}
                    {showFeatures && (
                        <div
                            className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
                            data-aos="fade-down">
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleModifyProduct}>
                                Modify Products
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleModifyStore}>
                                Modify Stores
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleModifyEmployee}>
                                Modify Employees
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleModifyDeliverer}>
                                Modify Deliverers
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                                Modify Providers
                            </button>
                        </div>
                    )}
                    {showFeatures && (
                        <div
                            className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
                            data-aos="fade-down">
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleDeleteProduct}>
                                Delete Products
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleDeleteStore}
                            >
                                Delete Stores
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleDeleteEmployee}
                            >
                                Delete Employees
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                                onClick={handleDeleteDeliverer}
                            >
                                Delete Deliverers
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                                Delete Providers
                            </button>
                        </div>
                    )}
                    <Dashboard/>
                    <div className="flex-grow bg-black w-full text-white mt-20 py-20 relative">
                        <h1 className="font-bold text-2xl absolute top-8 left-8">
                            Pending Orders
                        </h1>
                        {pendingOrders.length === 0 && (
                            <p className={`${pendingOrders.length > 0 ? 'hidden' : ''} text-lg ml-8`}>
                                There are no pending orders
                            </p>)}
                        {pendingOrders.length > 0 && (
                        <div className="flex w-full justify-center">
                            <div
                                className="grid grid-cols-1 gap-x-10 gap-y-20 mx-8 w-full md:grid-cols-2 lg:grid-cols-3">
                                {pendingOrders.map((order) => (
                                    <button
                                        key={order.NumeroFactura}
                                        className="transition-transform transform hover:scale-105"
                                        onClick={() => handleClickOrder(order)}
                                    >
                                        <div className="flex flex-col justify-between items-start">
                                            <h2 className="font-bold text-lg">
                                                {`Order: ${order.NumeroFactura}`}
                                            </h2>
                                            <p className="text-sm mt-1 text-justify">
                                                {order.FechaDeCompra}
                                            </p>
                                            <p>
                                                {`User: ${order.NombreCliente}`}
                                            </p>
                                            <p>
                                                {`Deliverer: ${order.NombreRepartidor}`}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            )}
            {showAddProductModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <AddProductModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showAddProductModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showAddStoreModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <AddStoreModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showAddStoreModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showAddEmployeeModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <AddEmployeesModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showAddEmployeeModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showAddDelivererModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <AddDelivererModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showAddDelivererModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showAddProvidersModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <AddProvidersModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showAddProvidersModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showModifyProductModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <ModifyProductModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showModifyProductModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showModifyStoreModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <ModifyStoreModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showModifyStoreModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showModifyEmployeeModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <ModifyEmployeeModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showModifyEmployeeModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showModifyDelivererModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <ModifyDelivererModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showModifyDelivererModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showDeleteProductModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <DeleteProductModal handleCloseModal={handleCloseModal}/>
                </div>

            )}
            {showDeleteProductModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showDeleteStoreModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <DeleteStoreModal handleCloseModal={handleCloseModal}/>
                </div>

            )}
            {showDeleteStoreModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showDeleteEmployeeModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <DeleteEmployeeModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showDeleteEmployeeModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showDeleteDelivererModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <DeleteDelivererModal handleCloseModal={handleCloseModal}/>
                </div>
            )}
            {showDeleteDelivererModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            {showPendingOrderModal && (
                <div
                    className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                    <PendingOrderModal handleCloseModal={handleCloseModal} orderSelected={selectedOrder.NumeroFactura}/>
                </div>
            )}
            {showPendingOrderModal && (
                <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
            )}
            <button
                onClick={handleLogOut}>
                <IoExitOutline className={"absolute left-5 top-5 text-3xl text-white duration-500 transition-transform transform hover:scale-125 rotate-180"}/>
            </button>
        </>
    );
}

export default Admin;