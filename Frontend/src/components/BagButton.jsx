
function BagButton() {
    return (
        <button className="flex w-full items-center justify-center bg-black rounded-xl transition-transform transform hover:scale-105 md:hover:scale-110">
            <p className="text-white text-md px-2 py-1">
                Add to Bag
            </p>
        </button>
    )
}

export default BagButton;