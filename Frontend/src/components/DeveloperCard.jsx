import PropTypes from "prop-types";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

function DeveloperCard(props) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
        <img className="w-full" src={props.image} alt={props.name}/>
        <div className="px-6 py-10">
            <div className="font-bold text-xl mb-2">{props.name}</div>
            <p className="text-black text-base mb-2">{props.description}</p>
        </div>
        <div className="flex justify-center space-x-4 py-2">
            <a href={props.ig} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-black text-4xl"/></a>
            <a href={props.x} target="_blank" rel="noopener noreferrer"><FaXTwitter className="text-black text-4xl"/></a>
            <a href={props.github} target="_blank" rel="noopener noreferrer"><FaGithub className="text-black text-4xl"/></a>
        </div>
  
    </div>
  );
}

DeveloperCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ig: PropTypes.string.isRequired,
    x: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired
};

export default DeveloperCard;
