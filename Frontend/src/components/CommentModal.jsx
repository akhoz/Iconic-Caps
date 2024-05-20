import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import InteractiveStars from "./InteractiveStars.jsx";
import { useState } from "react";

function CommentModal(props) {
    const [rating, setRating] = useState(0);
    const [absoluteRating, setAbsoluteRating] = useState(0);

    const handleHover = (stars) => {
        setRating(stars);
    };

    const handleClick = (stars) => {
        setAbsoluteRating(absoluteRating === stars ? 0 : stars);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-20 relative" data-aos="zoom-in">
            <h1 className="text-2xl font-bold">
                Write Your Comment
            </h1>
            <div className="flex flex-row justify-center items-center relative text-2xl" onMouseLeave={() => setRating(0)}>
                <InteractiveStars rating={rating} absoluteRating={absoluteRating} />
                <div className="flex flex-row absolute z-10 w-full opacity-0">
                    {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                            key={stars}
                            className="w-1/5"
                            onMouseEnter={() => handleHover(stars)}
                            onClick={() => handleClick(stars)}
                        >
                            {stars}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose />
            </button>
        </div>
    );
}

CommentModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default CommentModal;
