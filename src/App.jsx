import { useState, useEffect } from "react";
import axios from "axios";
import { FaSyncAlt, FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import ForecastCard from "./components/ForecastCard";

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const env = await import.meta.env;
const API_KEY = (env.VITE_WEATHER_API_KEY);

function App(){
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(savedHistory);
  },[]);

  const fetchWeather = async (searchCity) => {
    if (!searchCity) {
      setError("Please enter a city before refreshing.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherResponse.data);
      setCity(searchCity);
      fetchForecast(searchCity);
      updateHistory(searchCity);
    } catch (err) {
      setError(err.response?.status === 404 ? "City not found." : "API error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (searchCity) => {
    try {
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastResponse.data);
    } catch (err) {
      console.error("Forecast API Error:", err);
    }
  };

  const updateHistory = (searchCity) => {
    let updatedHistory = [searchCity, ...history.filter((c) => c!==searchCity)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setSidebarOpen(false);
  };

  const closeSidebar = (e) => {
    if (e.target.id === "sidebar-overlay") {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex flex-col items-center p-5 relative`}>
      {sidebarOpen && <div id="sidebar-overlay" className="fixed inset-0 bg-black bg-opacity-50" onClick={closeSidebar}></div>}
      
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:hidden`}> 
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-2xl">
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <button onClick={toggleTheme} className="bg-blue-500 px-4 py-2 rounded w-full">{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>
      
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 text-2xl lg:hidden">
          <FaBars />
        </button>
      )}

      <button onClick={toggleTheme} className="absolute top-4 right-4 px-4 py-2 rounded bg-blue-500 text-white shadow-lg hidden lg:block">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>

      <div className="flex gap-2 w-full max-w-md justify-center items-center">
        <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
        <button onClick={() => fetchWeather(city)} className="px-4 py-2 rounded bg-green-500 text-white flex items-center">
          <FaSyncAlt />
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
          <div className="flex gap-2 flex-wrap">
            {history.map((c, index) => (
              <button key={index} onClick={() => fetchWeather(c)} className="bg-blue-600 px-3 py-1 rounded text-white">
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loader />}
      {error && <ErrorMsg message={error} />}
      {weather && !error && <CurrentWeather weather={weather} darkMode={darkMode} />}
      {forecast && !error && <ForecastCard forecast={forecast} darkMode={darkMode} />}
    </div>
  );
}

export default App;