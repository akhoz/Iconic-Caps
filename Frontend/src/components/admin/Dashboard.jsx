import ProductsRatingChart from "./charts/ProductsRatingChart.jsx";
import OrdersStatusChart from "./charts/OrdersStatusChart.jsx";
import ProductsPurchasedChart from "./charts/ProductsPurchasedChart.jsx";

function Dashboard() {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center lg:my-60 xl:my-48">
            <h1 className="font-bold text-2xl mb-20">
                Dashboard
            </h1>
            <div className="flex flex-row w-full h-full">
                <ProductsRatingChart/>
                <OrdersStatusChart/>
            </div>
            <div className="w-full h-full mt-20">
                <ProductsPurchasedChart/>
            </div>
        </div>
    );
}

export default Dashboard;