import {Link} from "react-router-dom";
import NoOrders from "../components/NoOrders.jsx";
import {useUser} from "../contexts/UserContext.jsx";
import UserComments from "../components/UserComments.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import {useState} from "react";

function Account() {
    const { user, logOut } = useUser();

    const handleLogOutClick = () => {
        logOut();
    }

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalButtonText, setModalButtonText] = useState("");

    const handleClickComment = () => {
        setShowModal(true);
        setModalTitle("Are you sure you want to delete this comment?");
        setModalDescription("This action cannot be undone. Your comment will be permanently deleted.");
        setModalButtonText("Delete Comment");
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDeleteAccount = () => {
        setShowModal(true);
        setModalTitle("Are you sure you want to delete your account?");
        setModalDescription("This action cannot be undone. Your account will be permanently deleted.");
        setModalButtonText("Delete Account");
    }
    return (
        <>
              <div className="flex flex-col w-full" data-aos="fade-up">
                  <div className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
                      <h1 className="text-5xl text-center text-white z-10">
                          {user.Usuario}
                      </h1>
                      <div className="absolute inset-0 bg-black opacity-70"></div>
                  </div>
                  <div className="flex flex-col justify-between items-center w-full py-6 bg-black text-white text-md space-y-5 md:px-14 md:space-y-0 md:flex-row lg:px-20 xl:px-40">
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
                      <Link
                          to="/"
                          onClick={handleLogOutClick}
                          className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                          Log Out
                      </Link>
                      <button
                          className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125"
                          onClick={handleDeleteAccount}>
                          Delete Account
                      </button>
                  </div>
                  <NoOrders/>
                  <UserComments handleClickComment={handleClickComment}/>
              </div>
                {showModal && (
                    <div className="fixed z-50 inset-0 flex items-center m-5 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none lg:m-0">
                        <DeleteModal
                            modalTitle={modalTitle}
                            modalDescription={modalDescription}
                            modalButtonText={modalButtonText}
                            handleCloseModal={handleCloseModal}
                        />
                    </div>

                )}
                {showModal && (
                    <div className="fixed inset-0 w-full h-screen bg-black z-30 opacity-80"></div>
                )}
        </>
    );
}

export default Account;

