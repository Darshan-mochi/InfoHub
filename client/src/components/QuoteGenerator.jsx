import { useEffect, useState } from "react";
import { fetchQuote } from "../api.js";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setIsLoading(true);
    setError("");
    try {
      const q = await fetchQuote();
      setQuote(q);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load quote.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="card">
      <h2>Motivational Quote</h2>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="button" onClick={load}>
          New Quote
        </button>
      </div>

      {isLoading && <p className="loader">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && quote && (
        <p className="quote" style={{ marginTop: 12 }}>
          “{quote.text}”
          <br />
          <small>— {quote.author || "Unknown"}</small>
        </p>
      )}
    </div>
  );
}
