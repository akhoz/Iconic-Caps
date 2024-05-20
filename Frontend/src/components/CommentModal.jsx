import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import InteractiveStars from "./InteractiveStars.jsx";
import { useState } from "react";
import axios from "axios";

function CommentModal(props) {
    const [rating, setRating] = useState(0);
    const [absoluteRating, setAbsoluteRating] = useState(0);
    const [comment, setComment] = useState("");
    const [invalidComment, setInvalidComment] = useState(false);
    const currentDate = new Date();

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const formattedDate = formatDate(currentDate);
    const formattedTime = formatTime(currentDate);

    const handleHover = (stars) => {
        setRating(stars);
    };

    const handleClick = (stars) => {
        setAbsoluteRating(absoluteRating === stars ? 0 : stars);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        setInvalidComment(false);
    }

    const handleSubmitComment = async () => {
        if (comment === "") {
            setInvalidComment(true);
            return;
        }
        const response = await axios.post(`http://localhost:8000/comentarios`, {
            Estrellas: absoluteRating,
            Comentario: comment,
            Fecha: formattedDate,
            Hora: formattedTime,
            CedulaCliente: props.clientId,
            ModeloProducto: props.model
        });
        console.log(response);
        props.handleCloseModal();
        window.location.reload();
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md py-12 relative w-4/5 md:w-3/4 lg:w-1/2 " data-aos="zoom-in">
            <h1 className="text-2xl font-bold mb-5">
                Write Your Comment
            </h1>
            <div
                className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 w-10/12">
                <textarea id="comment" rows="6"
                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          placeholder="Write here..." required
                          onChange={handleCommentChange}>
                </textarea>
            </div>
            <div className="flex flex-row justify-between items-center w-10/12">
                <div className="flex flex-col">
                    <button className={`bg-black text-white py-3 px-10 rounded-xl mr-5 duration-500
                     ${invalidComment ? 'hover:bg-red-500' : 'hover:bg-white hover:text-black hover:border hover:border-black'}`}
                     onClick={handleSubmitComment}>
                        Submit
                    </button>
                    {invalidComment && (
                        <p className="text-red-500 text-sm mt-3">
                            Please write a comment
                        </p>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center relative text-2xl"
                     onMouseLeave={() => setRating(0)}>
                    <InteractiveStars rating={rating} absoluteRating={absoluteRating}/>
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
            </div>
            <button
                onClick={props.handleCloseModal}
                className="absolute right-5 top-5 text-xl text-black transition-transform transform hover:scale-150">
                <IoClose/>
            </button>
        </div>
    );
}

CommentModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    clientId: PropTypes.number.isRequired,
    model: PropTypes.string.isRequired
};

export default CommentModal;
