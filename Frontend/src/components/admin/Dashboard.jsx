import ProductsRatingChart from "./charts/ProductsRatingChart.jsx";
function Dashboard() {
    return (
        <div className="flex flex-col w-full h-full mt-40">
            <div className="flex flex-row w-full h-full">
                <ProductsRatingChart />
            </div>
        </div>
    );
}

export default Dashboard;