import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LiaShoppingBagSolid } from "react-icons/lia";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };
    return (
        <header className="bg-white py-5">
            <div className="container mx-auto pr-4">
                <div className="flex items-center justify-between h-16">
                    <div className="">
                        <img src="/img/iconic-caps-logo.png" alt="Iconic Caps" className="h-24" />
                    </div>
                    <div className="hidden md:block">
                        <nav>
                            <ul className="flex justify-center items-center space-x-4">
                                <Link to="/" onClick={handleButtonClick} className="text-black">Home</Link>
                                <Link to="/Shop" onClick={handleButtonClick} className="text-black">Shop</Link>
                                <Link to="/About" onClick={handleButtonClick} className="text-black">About</Link>
                                <Link to="/LogIn" onClick={handleButtonClick} className="text-black">Log In</Link>
                                <Link to="/OurTeam" onClick={handleButtonClick} className="text-black">Our Team</Link>
                            </ul>
                        </nav>
                    </div>
                    <div className="hidden md:block">
                        <LiaShoppingBagSolid className="text-black h-10 w-10" />
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="block text-black focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="flex flex-col justify-center items-center md:hidden bg-white mt-5 text-center">
                    <ul className="flex flex-col space-y-2">
                        <Link to="/" onClick={() => { handleButtonClick(); handleLinkClick(); }} className="text-black">Home</Link>
                        <Link to="/Shop" onClick={() => { handleButtonClick(); handleLinkClick(); }} className="text-black">Shop</Link>
                        <Link to="/About" onClick={() => { handleButtonClick(); handleLinkClick(); }} className="text-black">About</Link>
                        <Link to="/LogIn" onClick={() => { handleButtonClick(); handleLinkClick(); }} className="text-black">Log In</Link>
                        <Link to="/OurTeam" onClick={() => { handleButtonClick(); handleLinkClick(); }} className="text-black">Our Team</Link>
                    </ul>
                    <LiaShoppingBagSolid className="text-black h-6 w-6 mt-2"/>
                </div>
            )}
        </header>
    );
}

export default Header;
