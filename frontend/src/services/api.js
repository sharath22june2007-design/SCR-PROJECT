const API = import.meta.env.VITE_API_URL || '/api';
async function request(path, options) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
export const getSchemes = (params = {}) =>
  request(`/schemes?${new URLSearchParams(params)}`);
export const getScheme = (id) => request(`/schemes/${id}`);
export const findSchemes = (profile) =>
  request('/schemes/find', { method: 'POST', body: JSON.stringify(profile) });
