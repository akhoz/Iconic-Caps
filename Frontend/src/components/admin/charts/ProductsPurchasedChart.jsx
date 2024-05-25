import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import axios from "axios";

function ProductsPurchasedChart() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/productos')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="w-full">
            <h3>Products Purchased</h3>
            <BarChart
                width={500}
                aspect={2}
                data={products}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchased" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default ProductsPurchasedChart;