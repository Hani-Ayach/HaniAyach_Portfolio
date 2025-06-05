import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase";
import { ThemeContext } from "../contexts/ThemeContext";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

const ProjectManager = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    github_url: "",
    website_url: "",
    image_base64: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from("Projects").select("*");
    if (data) setProjects(data);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setForm((prev) => ({ ...prev, image_base64: base64 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("Projects").update(form).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("Projects").insert([form]);
    }
    setForm({
      title: "",
      description: "",
      github_url: "",
      website_url: "",
      image_base64: "",
    });
    fetchProjects();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("Projects").delete().eq("id", id);
    fetchProjects();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="GitHub URL"
            value={form.github_url}
            onChange={(e) => setForm({ ...form, github_url: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Website URL"
            value={form.website_url}
            onChange={(e) => setForm({ ...form, website_url: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImage}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            {editingId ? "💾 Update Project" : "➕ Add Project"}
          </button>
        </div>
      </form>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map((p) => (
          <div key={p.id} className="col">
            <div
              className={`card h-100 border shadow ${
                isDark
                  ? "bg-dark text-light border-secondary"
                  : "bg-white text-dark border-light"
              }`}
            >
              {p.image_base64 ? (
                <img
                  src={p.image_base64}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "200px",
                    background: isDark ? "#333" : "#e9ecef",
                    fontStyle: "italic",
                  }}
                >
                  No Image
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
