import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase";
import { ThemeContext } from "../contexts/ThemeContext";

const SocialMediaManager = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [socials, setSocials] = useState([]);
  const [form, setForm] = useState({ platform: "", url: "", icon_name: "" });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data } = await supabase.from("SocialLinks").select("*");
    if (data) setSocials(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("SocialLinks").insert([form]);
    setForm({ platform: "", url: "", icon_name: "" });
    fetchLinks();
  };

  const handleDelete = async (id) => {
    await supabase.from("SocialLinks").delete().eq("id", id);
    fetchLinks();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Platform (e.g. LinkedIn)"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="url"
            className="form-control"
            placeholder="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Icon name (e.g. github)"
            value={form.icon_name}
            onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            ➕ Add Link
          </button>
        </div>
      </form>

      <ul className="list-group">
        {socials.map((s) => (
          <li
            key={s.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              isDark ? "bg-dark text-light border-secondary" : ""
            }`}
          >
            <div>
              <strong>{s.platform}:</strong>{" "}
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={isDark ? "text-info" : "text-primary"}
              >
                {s.url}
              </a>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(s.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaManager;
