import { useState, useEffect } from "react";
import { fetchCurrency } from "../api.js";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [rates, setRates] = useState({});
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");
  const [error, setError] = useState("");

  const loadRates = async () => {
    try {
      const res = await fetchCurrency();
      setRates(res.rates);
    } catch (e) {
      setError(`Failed to load currency rates ${e}`);
    }
  };

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, 30000);
    return () => clearInterval(interval);
  }, []);

  const convert = () => {
    const value = Number(amount);
    if (!rates || !rates[from] || !rates[to] || isNaN(value)) return "0.00";

    // Convert via USD base rates
    const amountInUSD = value / rates[from];
    const result = amountInUSD * rates[to];
    return result.toFixed(2);
  };

  return (
    <div className="card">
      <h2>Universal Currency Converter</h2>

      <div className="row" style={{ marginTop: 8 }}>
        <input
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <select
          className="input"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {Object.keys(rates).map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>

        <span style={{ fontWeight: "bold", fontSize: 20 }}>→</span>

        <select
          className="input"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {Object.keys(rates).map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      {rates && (
        <p style={{ marginTop: 16, fontSize: 20 }}>
          <strong>{amount}</strong> {from} = <strong>{convert()}</strong> {to}
        </p>
      )}
    </div>
  );
}
