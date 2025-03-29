const ForecastCard = ({ forecast, darkMode }) => {
  const dailyForecast = [];
  const uniqueDates = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if(!uniqueDates.has(date) && dailyForecast.length<5){
      uniqueDates.add(date);
      dailyForecast.push(item);
    }
  });

  return (
    <div className={`mt-4 p-4 rounded-lg w-full ${darkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-white"}`}>
      <h2 className="text-lg font-semibold">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
        {dailyForecast.map((item, index) => (
          <div key={index} className={`p-3 rounded flex flex-col items-center ${darkMode ? "bg-gray-700" : "bg-blue-400 text-white"}`}>
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p>{new Date(item.dt_txt).toLocaleTimeString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-12 h-12"
            />
            <p>{item.main.temp}°C</p>
            <p className="capitalize">{item.weather[0].description}</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Wind Speed: {item.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;