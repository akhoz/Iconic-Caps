import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton (props) {
    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Link
            className={`flex rounded-full ${props.bgColor} text-center justify-center w-fit px-8 py-2 transition-transform transform hover:scale-105`}
            to={props.href}>
           <div onClick={handleButtonClick} className={`${props.textColor} text-xs lg:text-lg`}>
               {props.text}
           </div>
        </Link>
    );
}

LinkButton.propTypes = {
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string
};

export default LinkButton;