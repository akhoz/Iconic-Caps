import { useUser } from "../contexts/UserContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";

import AddProductModal from "../components/admin/AddProductModal.jsx";
import AddStoreModal from "../components/admin/AddStoreModal.jsx";
import AddEmployeesModal from "../components/admin/AddEmployees.Modal.jsx";
import AddDelivererModal from "../components/admin/AddDelivererModal.jsx";

import DeleteProductModal from "../components/admin/DeleteProductModal.jsx";
import DeleteStoreModal from "../components/admin/DeleteStoreModal.jsx";
import DeleteEmployeeModal from "../components/admin/DeleteEmployeeModal.jsx";
import DeleteDelivererModal from "../components/admin/DeleteDelivererModal.jsx";

function Admin() {
    const { user, logOut } = useUser();
    const navigate = useNavigate();
    const [showFeatures, setShowFeatures] = useState(false);

    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showAddStoreModal, setShowAddStoreModal] = useState(false);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showAddDelivererModal, setShowAddDelivererModal] = useState(false);

    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showDeleteStoreModal, setShowDeleteStoreModal] = useState(false);
    const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
    const [showDeleteDelivererModal, setShowDeleteDelivererModal] = useState(false);

    const handleFeatures = () => {
        setShowFeatures(!showFeatures);
        if (!showFeatures) {
            window.scrollBy({ top: 110, behavior: 'smooth' });
        } else {
            window.scrollBy({ top: -110, behavior: 'smooth' });
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

        setShowDeleteProductModal(false);
        setShowDeleteStoreModal(false);
        setShowDeleteEmployeeModal(false);
        setShowDeleteDelivererModal(false);
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
                        </div>
                    )}
                    {showFeatures && (
                        <div
                            className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
                            data-aos="fade-down">
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Modify Products
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Modify Stores
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Modify Employees
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Modify Deliverers
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
                        </div>
                    )}
                    <div className="flex items-center justify-center bg-white h-screen w-full">
                        Dashboard Here
                    </div>
                    <div className="flex items-center justify-center bg-black h-screen w-full text-white">
                        Orders Management Here
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
            <button
                onClick={handleLogOut}>
                <IoExitOutline className={"absolute left-5 top-5 text-3xl text-white duration-500 transition-transform transform hover:scale-125 rotate-180"}/>
            </button>
        </>
    );
}

export default Admin;