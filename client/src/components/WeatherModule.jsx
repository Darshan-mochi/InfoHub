import { useEffect, useState } from "react";
import { fetchWeather } from "../api.js";

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async (c) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchWeather(c);
      setData(res);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load weather.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load(city);
  }, []);

  return (
    <div className="card">
      <h2>Real-time Weather</h2>
      <div className="row" style={{ marginTop: 8 }}>
        <input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button className="button" onClick={() => load(city)}>
          Refresh
        </button>
      </div>

      {isLoading && <p className="loader">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && data && (
        <div className="weather" style={{ marginTop: 12 }}>
          {data.icon && (
            <img
              alt={data.condition}
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            />
          )}
          <div>
            <div className="temp">{Math.round(data.tempC)}°C</div>
            <div className="meta">
              {data.city} · feels like {Math.round(data.feelsLikeC)}°C
            </div>
            <div className="meta">{data.condition}</div>
          </div>
        </div>
      )}
    </div>
  );
}
