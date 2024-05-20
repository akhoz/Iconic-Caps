import PropTypes from 'prop-types';
import { IoStarSharp } from "react-icons/io5";
import { RiStarSLine } from "react-icons/ri";

function InteractiveStars(props) {
    const { rating, absoluteRating } = props;

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (absoluteRating > 0) {
            stars.push(i < absoluteRating ? <IoStarSharp key={i} /> : <RiStarSLine key={i} />);
        } else {
            stars.push(i < rating ? <IoStarSharp key={i} /> : <RiStarSLine key={i} />);
        }
    }

    return (
        <div className="flex flex-row text-yellow-300">
            {stars}
        </div>
    );
}

InteractiveStars.propTypes = {
    rating: PropTypes.number,
    absoluteRating: PropTypes.number,
};

export default InteractiveStars;
