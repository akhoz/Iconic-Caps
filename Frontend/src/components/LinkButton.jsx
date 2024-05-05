import PropTypes from 'prop-types';

function LinkButton (props) {
    return (
       <div className={`flex rounded-full ${props.bgColor} text-center justify-center w-fit px-5 py-2`}>
           <a
               href={props.href}
               className={`${props.textColor} text-xs`}
           >
               {props.text}
           </a>
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