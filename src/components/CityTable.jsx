import { useEffect, useRef, useState, useCallback } from 'react';
import CityRow from './CityRow';
import { fetchCities } from '../api/cities';

export default function CityTable({ query }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchCities({ q: query, offset: page * 50 });
      setRows((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length === 50);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, query]);

  useEffect(() => { load(); }, [load]);
  
  useEffect(() => { 
    setRows([]);
    setPage(0);
  }, [query]);

  useEffect(() => {
    if (!loader.current || !hasMore) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setPage((p) => p + 1));
    io.observe(loader.current);
    return () => io.disconnect();
  }, [hasMore]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-700 text-white sticky top-0">
                <tr>
                  <th scope="col" className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider">
                    City
                  </th>
                  <th scope="col" className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="py-3 px-6 text-left text-sm font-bold uppercase tracking-wider">
                    Timezone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.length > 0 ? (
                  rows.map((c) => <CityRow key={c.geoname_id} city={c} />)
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500 italic">
                      {query ? 'No cities found matching your search' : 'Enter a search term to find cities'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {hasMore && (
        <div 
          ref={loader} 
          className="mt-4 mb-8 py-4 flex justify-center items-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600' : 'bg-gray-300'} animate-pulse`}></div>
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-purple-600' : 'bg-gray-300'} animate-pulse animation-delay-200`}></div>
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-pink-600' : 'bg-gray-300'} animate-pulse animation-delay-400`}></div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              Loading more cities...
            </span>
          </div>
        </div>
      )}
      
      {!hasMore && rows.length > 0 && (
        <div className="mt-4 mb-8 text-center text-sm text-gray-500">
          End of results
        </div>
      )}
    </div>
  );
}