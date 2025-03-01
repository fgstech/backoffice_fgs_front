import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const PieChart = ({ data, title }) => {
    if (!data || Object.keys(data).length === 0 || !data["datasets"]) return <p>No hay datos disponibles...</p>;

    const options = {
        plugins: {
            legend: {
                position: "bottom" // 📌 Mueve la leyenda debajo del gráfico
            }
        }
    };

    return (
        <div>
            <h6>{title}</h6>
            <Pie data={data} height={40} options={options}/>
        </div>
    );
};

export default PieChart;