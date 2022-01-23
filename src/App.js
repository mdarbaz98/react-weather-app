import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = "f6aa3289ab63b789a1410c33ff5042ba";
  const baseUrl = "https://api.openweathermap.org/data/2.5/";
  const [inputValue, setInputValue] = useState("Mumbai");
  const [data, setData] = useState(null);

  const getWeather = () => {
    axios
      .get(`${baseUrl}weather?q=${inputValue}&units=metric&appid=${apiKey}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        // console.log("error", err);
      });
  };

  useEffect(() => {
    getWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data ? (
    <div
      id="App"
      className={
        data.main.temp < 10
          ? "cloud"
          : data.main.temp < 20
          ? "clear"
          : data.main.temp < 30
          ? "haze"
          : "sunny"
      }
    >
      <div className="glass-card">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />
          <button onClick={getWeather}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <h2>{data.name}</h2>
        <div>
          <p className="temp">{Math.round(data.main.temp)}°</p>
          <p className="sub-title">
            Feels Like {Math.round(data.main.feels_like)}°
          </p>
        </div>
        <span>{data.weather[0].main}</span>
      </div>
    </div>
  ) : (
    <div className="something" alt="something-went-wrong"></div>
  );
}

export default App;
