const KEY = import.meta.env.VITE_WEATHER_API_KEY
const ROOT = import.meta.env.VITE_WEATHER_API_URL

const toMetric = (k) => (k - 273.15).toFixed(1);

export async function getWeather(lat, lon) {
  const qs = (endpoint) =>
    `${ROOT}/${endpoint}?lat=${lat}&lon=${lon}&appid=${KEY}`;

  const [current, forecast] = await Promise.all([
    fetch(qs('weather')).then((r) => r.json()),
    fetch(qs('forecast')).then((r) => r.json()),
  ]);

  return {
    current: {
      temp: toMetric(current.main.temp),
      high: toMetric(current.main.temp_max),
      low: toMetric(current.main.temp_min),
      desc: current.weather[0].description,
      humidity: current.main.humidity,
      wind: current.wind.speed,
      pressure: current.main.pressure,
      icon: current.weather[0].icon,
    },
    forecast: forecast.list.map((p) => ({
      dt: p.dt_txt,
      temp: toMetric(p.main.temp),
      desc: p.weather[0].description,
      pop: p.pop,
      icon: p.weather[0].icon,
    })),
  };
}
