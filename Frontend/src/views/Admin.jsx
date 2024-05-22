import { useUser } from "../contexts/UserContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin() {
    const { user, logOut } = useUser();
    const navigate = useNavigate();
    const [showFeatures, setShowFeatures] = useState(false);

    const handleFeatures = () => {
        setShowFeatures(!showFeatures);
    }

    const handleLogOut = () => {
        logOut();
        navigate('/');
    }

    return (
        <>
            {user && (
                <div className="flex flex-col w-full items-center justify-center" data-aos="fade-up">
                    <div className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
                        <h1 className="text-5xl text-center text-white z-10">
                            {user.Usuario}
                        </h1>
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40">
                        <button
                            className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            onClick={handleFeatures}
                        >
                            Display Features
                        </button>
                    </div>
                    {showFeatures && (
                        <div
                            className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
                            data-aos="fade-down">
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125 text-center"
                            >
                                Add Products
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Add Stores
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Add Employees
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Add Deliverers
                            </button>
                        </div>
                    )}
                    {showFeatures && (
                        <div className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
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
                        <div className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40"
                             data-aos="fade-down">
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Delete Products
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Delete Stores
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Delete Employees
                            </button>
                            <button
                                className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                            >
                                Delete Deliverers
                            </button>
                        </div>
                    )}
                </div>
            )}
            <h1>
                a
            </h1>
        </>
    );
}

export default Admin;