import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase";
import { ThemeContext } from "../contexts/ThemeContext";

const QuoteManager = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const { data } = await supabase.from("Quotes").select("*");
    if (data) setQuotes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("Quotes").insert([newQuote]);
    setNewQuote({ text: "", author: "" });
    fetchQuotes();
  };

  const handleDelete = async (id) => {
    await supabase.from("Quotes").delete().eq("id", id);
    fetchQuotes();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Quote text"
            rows="2"
            value={newQuote.text}
            onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Author"
            value={newQuote.author}
            onChange={(e) =>
              setNewQuote({ ...newQuote, author: e.target.value })
            }
          />
        </div>
        <div className="col-md-6 text-end">
          <button type="submit" className="btn btn-success w-100">
            ➕ Add Quote
          </button>
        </div>
      </form>

      <ul className="list-group">
        {quotes.map((q) => (
          <li
            key={q.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              isDark ? "bg-dark text-light border-secondary" : ""
            }`}
          >
            <div>
              <blockquote className="mb-0">“{q.text}”</blockquote>
              {q.author && <small>— {q.author}</small>}
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(q.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteManager;
