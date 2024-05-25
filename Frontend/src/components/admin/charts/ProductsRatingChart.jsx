import axios from "axios";
import { useState, useEffect } from "react";
import {Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function ProductsRatingChart() {
    const commentsURI = 'http://localhost:8000/comentarios';

    const [comments, setComments] = useState([]);
    const [productsRating, setProductsRating] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        try {
            const res = await axios.get(commentsURI);
            console.log(res.data);
            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (comments.length > 0) {
            const ratingData = [
                { rating: "1 star", quantity: comments.filter(comment => comment.Estrellas === 1).length },
                { rating: "2 stars", quantity: comments.filter(comment => comment.Estrellas === 2).length },
                { rating: "3 stars", quantity: comments.filter(comment => comment.Estrellas === 3).length },
                { rating: "4 stars", quantity: comments.filter(comment => comment.Estrellas === 4).length },
                { rating: "5 stars", quantity: comments.filter(comment => comment.Estrellas === 5).length }
            ];
            setProductsRating(ratingData);
        }
    }, [comments]);

    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-lg">
                    <p>{`${payload[0].name}: ${payload[0].value} ratings`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col w-1/2 h-1/2 justify-center items-center">
            <h1 className="font-bold text-xl">
                Products Rating Chart
            </h1>
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart width={800} height={800}>
                    <Pie
                        data={productsRating}
                        dataKey="quantity"
                        nameKey="rating"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        isAnimationActive={true}
                        animationDuration={1500}
                    >
                        {productsRating.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={customTooltip} />
                    <Legend className="flex flex-col"/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProductsRatingChart;
