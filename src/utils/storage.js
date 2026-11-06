export function loadData(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}