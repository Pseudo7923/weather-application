export default function WeatherCard({ weather }) {
  // Function to determine background gradient based on weather condition
  const getWeatherGradient = (icon) => {
    if (icon.includes('01') || icon.includes('02')) {
      return 'from-blue-400 to-sky-300'; // Clear or few clouds
    } else if (icon.includes('03') || icon.includes('04')) {
      return 'from-gray-300 to-blue-200'; // Cloudy
    } else if (icon.includes('09') || icon.includes('10')) {
      return 'from-blue-400 to-gray-300'; // Rain
    } else if (icon.includes('11')) {
      return 'from-gray-600 to-blue-500'; // Thunderstorm
    } else if (icon.includes('13')) {
      return 'from-blue-100 to-indigo-200'; // Snow
    } else if (icon.includes('50')) {
      return 'from-gray-300 to-gray-400'; // Mist
    }
    return 'from-blue-300 to-purple-200'; // Default
  };

  return (
    <div className={`max-w-md mx-auto bg-gradient-to-br ${getWeatherGradient(weather.icon)} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}>
      <div className="relative p-6">
        {/* Weather condition background element */}
        <div className="absolute top-0 right-0 opacity-20">
          <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="currentColor">
            {weather.icon.includes('01') && (
              <circle cx="12" cy="12" r="5" />
            )}
            {(weather.icon.includes('02') || weather.icon.includes('03') || weather.icon.includes('04')) && (
              <path d="M4,12a8,8 0 1,1 16,0a8,8 0 1,1 -16,0" />
            )}
            {(weather.icon.includes('09') || weather.icon.includes('10')) && (
              <path d="M8,5a6,6 0 1,0 8,8l-8,-8m-4,12l16,-16" />
            )}
            {weather.icon.includes('11') && (
              <path d="M12,2L5,22l7,-12h5l-7,12L17,2" />
            )}
            {weather.icon.includes('13') && (
              <path d="M12,2L9,9H3l5,4l-2,7l6,-5l6,5l-2,-7l5,-4h-6L12,2z" />
            )}
          </svg>
        </div>

        {/* Weather main info */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="bg-white/30 rounded-full p-2 backdrop-blur-sm">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Weather icon"
              className="w-16 h-16"
            />
          </div>
          <div>
            <p className="text-6xl font-bold text-white drop-shadow-md">{weather.temp}°C</p>
            <p className="capitalize text-lg text-white/90 font-medium">{weather.desc}</p>
          </div>
        </div>

        {/* Weather details */}
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                </svg>
                <span className="font-medium text-gray-800">High:</span>
                <span className="font-bold text-gray-900">{weather.high}°</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM10 12a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 12zM10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
                <span className="font-medium text-gray-800">Low:</span>
                <span className="font-bold text-gray-900">{weather.low}°</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
              </svg>
              <span className="font-medium text-gray-800">Humidity:</span>
              <span className="font-bold text-gray-900">{weather.humidity}%</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17 12a3 3 0 11-6 0 3 3 0 016 0zM12 1a1 1 0 10-2 0v6.5a.5.5 0 01-1 0V7a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V6a1 1 0 10-2 0v7.5a.5.5 0 01-1 0V4a1 1 0 00-2 0v10.38a6.001 6.001 0 0111.5 1.62h-9a1 1 0 100 2h11a1 1 0 00.55-1.83A8.001 8.001 0 0115.5 9v-.5a.5.5 0 01.5-.5 1 1 0 100-2h-3a1 1 0 000 2 .5.5 0 01.5.5v.5c0 1.94.655 3.854 1.832 5.5H16a1 1 0 100 2h1.55a1 1 0 00.55-1.83A7.987 7.987 0 0119 12a3 3 0 01-2 2.83z" />
              </svg>
              <span className="font-medium text-gray-800">Wind:</span>
              <span className="font-bold text-gray-900">{weather.wind} m/s</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-800">Pressure:</span>
              <span className="font-bold text-gray-900">{weather.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}