const CurrentWeather = ({ weather, darkMode }) => {
  return(
    <div className={`mt-5 p-6 rounded-lg shadow-lg text-center ${darkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-white"}`}>
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" className="mx-auto" />
      <p className="text-xl">{weather.main.temp}°C - {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} km/h</p>
    </div>
  );
};

export default CurrentWeather;