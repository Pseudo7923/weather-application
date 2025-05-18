import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { getWeather } from '../api/weather';
import WeatherCard from '../components/WeatherCard';

export default function Weather() {
  const { geonameId } = useParams();
  const { state } = useLocation();        
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityInfo, setCityInfo] = useState(state?.city || null);

  const getDailyForecast = (forecastList) => {
    const days = {};
    for (const entry of forecastList) {
      const date = entry.dt.split(' ')[0]; 
      if (!days[date]) {
        days[date] = entry; 
      }
    }
    return Object.values(days).slice(1, 6); 
  };
  // Function to determine background based on weather and time of day
  const getBackgroundStyle = (weatherIcon) => {
    const isDaytime = weatherIcon?.includes('d');
    const weatherCode = weatherIcon?.slice(0, 2);
    
    // Background classes based on weather condition and time of day
    const backgrounds = {
      // Clear sky
      '01': isDaytime 
        ? 'bg-gradient-to-b from-sky-400 to-blue-500' 
        : 'bg-gradient-to-b from-gray-900 to-blue-900',
      // Few clouds
      '02': isDaytime 
        ? 'bg-gradient-to-b from-blue-300 to-sky-400' 
        : 'bg-gradient-to-b from-gray-800 to-blue-800',
      // Scattered/broken clouds
      '03': isDaytime 
        ? 'bg-gradient-to-b from-gray-300 to-blue-300' 
        : 'bg-gradient-to-b from-gray-800 to-slate-700',
      '04': isDaytime 
        ? 'bg-gradient-to-b from-gray-400 to-blue-300' 
        : 'bg-gradient-to-b from-gray-900 to-slate-800',
      // Rain
      '09': isDaytime 
        ? 'bg-gradient-to-b from-gray-500 to-blue-400' 
        : 'bg-gradient-to-b from-gray-900 to-blue-900',
      '10': isDaytime 
        ? 'bg-gradient-to-b from-gray-400 to-blue-500' 
        : 'bg-gradient-to-b from-gray-900 to-blue-800',
      // Thunderstorm
      '11': isDaytime 
        ? 'bg-gradient-to-b from-gray-600 to-slate-500' 
        : 'bg-gradient-to-b from-gray-900 to-slate-800',
      // Snow
      '13': isDaytime 
        ? 'bg-gradient-to-b from-blue-100 to-gray-200' 
        : 'bg-gradient-to-b from-gray-800 to-blue-900',
      // Mist/fog
      '50': isDaytime 
        ? 'bg-gradient-to-b from-gray-300 to-gray-400' 
        : 'bg-gradient-to-b from-gray-800 to-gray-900',
    };
    
    return backgrounds[weatherCode] || (isDaytime 
      ? 'bg-gradient-to-b from-blue-300 to-sky-500' 
      : 'bg-gradient-to-b from-gray-900 to-blue-900');
  };

  // Function to format date in a more readable way
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // If we don't have city info from state, fetch it
        let coordinates;
        if (state?.city?.coordinates) {
          coordinates = state.city.coordinates;
          setCityInfo(state.city);
        } else {
          const cityData = await fetch(
            import.meta.env.VITE_LOCATION_API_URL + `/${geonameId}`
          ).then((r) => r.json());
          
          coordinates = cityData.coordinates;
          setCityInfo(cityData);
        }
        
        const weatherData = await getWeather(coordinates.lat, coordinates.lon);
       
        
        setData(weatherData);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [geonameId, state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-lg font-medium text-blue-800">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-100 to-red-200">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <div className="flex justify-center">
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const backgroundClass = getBackgroundStyle(data.current.icon);
  const isDaytime = data.current.icon.includes('d');

  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      {/* Navigation Bar */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link to="/" className="flex items-center text-white hover:text-blue-100 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </Link>
          
          {cityInfo && (
            <div className="ml-auto text-right">
              <h1 className="text-lg font-semibold text-white">
                {cityInfo.name}
                {cityInfo.cou_name_en && 
                  <span className="text-white/70 ml-2 text-sm">
                    {cityInfo.cou_name_en}
                  </span>
                }
              </h1>
              {cityInfo.timezone && (
                <p className="text-xs text-white/70">{cityInfo.timezone}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Current Weather Section */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <WeatherCard weather={data.current} />
          </div>
        </div>

        {/* Forecast Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 text-white/90 pl-4 border-l-4 border-white/50">
            5-Day Forecast
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {getDailyForecast(data.forecast).map((f) => (
              <div 
                key={f.dt} 
                className="p-4 bg-white/20 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/30 group"
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-white/90 mb-2">
                    {formatDate(f.dt)}
                  </p>
                  <div className="bg-white/30 rounded-full p-2 w-16 h-16 mx-auto mb-2 group-hover:bg-white/40 transition-all">
                    <img
                      src={`https://openweathermap.org/img/wn/${f.icon}.png`}
                      alt={f.desc}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="font-bold text-2xl text-white mb-1">{f.temp}°C</p>
                  <p className="text-xs text-white/80 capitalize">{f.desc}</p>
                  
                  <div className="mt-3 flex justify-between text-xs text-white/70">
                    <div className="flex flex-col items-center">
                      <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>{f.high}°</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span>{f.low}°</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto py-4 bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          Weather data provided by OpenWeatherMap
        </div>
      </div>
    </div>
  );
}
