// Archivo: totalcar-intranet/src/pages/RedirectByRole.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectByRole() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = (sessionStorage.getItem("role") || "").toLowerCase();

    if (!token) {
      window.location.href = "http://localhost:3000/intranet-login";
      return;
    }

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "frontdesk") {
      navigate("/frontdesk");
    } else if (role === "mechanic") {
      navigate("/mechanic");
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  return null;
}
