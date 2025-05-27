import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "./SectionWrapper";

const quotes = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Learning to write programs stretches your mind and helps you think better. – Bill Gates",
  "Code is like humor. When you have to explain it, it’s bad. – Cory House",
  "Programs must be written for people to read, and only incidentally for machines to execute. – Harold Abelson",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Sometimes it's better to leave something alone, to pause, and that's very true of programming. – Joyce Wheeler",
  "Before software can be reusable it first has to be usable. – Ralph Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime. – Muhammad Waseem",
  "Programming isn't about what you know; it's about what you can figure out. – Chris Pine",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Learning to code is not about getting it right the first time. It's about getting it better each time.",
  "Code never lies, comments sometimes do. – Ron Jeffries",
  "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job. – Mosher’s Law of Software Engineering",
  "Fix the cause, not the symptom. – Steve Maguire",
  "Practice creates confidence. Confidence empowers you.",
  "Great things are not done by impulse, but by a series of small things brought together. – Vincent van Gogh",
  "Programming is a craft that takes patience, passion, and practice.",
  "Make it work, make it right, make it fast. – Kent Beck",
  "There’s no such thing as a perfect code – only better code.",
  "When you feel stuck, take a break. The solution is often right behind the frustration.",
  "A good programmer looks both ways before crossing a one-way street. – Doug Linder",
  "Curiosity is your greatest tool. Use it endlessly.",
  "Success in coding is 10% inspiration and 90% debugging.",
  "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
  "It’s not a bug – it’s an undocumented feature.",
  "Every line of code is a step forward in your journey.",
  "The best coders aren’t those who know everything. They’re the ones who keep learning.",
];

const Inspire = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const nextQuote = () => setQuoteIndex((prev) => (prev + 1) % quotes.length);
  const navigate = useNavigate();

  return (
    <SectionWrapper background="bg-darker">
      <div className="container text-white py-5 text-center">
        <h2 className="mb-4">Inspiration & Developer Wisdom</h2>

        <blockquote className="blockquote fs-4">
          “{quotes[quoteIndex]}”
        </blockquote>

        <button className="btn btn-outline-light mt-4" onClick={nextQuote}>
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
