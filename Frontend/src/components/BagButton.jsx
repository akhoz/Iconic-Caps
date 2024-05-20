import PropTypes from "prop-types";

function BagButton(props) {
    return (
        <button
            className={`flex w-full items-center justify-center bg-black rounded-xl duration-500 text-white
            ${props.outStock ? 'hover:bg-white hover:text-black hover:border hover:border-black' : 'hover:bg-red-500'}`}>
            <p className="text-md px-2 py-1">
                Add to Bag
            </p>
        </button>
    )
}

BagButton.propTypes = {
    outStock: PropTypes.bool,
    notLoggedIn: PropTypes.bool
}

export default BagButton;