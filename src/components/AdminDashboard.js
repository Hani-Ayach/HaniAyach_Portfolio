import React from "react";
import ProjectManager from "./ProjectManager";
import QuoteManager from "./QuoteManager";
import SocialMediaManager from "./SocialMediaManager";

import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center my-4">🛠️ Admin Dashboard</h2>
      
      <div className="accordion" id="adminAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              📁 Project Management
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#adminAccordion"
          >
            <div className="accordion-body">
              <ProjectManager />
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
            >
              📜 Quote Management
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#adminAccordion"
          >
            <div className="accordion-body">
              <QuoteManager />
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSocial">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSocial"
            >
              🌐 Social Media Management
            </button>
          </h2>
          <div
            id="collapseSocial"
            className="accordion-collapse collapse"
            data-bs-parent="#adminAccordion"
          >
            <div className="accordion-body">
              <SocialMediaManager />
            </div>
          </div>
        </div>
      </div>

      <button
  className="btn btn-outline-danger my-4"
  onClick={async () => {
    await supabase.auth.signOut();
    navigate("/login");
  }}
>
  🚪 Logout
</button>
    </div>
  );
};

export default AdminDashboard;
