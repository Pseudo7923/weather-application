const BASE = import.meta.env.VITE_LOCATION_API_URL;
export async function fetchCities({ q = '', offset = 0, limit = 50, order = 'name', dir = 'asc' }) {
  const params = new URLSearchParams({
    select: 'geoname_id,name,cou_name_en,timezone,coordinates',
    limit,
    offset,
    order_by: `${order} ${dir}`,
    where: q ? `search(name,"${q}")` : '',
  });
  const res = await fetch(`${BASE}?${params.toString()}`);
  if (!res.ok) throw new Error('City fetch failed');
  return res.json();
}
