import ProductsRatingChart from "./charts/ProductsRatingChart.jsx";
import OrdersStatusChart from "./charts/OrdersStatusChart.jsx";
import ProductsPurchasedChart from "./charts/ProductsPurchasedChart.jsx";

function Dashboard() {
    return (
        <div className="flex flex-col w-full h-screen mt-24 justify-center items-center">
            <h1 className="font-bold text-2xl mb-20">
                Dashboard
            </h1>
            <div className="flex flex-row w-full h-full" data-aos="fade-up">
                <ProductsRatingChart />
                <OrdersStatusChart />
            </div>
            <div className="w-full h-full" data-aos="fade-up">
                <ProductsPurchasedChart />
            </div>
        </div>
    );
}

export default Dashboard;