import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Home = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let issueCount = [];
    let issueName = [];
    axios
      .get("http://localhost:3004/issues")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          issueCount.push(parseInt(dataObj.count));
          issueName.push(dataObj.name);
        }
        setChartData({
          labels: issueName,
          datasets: [
            {
              label: "Most Viewed",
              data: issueCount,
              backgroundColor: ["rgba(80, 190, 192, 0.6)"],
              borderWidth: 6
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(issueCount, issueName);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App" style= {{marginTop: "20px"}}>
      <h1>Home</h1>
      <div style = {{height: "700px", width: "700px", marginLeft: "280px"}}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Most Viewed Issues", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
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
          }}
        />
      </div>
    </div>
  );
};

export default Home;