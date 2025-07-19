// Archivo: totalcar-intranet/src/pages/Frontdesk/FrontdeskDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RecentWorkOrdersTable from "../../components/RecentWorkOrdersTable";
import AppointmentPreview from "../../components/AppointmentPreview";

export default function FrontdeskDashboard() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = (sessionStorage.getItem("role") || "").toLowerCase();
    if (role === "frontdesk") {
      setAuthorized(true);
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Título principal */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Frontdesk Dashboard</h2>
        </div>

        {/* Órdenes de trabajo recientes */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Work Orders</h3>
          <RecentWorkOrdersTable />
        </section>

        {/* Citas próximas */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
          <AppointmentPreview />
        </section>

      </div>
    </div>
  );
}
