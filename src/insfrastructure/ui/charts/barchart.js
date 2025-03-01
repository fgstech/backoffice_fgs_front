import React from "react";
import { Bar} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const BarChart = ({ data, title, height = 60, legendPosition = "top" }) => {
    if (!data || Object.keys(data).length === 0 || !data["datasets"]) return <p>No hay datos disponibles...</p>;

    const options = {
        plugins: {
            legend: {
                position: legendPosition // 📌 Mueve la leyenda debajo del gráfico
            }
        }
    };

    return (
        <div>
            <h6>{title}</h6>
            <Bar data={data} height={height} options={options}/>
        </div>
    );
};


export default BarChart;