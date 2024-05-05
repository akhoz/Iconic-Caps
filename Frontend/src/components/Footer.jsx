import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer () {
    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="flex flex-col bg-black">
            <div className="flex flex-row space-x-3 justify-center pt-5">
                <a
                    className="rounded-full bg-white p-1"
                    href="#">
                    <FaFacebook/>
                </a>
                <a
                    className="rounded-full bg-white p-1"
                    href="#">
                    <FaInstagram/>
                </a>
                <a
                    className="rounded-full bg-white p-1"
                    href="#">
                    <FaXTwitter />
                </a>
                <a
                    className="rounded-full bg-white p-1"
                    href="#">
                    <FaYoutube/>
                </a>
            </div>
            <div className="flex flex-row text-gray-400 text-xs space-x-5 justify-center my-5">
                <Link
                    to="./"
                    onClick={handleButtonClick}>
                    Home
                </Link>
                <Link
                    to="./OurTeam"
                    onClick={handleButtonClick}>
                    Contact Us
                </Link>
                <Link
                    to="./OurTeam"
                    onClick={handleButtonClick}>
                    Our Team
                </Link>
                <Link
                    to="./About"
                    onClick={handleButtonClick}>
                    Work With Us
                </Link>
            </div>
            <div className="flex justify-center mb-5">
                <p className="text-gray-400 text-xs">
                    © 2021 Iconic Caps
                </p>
            </div>
        </footer>
    )
}

export default Footer;