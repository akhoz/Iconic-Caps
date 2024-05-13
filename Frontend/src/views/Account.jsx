import {Link} from "react-router-dom";
import NoOrders from "../components/NoOrders.jsx";

function Account() {
    return (
          <div className="flex flex-col" data-aos="fade-up">
              <div className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
                  <h1 className="text-5xl text-center text-white z-10">
                      Username
                  </h1>
                  <div className="absolute inset-0 bg-black opacity-70"></div>
              </div>
              <div className="flex flex-col justify-between items-center w-full py-6 px-20 bg-black text-white text-md space-y-5 lg:space-y-0 lg:flex-row">
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
                  <button className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                      Log Out
                  </button>
                  <button className="duration-500 transition-transform transform hover:scale-110 lg:hover:scale-125">
                      Delete Account
                  </button>
              </div>
              <NoOrders/>
          </div>
    );
}

export default Account;

