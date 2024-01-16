import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { weather_api_key, weather_api_url } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnsearchChange = (searchData) => {
    const [lat,lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );

    const forecastFetch = fetch(
      `${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  // console.log(currentWeather);
  console.log("forecase : ",forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnsearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
