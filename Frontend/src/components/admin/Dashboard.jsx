import ProductsRatingChart from "./charts/ProductsRatingChart.jsx";
import OrdersStatusChart from "./charts/OrdersStatusChart.jsx";
import ProductsPurchasedChart from "./charts/ProductsPurchasedChart.jsx";

import axios from "axios";

function Dashboard() {

    const handleDownloadReport = async () => {
        try {
            const res = await axios.get("http://localhost:8000/consultas/generar-pdf-vista", {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'VistaDatos.pdf');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center lg:mt-60 lg:mb-40 xl:mt-48 xl:mb-36">
            <h1 className="font-bold text-2xl mb-20">
                Dashboard
            </h1>
            <div className="flex flex-row w-full h-full">
                <ProductsRatingChart/>
                <OrdersStatusChart/>
            </div>
            <div className="w-full h-full mt-20 mb-10">
                <ProductsPurchasedChart/>
            </div>
            <div className="flex w-full items-end justify-end mr-20">
                <button className="bg-black text-white py-2 px-3 rounded-lg duration-500 hover:bg-white hover:text-black hover:border hover:border-black"
                    onClick={handleDownloadReport}>
                    Download Report
                </button>
            </div>
        </div>
    );
}

export default Dashboard;