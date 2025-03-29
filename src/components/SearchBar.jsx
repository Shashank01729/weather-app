const SearchBar = ({ city, setCity, fetchWeather }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (city.trim()) fetchWeather(city);
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 text-black rounded"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">Search</button>
      </form>
    );
  };
  
  export default SearchBar;
  