// Archivo: totalcar-intranet/src/pages/Mechanic/MechanicDashboard.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MechanicDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = (sessionStorage.getItem("role") || "").toLowerCase();
    if (role !== "mechanic") {
      navigate("/unauthorized");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Título principal */}
        <h2 className="text-3xl font-bold text-gray-800">Mechanic Dashboard</h2>

        {/* Sección informativa */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <p className="text-gray-700 text-base">
            Welcome! Here you'll find your <strong>assigned work orders</strong> and <strong>vehicle diagnostics</strong>.
          </p>
        </div>

        {/* Futuras secciones: Órdenes asignadas, tareas del día, etc. */}

      </div>
    </div>
  );
}
