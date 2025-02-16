import React from "react";
import Chart from "react-apexcharts";

const HeatMapChart = ({ data, title, roi }) => {
    const formattedData = data.map((property) => ({
        name: `${property.title} ($${property.price})`, // Include both title & price
        data: [{ x: "ROI", y: Math.round(property.roi) }], // X-axis is constant, Y-axis is ROI
    }));

    const options = {
        chart: {
            type: "heatmap",
            toolbar: { show: false },
            animations: {
                enabled: true,
                easing: "easeinout", // Animation style
                speed: 800, // Duration in milliseconds
                animateGradually: { enabled: true, delay: 100 },
                dynamicAnimation: { enabled: true, speed: 350 },
            },
        },
        dataLabels: {
            enabled: true,
            style: { colors: ["#000"] }, // White text for better visibility
        },
        colors: roi === 'high' ? ["#ff4500", "#ff8c00", "#ff0000"] : ["#001f3f", "#0074cc", "#00aaff"], // 🔥 Fire gradient colors (Red, Orange, Dark Orange) // Adjust color based on ROI intensity
        title: {
            text: title,
        },
        xaxis: {
            categories: roi === 'high' ? ["ROI"] : [...new Set(data.map((property) => property.city.city_name))],
            // categories: ["ROI"],
        },
        tooltip: {
            y: {
                formatter: (val, { seriesIndex, dataPointIndex, w }) => {
                    const price = data[seriesIndex].price;
                    return `ROI: ${val}% | Price: $${price}`;
                },
            },
        },
    };

    return (
        <div>
            <Chart options={options} series={formattedData} type="heatmap" height={350} />
        </div>
    );
};

export default HeatMapChart;
