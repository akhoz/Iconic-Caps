import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductsPurchasedChart() {
    const [products, setProducts] = useState([]);
    const [productsChartData, setProductsChartData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/consultas/cantidad-compras-producto');
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (products.length > 0) {
            const chartData = products.map(product => ({
                name: product.ModeloProducto,
                timesPurchased: product.cantidad_compras
            }));
            setProductsChartData(chartData);
        }
    }, [products]);

    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-lg">
                    <p>{`${payload[0].name}: ${payload[0].value} times purchased`}</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="font-bold text-xl mb-10">
                Products Purchased
            </h1>
            <BarChart
                width={1000}
                height={300}
                data={productsChartData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={customTooltip}/>
                <Legend />
                <Bar dataKey="timesPurchased" name="Products" fill="#15607a" />
            </BarChart>
        </div>
    );
}

export default ProductsPurchasedChart;
