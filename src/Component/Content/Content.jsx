import React, { useEffect, useState } from "react";
import "./Content.css";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";

export default function Content() {
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [data, setData] = useState();
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const location = useParams();
  const [barData, setBarData] = useState([]);
  console.log(location.name);
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
      console.log(import.meta.env.REACT_APP_API);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            location.name
          }&appid=${import.meta.env.VITE_API_KEY}`
        );
        const weatherData = await res.json();
        console.log(weatherData);
        console.log("Fetched Weather Data:", weatherData);

        if (weatherData && weatherData.main) {
          const tempValue = weatherData.main.temp - 273.15;
          const tempValue2 = tempValue.toFixed(2);
          const humValue = weatherData.main.humidity;

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
  }, []);

  const defaultWeatherData = {
    temperature: "20 °C",
    wind: "10 km/h",
    description: "Clear",
    forecast: [
      { day: 1, temperature: 30, wind: 12 },
      { day: 2, temperature: 25, wind: 10 },
      { day: 3, temperature: 28, wind: 15 },
      { day: 4, temperature: 20, wind: 18 },
      { day: 5, temperature: 22, wind: 12 },
      { day: 6, temperature: 26, wind: 14 },
      { day: 7, temperature: 30, wind: 15 },
      { day: 8, temperature: 20, wind: 18 },
      { day: 9, temperature: 28, wind: 15 },
      { day: 10, temperature: 20, wind: 18 },
    ],
  };

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 30;
  defaults.plugins.title.color = "black";

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // Reload the page every 30 seconds
    }, 30000); // 30 seconds = 30000 ms

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
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
              <h3>{location.name}</h3>
            </div>
          </div>
        </div>
        <div className="gauge">
          <div className="gauge-box">
            <Doughnut
              data={{
                labels: ["Temperature(°C)", "Humidity(%)"],
                datasets: [
                  {
                    label: ["Weather"],
                    data: [temp, humidity],
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Weather Report",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="second-row">
        <div className="line">
          <div
            className="line-box"
            style={{
              height: "700px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Line
              data={{
                labels: defaultWeatherData.forecast.map((e) => e.day),
                datasets: [
                  {
                    label: "Temperature",
                    data: defaultWeatherData.forecast.map((e) => e.temperature),
                    backgroundColor: "#064ff0",
                    borderColor: "#064ff0",
                  },
                  {
                    label: "Wind",
                    data: defaultWeatherData.forecast.map((e) => e.wind),
                    backgroundColor: "#ff3030",
                    borderColor: "#ff3030",
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Default Weather Report",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
