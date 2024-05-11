import PropTypes from "prop-types";

function BagButton(props) {
    return (
        <button
            className={`flex w-full items-center justify-center bg-black rounded-xl
            ${props.outStock ? 'transition-transform transform hover:scale-105 md:hover:scale-110' : 'duration-300 hover:bg-red-500'}`}>
            <p className="text-white text-md px-2 py-1">
                Add to Bag
            </p>
        </button>
    )
}

BagButton.propTypes = {
    outStock: PropTypes.bool
}

export default BagButton;