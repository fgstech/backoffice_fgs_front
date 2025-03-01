import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, title }) => {
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
            <Doughnut data={data} height={60} options={options}/>
        </>
    )
}

export default DoughnutChart;