import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import CityTable from '../components/CityTable';

export default function Home() {
  const [query, setQuery] = useState('');
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Cities</h1>
      
      <div className="flex justify-center mb-6">
        <SearchBox onSelect={setQuery} />
      </div>
      
      <div className="mt-6 overflow-x-auto rounded-xl shadow-lg bg-white p-4">
        <CityTable query={query} />
      </div>
    </div>
  );
}
