import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove auth and role from localStorage
    localStorage.removeItem("auth");
    localStorage.removeItem("role");

    // Redirect to Signin page
    navigate("/signin");
  }, [navigate]);

  return null; // No UI to render
};

export default Logout;
