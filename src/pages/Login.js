import React, { useState, useEffect, useContext } from "react";

import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin");
    });
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert("❌ Login failed: " + error.message);
    navigate("/admin");
  };

  return (
    <div
      className="container py-5 "
      style={{
        maxWidth: "400px",
        color: isDark ? "#f1f1f1" : "#111",
      }}
    >
      <h2 className="text-center my-5">🔐 Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          style={{
            color: "white",
          }}
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
