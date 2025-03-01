import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const LineChart = ({ data, title }) => {
    if (!data || Object.keys(data).length === 0 || !data["datasets"]) return <p>No hay datos disponibles...</p>;

    const options = {
        plugins: {
            legend: {
                position: "bottom" // 📌 Mueve la leyenda debajo del gráfico
            }
        }
    };
    

    return (
        <>
            <h6>{title}</h6>
            <Line options={options} data={data} height={60} />;
        </>
    )
}

export default LineChart;