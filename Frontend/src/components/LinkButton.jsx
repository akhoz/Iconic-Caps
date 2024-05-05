import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton (props) {
    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
       <div className={`flex rounded-full ${props.bgColor} text-center justify-center w-fit px-5 py-2`}>
           <Link
               to={props.href}
               onClick={handleButtonClick}
               className={`${props.textColor} text-xs`}
           >
               {props.text}
           </Link>
       </div>
    );
}

LinkButton.propTypes = {
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string
};

export default LinkButton;