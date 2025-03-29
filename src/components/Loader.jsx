const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      <p className="text-blue-500 text-lg ml-2">Fetching weather data...</p>
    </div>
  );
};

export default Loader;
