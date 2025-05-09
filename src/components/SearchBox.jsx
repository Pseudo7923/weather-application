import { useEffect, useState } from 'react';
import { fetchCities } from '../api/cities';

export default function SearchBox({ onSelect }) {
  const [q, setQ] = useState('');
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    if (!q) { setSuggest([]); return; }
    const t = setTimeout(async () => {
      const data = await fetchCities({ q, limit: 8 });
      setSuggest(data.results);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="relative w-64">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="border border-gray-300 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        placeholder="Search city..."
      />
      {suggest.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto rounded-lg mt-1 z-10">
          {suggest.map((c) => (
            <li
              key={c.geoname_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-150"
              onClick={() => { onSelect(c.name); setSuggest([]); }}
            >
              <span className="font-semibold text-gray-800">{c.name}</span> – <span className="text-gray-600">{c.cou_name_en}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
