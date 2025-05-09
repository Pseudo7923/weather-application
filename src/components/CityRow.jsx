import { Link } from 'react-router-dom';

export default function CityRow({ city }) {
  return (
    <tr className="border-b hover:bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 transition-all duration-300 cursor-pointer group">
      <td className="px-6 py-4">
        <Link 
          to={`/weather/${city.geoname_id}`} 
          state={{ city }} 
          className="text-blue-600 font-semibold text-lg group-hover:text-blue-800 transition-all duration-300 inline-flex items-center"
        >
          <span className="underline hover:no-underline">{city.name}</span>
          <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-700 font-medium">{city.cou_name_en}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-500 text-sm">{city.timezone}</span>
      </td>
    </tr>
  );
}