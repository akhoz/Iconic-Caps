import {Link} from "react-router-dom";
import NoOrders from "../components/NoOrders.jsx";
import {useUser} from "../contexts/UserContext.jsx";
import UserComments from "../components/UserComments.jsx";

function Account() {
    const { user, logOut } = useUser();

    const handleLogOutClick = () => {
        logOut();
    }

    return (
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
                  <button className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                      Delete Account
                  </button>
              </div>
              <NoOrders/>
              <UserComments/>
          </div>
    );
}

export default Account;

