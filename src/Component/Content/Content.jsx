import React, { useEffect, useState } from "react";
import "./Content.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Content() {
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [location, setLocation] = useState("delhi");
  
  const [data, setData] = useState();
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  useEffect(() => {
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setCurrentDate(date);
    setCurrentTime(time);
  }, [currentDate, currentTime]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=f9630868795bd2c1c1f97a378f7af746`
        );
        const weatherData = await res.json();

        console.log("Fetched Weather Data:", weatherData);

        // Safely access weather data before setting state
        if (weatherData && weatherData.main) {
          const tempValue = weatherData.main.temp - 273.15; // Convert Kelvin to Celsius
          const tempValue2 = tempValue.toFixed(2); // Limit to 2 decimals
          const humValue = weatherData.main.humidity;

          // Update states with fetched data
          setData(weatherData);
          setTemp(tempValue2);
          setHumidity(humValue);

          console.log("Temperature:", tempValue2, "°C");
          console.log("Humidity:", humValue, "%");
        } else {
          console.error("Invalid weather data:", weatherData);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array ensures fetch only happens once


  return (
    <div className="content">
      <div className="first-row">
        <div className="time-location">
          <div className="time data-box">
            <div className="title">
              <i className="bx bx-time-five"></i>
              <h6>Time</h6>
            </div>
            <div className="details">
              <h3>{currentTime}</h3>
              <h4>{currentDate}</h4>
            </div>
          </div>
          <div className="location data-box">
            <div className="title">
              <i className="bx bx-map"></i>
              <h6>Location</h6>
            </div>
            <div className="details">
              <h3>{location}</h3>
            </div>
          </div>
        </div>
        <div className="gauge">
          <div className="gauge-box" style={{height:"300px",width:"300px"}}>
          <Doughnut
          data={{
            labels:["Temperature(°C)","Humidity(%)"],
            datasets:[{
                label:["Weather"],
                data:[temp,humidity]
                
            }]
          }}
          />
          </div>
        </div>
      </div>
      <div className="second-row">
      <div className="line">
      <div className="line-box" style={{height:"700px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Line
  data={{
    labels: [temp],  // Use temperature for the x-axis labels (e.g., current temperature)
    datasets: [
      {
        label: "Temperature (°C)",  // Label for temperature
        data: [temp],  // Temperature data (converted to Celsius)
        backgroundColor: "#064ff0",  // Line color for temperature
        borderColor: "#064ff0",  // Border color for temperature line
        fill: false,  // Don't fill the area under the line
        tension: 0.1,  // Optional smooth curve for the temperature line
        pointRadius: 5,  // Size of the temperature data point
        pointBackgroundColor: "#064ff0",  // Color of temperature data points
        pointBorderColor: "#ffffff",  // Border color for temperature points
        pointBorderWidth: 2,  // Border width for temperature points
        borderWidth: 2,  // Line border width for temperature
      },
      {
        label: "Humidity (%)",  // Label for humidity
        data: [humidity],  // Humidity data
        backgroundColor: "#ff3030",  // Line color for humidity
        borderColor: "#ff3030",  // Border color for humidity line
        fill: false,  // Don't fill the area under the line
        tension: 0.1,  // Optional smooth curve for the humidity line
        pointRadius: 5,  // Size of the humidity data point
        pointBackgroundColor: "#ff3030",  // Color of humidity data points
        pointBorderColor: "#ffffff",  // Border color for humidity points
        pointBorderWidth: 2,  // Border width for humidity points
        borderWidth: 2,  // Line border width for humidity
      }
    ]
  }}
  options={{
    scales: {
      x: {
        min: 0,  // Set min value for x-axis based on temperature
        max: 100,  // Set max value for x-axis based on temperature
        title: {
          display: true,
          text: 'Temperature (°C)'          
        },
        ticks: {
          stepSize: 10,  // Optional: Set step size for y-axis
        },
      },
      y: {
        min: 0,  // Min value for y-axis (humidity percentage range)
        max: 100,  // Max value for y-axis (humidity percentage)
        ticks: {
          stepSize: 10,  // Optional: Set step size for y-axis
        },
        title: {
          display: true,
          text: 'Humidity (%)',  // Label for y-axis
        },
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',  // Position of the legend
      },
    }
  }}
/>


      </div>
      </div>
      </div>
    </div>
  );
}
