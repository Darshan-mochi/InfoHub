import axios from "axios";

const api = axios.create({ baseURL: "https://infohub-tt4s.onrender.com" });

export const fetchQuote = () => api.get("/api/quote").then((r) => r.data);
export const fetchWeather = (city) =>
  api.get("/api/weather", { params: { city } }).then((r) => r.data);
export const fetchCurrency = () => api.get("/api/currency").then((r) => r.data);
