import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = ({ data, title }) => {
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
            <PolarArea data={data} height={40} options={options}/>
        </div>
    );
};

export default PolarChart;