import React from 'react';

export default function ForecastCard({ forecast, formatDate }) {
  return (
    <div 
      key={forecast.dt} 
      className="p-4 bg-white/20 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/30 group"
    >
      <div className="text-center">
        <p className="text-sm font-medium text-white/90 mb-2">
          {formatDate(forecast.dt)}
        </p>
        <div className="bg-white/30 rounded-full p-2 w-16 h-16 mx-auto mb-2 group-hover:bg-white/40 transition-all">
          <img
            src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
            alt={forecast.desc}
            className="w-full h-full"
          />
        </div>
        <p className="font-bold text-2xl text-white mb-1">{forecast.temp}°C</p>
        <p className="text-xs text-white/80 capitalize">{forecast.desc}</p>
        
        <div className="mt-3 flex justify-between text-xs text-white/70">
          <div className="flex flex-col items-center">
            <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>{forecast.high}°</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>{forecast.low}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
