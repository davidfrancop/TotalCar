// Archivo: intranet/src/pages/IntranetLogin.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";

export default function IntranetLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ estado loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token && role) {
      const redirectMap = {
        admin: "/admin",
        frontdesk: "/frontdesk",
        mechanic: "/mechanic",
      };
      navigate(redirectMap[role] || "/unauthorized");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ iniciar carga

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      console.log("🔍 Login response:", json);

      if (!res.ok || !json.token) {
        throw new Error(json.message || "Login failed");
      }

      sessionStorage.setItem("token", json.token);
      sessionStorage.setItem("role", json.role.toLowerCase());

      const redirectMap = {
        admin: "/admin",
        frontdesk: "/frontdesk",
        mechanic: "/mechanic",
      };
      navigate(redirectMap[json.role.toLowerCase()] || "/unauthorized");
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed");
      setLoading(false); // ✅ detener si hay error
    }
  };

  return (
    <div className="min-h-full w-full bg-[#002B5B] flex items-start justify-center px-4 pt-16">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl border border-gray-100"
      >
        {/* Logo + Título alineados */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img
            src="/img/TotalCar_Logo_Transparent.png"
            alt="TotalCar Logo"
            className="h-10"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002B5B]">
            Intranet Login
          </h2>
        </div>

        {error && (
          <p className="text-red-600 mb-4 text-sm text-center animate-pulse">
            ⚠️ {error}
          </p>
        )}

        {/* Campo Usuario */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
          <UserIcon className="w-5 h-5 absolute top-2.5 left-3 text-gray-400" />
        </div>

        {/* Campo Contraseña */}
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
          <LockClosedIcon className="w-5 h-5 absolute top-2.5 left-3 text-gray-400" />
        </div>

        {/* Botón Login / Loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed animate-pulse"
              : "bg-[#002B5B] hover:bg-[#FF6B00] text-white"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
