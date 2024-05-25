import axios from "axios";
import { useState, useEffect } from "react";
import {Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend} from "recharts";

const COLORS = ['#FFA07A', '#6A5ACD', '#20B2AA'];

function OrdersStatusChart() {
    const ordersURI = 'http://localhost:8000/envioxpedido';

    const [orders, setOrders] = useState([]);
    const [ordersStatus, setOrdersStatus] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const res = await axios.get(ordersURI);
            console.log(res.data);
            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (orders.length > 0) {
            const ordersData = [
                { status: "Delivered", quantity: orders.filter(order => order.Estado === "Entregado").length },
                { status: "Pending", quantity: orders.filter(order => order.Estado === "En proceso").length },
                { status: "Canceled", quantity: orders.filter(order => order.Estado === "Cancelado").length }
            ];
            setOrdersStatus(ordersData);
        }
    }, [orders]);

    const customTooltip = ({ active, payload }) => {

        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-lg">
                    <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col w-1/2 full justify-center items-center">
            <h1 className="font-bold text-xl">
                Orders Status Chart
            </h1>
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart width={800} height={800}>
                    <Pie
                        data={ordersStatus}
                        dataKey="quantity"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        isAnimationActive={true}
                        animationDuration={1500}
                    >
                        {ordersStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={customTooltip} />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default OrdersStatusChart;
