import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

function SignUp () {
    return (
        <div className="flex flex-col lg:h-screen lg:flex-row">
            <div className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:w-3/4">
                <img
                    src="/img/iconic-caps-logo.png"
                    alt="iconic-caps-logo"
                    className="w-1/6"/>
                <h1 className="text-4xl font-bold">Sign Up</h1>
                <div className="flex flex-col w-1/3 mt-5">
                    <input
                        type="text"
                        id="text"
                        className="border-0 border-b-2 border-black p-1 my-5"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        id="email"
                        className="border-0 border-b-2 border-black p-1"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        id="password"
                        className="border-0 border-b-2 border-black p-1 mt-5"
                        placeholder="Password"
                    />
                    <div className="flex flex-row items-center my-5">
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="border-1 border-black"
                        />
                        <p className="text-md text-gray-600 pl-3">
                            I accept the Terms and Conditions
                        </p>
                    </div>
                    <button className="bg-black text-white font-bold p-2 rounded-md mb-5">
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="hidden lg:block flex-col bg-black justify-center pt-28 w-1/4">
                <img src="/img/slogan.png" alt="slogan"/>
            </div>
            <Link to="/"
                  className="flex flex-row items-center space-x-2 absolute top-0 left-0 ml-4 mt-4 text-black font-bold text-md">
                <FaArrowLeft/>
                <span>Home</span>
            </Link>
        </div>
    )
}

export default SignUp;