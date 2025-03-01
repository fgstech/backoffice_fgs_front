import React from "react";
import './style.css';

const StatsCard = ({ title, value, icon, trend }) => {
    return (
        <div className="stats-card">
            <div className="stats-content">
                <span className="stats-title">{title}</span>
                <span className="stats-value">{value}</span>
                <div className={`stats-trend ${trend >= 0 ? "positive" : "negative"}`}>
                    {trend !== undefined && (
                        <>{trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%</>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
