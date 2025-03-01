import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


const RadarChart = ({ data, title }) => {
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
            <Radar data={data} height={60} options={options} />
        </>
    )
}

export default RadarChart;