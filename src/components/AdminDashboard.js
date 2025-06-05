import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    github_url: "",
    website_url: "",
    image_base64: "",
  });

  const navigate = useNavigate();

useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) navigate("/login");
  };
  checkSession();
}, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("Projects").select("*");
    console.log(data)
    console.log('data')

    if (error) console.error("Fetch error:", error.message);
    else setProjects(data);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setNewProject((prev) => ({ ...prev, image_base64: base64 }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(newProject)
    if (editingId) {
      const { error } = await supabase
        .from("Projects")
        .update(newProject)
        .eq("id", editingId);
      if (error) return alert("❌ Update failed: " + error.message);
      alert("✅ Project updated!");
      setEditingId(null);
    } else {
      const { data, error } = await supabase.from("Projects").insert([newProject]);
     
      if (error!=null) return alert("❌ Error: " + error.message);
      setProjects([...projects, newProject]);
      alert("✅ Project added!");
    }

    setNewProject({
      title: "",
      description: "",
      github_url: "",
      website_url: "",
      image_base64: "",
    });
  };

  const handleEdit = (project) => {
    setNewProject(project);
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("Projects").delete().eq("id", id);
    if (error) return alert("❌ Delete failed: " + error.message);
    alert("🗑️ Project deleted");
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center my-5">🛠️ Admin Dashboard</h2>
      <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-outline-danger"
    onClick={async () => {
      await supabase.auth.signOut();
      navigate("/login");
    }}
  >
    🚪 Logout
  </button>
</div>
      <form onSubmit={handleSubmit} className="row g-3 mb-5">
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="form-control"
            value={newProject.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="github_url"
            placeholder="GitHub URL"
            className="form-control"
            value={newProject.github_url}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="website_url"
            placeholder="Website URL"
            className="form-control"
            value={newProject.website_url}
            onChange={handleChange}
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
            name="description"
            placeholder="Description"
            className="form-control"
            rows="3"
            value={newProject.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            {editingId ? "💾 Save Changes" : "➕ Add Project"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setNewProject({
                  title: "",
                  description: "",
                  github_url: "",
                  website_url: "",
                  image_base64: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h4 className="mb-3">📂 Existing Projects:</h4>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map((p) => (
          <div className="col" key={p.id}>
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
                  style={{ objectFit: "cover", height: "200px" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "200px",
                    backgroundColor: isDark ? "#333" : "#e9ecef",
                    color: isDark ? "#ccc" : "#555",
                    fontFamily: "monospace",
                    fontSize: "1.2rem",
                  }}
                >
                  No Image Available
                </div>
              )}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {p.website_url && (
                    <a
                      href={p.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success flex-fill"
                    >
                      View Live
                    </a>
                  )}
                  {p.github_url && (
                    <a
                      href={p.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn flex-fill ${
                        isDark ? "btn-outline-light" : "btn-outline-dark"
                      }`}
                    >
                      View Code
                    </a>
                  )}
                </div>
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

export default AdminDashboard;
