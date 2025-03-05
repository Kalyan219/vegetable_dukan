import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Logout.css'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token"); // Remove token (or session data)
    sessionStorage.clear();

    // Redirect to login
    navigate("/", { replace: true });

    // Prevent back navigation
    setTimeout(() => {
      window.history.replaceState(null, null, window.location.href);
    }, 100);
  };

  // Prevent back/forward navigation
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return <button className="log-btn" onClick={handleLogout}>Logout</button>;
};

export default Logout;
