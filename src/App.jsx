/* eslint-disable react/prop-types */
import {useState} from "react";
import axios from "axios";

function SearchBar({onLocationSubmit}) {
  const [location, setLocation] = useState("");

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    onLocationSubmit(location);
  };

  return (
    <form onSubmit={handleLocationSubmit} className="relative w-full h-10 rounded-xl flex items-center">
      <i className="bx bxs-map absolute left-2 text-xl"></i>
      <input
        type="text"
        placeholder="Enter your location"
        className="absolute w-full h-full bg-transparent border-[1px] border-solid border-white outline-none rounded-lg text-base text-white font-medium uppercase pt-4 pb-4 pl-10 placeholder:capitalize placeholder:text-white"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="bx bx-search absolute right-1 -top-3 w-8 h-full bg-transparent border-none outline-none text-2xl pt-4 pb-5 cursor-pointer text-white"
        onClick={handleLocationSubmit}
      ></button>
    </form>
  );
}

function WeatherBox({temperature, weatherDescription, weatherImage, isSubmitted}) {
  return (
    <div className={`text-center items-center mt-4 ${isSubmitted ? "animate-slideDown" : ""}`}>
      <div>
        <div>
          <div className="text-center flex justify-center items-center flex-col">
            <img src={weatherImage} alt="weather" className="w-4/5" />
            <p className="relative text-5xl font-bold mt-3 mb-2 -ml-7">
              {Math.round(temperature)}
              <span className="absolute text-2xl ml-1">°C</span>
            </p>
            <p className="text-xl font-medium capitalize">{weatherDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherDetail({humidity, windSpeed, isSubmitted}) {
  return (
    <div className="relative -bottom-6 weather-details mt-4 left-3.5 w-1/2 flex">
      <div className="flex w-full">
        <i className="bx bx-water text-4xl mr-2"></i>
        <div>
          <div className={`${isSubmitted ? "animate-slideDown" : ""} h-5`}>
            <span className="inline-block text-xs font-semibold">{humidity}%</span>
          </div>
          <div className="text-xs font-semibold">Humidity</div>
        </div>
      </div>
      <div className="flex items-center pl-5 mt-0.5">
        <i className="bx bx-wind text-4xl mr-2"></i>
        <div className="flex flex-col items-start w-20">
          <div className={`flex justify-start ${isSubmitted ? "animate-slideDown" : ""}`}>
            <span className="inline-block text-xs font-semibold">{windSpeed} km/h</span>
          </div>
          <div className="text-xs font-semibold">Wind Speed</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);
  const [error, setError] = useState(null);
  const [sizeBox, setSizeBox] = useState("75px");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const API_KEY = "2e1d81ea74dd30e73f148d6ed489c096";

  const fetchWeatherData = async (location) => {
    try {
      setIsSubmitted(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );

      const {main, weather} = response.data;
      const temperature = main.temp;
      const weatherDescription = weather[0].description;
      const humidity = main.humidity;
      const windSpeed = response.data.wind.speed;

      setWeatherData({
        temperature,
        weatherDescription,
        humidity,
        windSpeed
      });

      switch (weather[0].main) {
        case "Clear":
          setWeatherImage("./assets/clear.png");
          break;
        case "Rain":
          setWeatherImage("./assets/rain.png");
          break;
        case "Snow":
          setWeatherImage("./assets/snow.png");
          break;
        case "Clouds":
          setWeatherImage("./assets/cloud.png");
          break;
        case "Mist":
        case "Haze":
          setWeatherImage("./assets/mist.png");
          break;
        default:
          setWeatherImage("./assets/cloud.png");
      }

      setError(null);
      setSizeBox("430px");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Oops! Location not found!");
      setSizeBox("300px");
    } finally {
      setTimeout(() => {
        setIsSubmitted(false);
      }, 1200);
    }
  };

  return (
    <div
      className="box container w-72 bg-slate-900 rounded-xl p-4 opacity-80 transition-all duration-500 ease-in-out"
      style={{height: sizeBox}}
    >
      <SearchBar onLocationSubmit={fetchWeatherData} />
      {error && (
        <div className="w-full text-center mt-4 flex justify-center">
          <div className="w-52">
            <img src="./assets/404.png" alt="not-found" />
            <p className="text-[0.9rem] font-semibold mt-4">{error}</p>
          </div>
        </div>
      )}
      {weatherData && !error && (
        <>
          <WeatherBox
            temperature={weatherData.temperature}
            weatherDescription={weatherData.weatherDescription}
            weatherImage={weatherImage}
            isSubmitted={isSubmitted}
          />
          <WeatherDetail
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            isSubmitted={isSubmitted}
          />
        </>
      )}
    </div>
  );
}
