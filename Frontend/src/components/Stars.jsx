import PropTypes from 'prop-types';
import { IoStarSharp } from "react-icons/io5";
import { RiStarSLine } from "react-icons/ri";

function Stars(props) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < props.rating) {
            stars.push(<IoStarSharp key={i} />);
        } else {
            stars.push(<RiStarSLine key={i} />);
        }
    }
    return (
        <div className="flex flex-row text-yellow-300">
            {stars}
        </div>
    );
}

Stars.propTypes = {
    rating: PropTypes.number
}

export default Stars;