import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const Home = () => {
  const [chartData, setChartData] = useState({})
  const chart = () => {
    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      datasets: [
          {
            label: "level of thiccness",
            data: [35, 45, 12, 76, 69],
            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
            borderWidth: 4
          }
      ]
    })
  }
  useEffect(() => {
    chart();
  }, []);
  return (
    <div style={{ marginTop: '20px' }}>
      <h1>Home Page</h1>
      <div style={{height:"500px", width: "500px", marginRight: "20px"}}>
        <Line data = {chartData} options={{
          responsive: true,
          title: { text: 'Most viewed', display: true},
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          }
        }}></Line>
      </div>
    </div>
  );
};

export default Home;
