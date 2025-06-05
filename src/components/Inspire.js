import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "./SectionWrapper";
import { ThemeContext } from "../contexts/ThemeContext";
import { supabase } from "../supabase";

const Inspire = () => {
  const { theme } = useContext(ThemeContext);
  const [quotes, setQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data, error } = await supabase.from("Quotes").select("*");
      if (error) {
        console.error("❌ Error fetching quotes:", error.message);
      } else {
        setQuotes(data);
        setQuoteIndex(0);
      }
    };
    fetchQuotes();
  }, []);

  const nextQuote = () => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuoteIndex(random);
  };

  return (
    <SectionWrapper background="bg-darker">
      <div className="container py-5 text-center">
        <h2 className="mb-4">Inspiration & Developer Wisdom</h2>

        {quotes.length > 0 ? (
         <div className="fade-in">
         <blockquote className="blockquote fs-4">
           “{quotes[quoteIndex].text}”
         </blockquote>
         {quotes[quoteIndex].author && (
           <figcaption className="blockquote-footer mt-2">
              {quotes[quoteIndex].author}
           </figcaption>
         )}
       </div>
        ) : (
          <p className="lead">Loading inspirational quotes...</p>
        )}

        <button
          className={`btn ${
            theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
          } mt-4`}
          onClick={nextQuote}
          disabled={quotes.length === 0}
        >
          Next Quote
        </button>

        <hr className="my-5" />

        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/learn")}
        >
          Try Learning to Code
        </button>
      </div>
    </SectionWrapper>
  );
};

export default Inspire;
