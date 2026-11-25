export function toggleCompare(id) {
  const ids = JSON.parse(localStorage.getItem('compare') || '[]');
  const next = ids.includes(id)
    ? ids.filter((item) => item !== id)
    : ids.length < 2
      ? [...ids, id]
      : [ids[1], id];
  localStorage.setItem('compare', JSON.stringify(next));
  return next;
}
