import { useState } from "react";
import WeatherModule from "./components/WeatherModule.jsx";
import CurrencyConverter from "./components/CurrencyConverter.jsx";
import QuoteGenerator from "./components/QuoteGenerator.jsx";

export default function App() {
  const [active, setActive] = useState("Weather");
  const tabs = ["Weather", "Currency", "Quotes"];

  return (
    <div className="container">
      <div className="header">
        <div className="brand">InfoHub</div>
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`tab ${active === t ? "active" : ""}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {active === "Weather" && <WeatherModule />}
      {active === "Currency" && <CurrencyConverter />}
      {active === "Quotes" && <QuoteGenerator />}

      <footer>
        Single Page Application · React + Express · Loading & Error states
        included
      </footer>
    </div>
  );
}
