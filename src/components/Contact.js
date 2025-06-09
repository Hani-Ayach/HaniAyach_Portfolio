import React, { useEffect, useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import SectionWrapper from "./SectionWrapper";
import { ThemeContext } from "../contexts/ThemeContext";
import { supabase } from "../supabase";

const iconMap = {
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  x: <FaXTwitter />,
  twitter: <FaXTwitter />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  website: <FaGlobe />,
};
const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [socialLinks, setSocialLinks] = useState([]);


  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase.from("SocialLinks").select("*");
      if (!error && data) setSocialLinks(data);
    };
    fetchLinks();
  }, []);


  const handleFormSubmit = () => {
    toast.success("✅ Message sent successfully!");
  };

  return (
    <SectionWrapper>
        {/* 3D Star Background */}
        <Canvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "120vh",
            pointerEvents: "none",
            zIndex: 0,
            background: theme === "dark" ? "#000000" : "#f8f9fa",

          }}
        >
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
        </Canvas>
      <div
        style={{ position: "relative", maxHeight: "110vh", overflow: "hidden" }}
      >

        {/* Contact Content */}
        <div
          className="mt-5 position-relative"
          style={{ zIndex: 1 }}
        >
          <h2 className="text-center mb-4 display-5 fw-bold">Let’s Connect</h2>
          <p
            className="text-center fs-5 mb-5 "
            style={{ justifySelf: "center" }}
          >
            Have a project in mind or want to collaborate? Send a message below.
          </p>
          <motion.div
            className="row justify-content-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-md-8 col-lg-6">
              <form
                action="https://formsubmit.co/hani.r.ayach@gmail.com"
                method="POST"
                className="p-4 glass-bg rounded-4 shadow"
                onSubmit={handleFormSubmit}
              >
                <input type="hidden" name="_captcha" value="false" />
                {/* <input
                type="hidden"
                name="_next"
                value="/contact"
              /> */}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Let’s build something awesome!"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="text-center mt-5">
            <p className="mb-3">Or reach out via:</p>
            <div className="d-flex justify-content-center gap-4 fs-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    title={link.platform}
                    className={theme === "dark" ? "text-light" : "text-dark"}
                  >
                    {iconMap[link.icon_name?.toLowerCase()] || <FaEnvelope />}
                  </a>
                ))
              ) : (
                <p>Loading links...</p>
              )}
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <ToastContainer position="bottom-center" theme="dark" />
      </div>
    </SectionWrapper>
  );
};

export default Contact;
