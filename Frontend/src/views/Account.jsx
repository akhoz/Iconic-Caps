import {Link, useNavigate} from "react-router-dom";
import NoOrders from "../components/NoOrders.jsx";
import {useUser} from "../contexts/UserContext.jsx";
import UserComments from "../components/UserComments.jsx";
import DeleteAccountModal from "../components/DeleteAccountModal.jsx";
import DeleteCommentModal from "../components/DeleteCommentModal.jsx";
import {useState} from "react";
import Order from "../components/Order.jsx";

function Account() {
    const { user, logOut } = useUser();

    const navigate = useNavigate();

    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalButtonText, setModalButtonText] = useState("");

    const handleLogOutClick =  () => {
        logOut();
        navigate('/');
        window.location.reload();
    }

    const handleCloseModal = () => {
        setShowAccountModal(false);
        setShowCommentModal(false);
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

    return (
        <>
            <div className="flex flex-col w-full items-center justify-center" data-aos="fade-up">
                <div className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
                    <h1 className="text-5xl text-center text-white z-10">
                        {user.Usuario}
                    </h1>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div
                    className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40">
                    <button className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                        Modify Username
                    </button>
                    <button className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
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
                <NoOrders/>
                <div className="flex flex-col items-center justify-center w-10/12 mt-20">
                    <h1 className="text-2xl font-bold mb-14">
                        Your Orders
                    </h1>
                    <div className="flex flex-row justify-between w-full font-bold">
                        <p>
                            Products
                        </p>
                        <p>
                            Status
                        </p>
                        <p>
                            Order Number
                        </p>
                        <p>
                            Purchase Date
                        </p>
                        <p>
                            Deliverer
                        </p>
                    </div>
                    <hr className="w-full border-b border-gray-100 xl:mb-8"/>
                </div>
                <Order
                    model={'AD5'}
                    quantity={2}
                    status={'Pending'}
                    orderNumber={123456}
                    purchaseDate={'01/01/2022'}
                    deliverer={'Messi Rondaldo Mbappe'}
                />
                <UserComments handleClickComment={handleClickComment}/>
            </div>
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
        </>
    );
}

export default Account;

