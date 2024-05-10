import CheckoutProduct from "../components/CheckoutProduct.jsx";

function Checkout() {
    return (
        <div className="flex flex-col items-center justify-center my-24">
            <h1 className="text-black font-bold text-3xl">
                Your Bag
            </h1>
            <CheckoutProduct/>
        </div>
    );
}

export default Checkout;