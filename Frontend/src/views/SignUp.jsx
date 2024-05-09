import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

function SignUp () {
    return (
        <div className="flex flex-col mt-20 lg:mt-0 lg:h-screen lg:flex-row">
            <div className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:w-3/4" data-aos="fade-right">
                <img
                    src="/img/iconic-caps-logo.png"
                    alt="iconic-caps-logo"
                    className="w-1/6"/>
                <h1 className="text-4xl font-bold">Sign Up</h1>
                <div className="flex flex-col w-1/3 mt-5">
                    <input
                        type="text"
                        id="text"
                        className="border-0 border-b-2 border-black p-1 my-5 focus:border-b-2 focus:border-black focus:ring-0"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        id="email"
                        className="border-0 border-b-2 border-black p-1 focus:border-b-2 focus:border-black focus:ring-0"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        id="password"
                        className="border-0 border-b-2 border-black p-1 mt-5 focus:border-b-2 focus:border-black focus:ring-0"
                        placeholder="Password"
                    />
                    <div className="flex flex-row items-center my-5">
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="border-1 border-black text-black focus:ring-0"
                        />
                        <p className="text-md text-gray-600 pl-3">
                            I accept the Terms and Conditions
                        </p>
                    </div>
                    <button className="bg-black text-white font-bold p-2 rounded-md mb-5 transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="hidden lg:flex flex-col bg-black justify-center items-center w-1/4">
                <img src="/img/slogan.png" alt="slogan"/>
            </div>
            <Link to="/"
                  className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md transition-transform transform hover:scale-105">
                <FaArrowLeft/>
                <span>Home</span>
            </Link>
        </div>
    )
}

export default SignUp;