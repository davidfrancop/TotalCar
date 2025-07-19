// Archivo: totalcar-intranet/src/App.jsx

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Menu } from "lucide-react";

// Autenticación
import { isAuthenticated, getRole } from "./utils/auth";
import IntranetLogin from "./pages/IntranetLogin";

// Componentes globales
import Sidebar from "./components/Sidebar";

// Dashboards por rol
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FrontdeskDashboard from "./pages/Frontdesk/FrontdeskDashboard";
import MechanicDashboard from "./pages/Mechanic/MechanicDashboard";
import RedirectByRole from "./pages/RedirectByRole";
import Unauthorized from "./pages/Unauthorized";

// Vehicles
import Vehicles from "./pages/Vehicles/Vehicles";
import CreateVehicle from "./pages/Vehicles/CreateVehicle";
import EditVehicle from "./pages/Vehicles/EditVehicle";

// Work Orders
import WorkOrders from "./pages/WorkOrders/WorkOrders";

// Invoices
import Invoices from "./pages/Invoices/Invoices";

// Clients
import Clients from "./pages/Clients/Clients";
import CreateClient from "./pages/Clients/CreateClient";
import EditClient from "./pages/Clients/EditClient";
import CreateCompanyClient from "./pages/Company/CreateCompanyClient";

// Appointments
import Appointment from "./pages/Appointments/Appointments";
import ViewAppointmentsByDay from "./pages/Appointments/ViewAppointmentsByDay";

// Users
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";

// 🔄 Wrapper para usar `useLocation` en el nivel raíz
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  if (hideLayout) {
    // Solo para /login: sin layout, sin sidebar, sin bg-gray
    return (
      <Routes>
        <Route path="/login" element={<IntranetLogin />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Resto del layout con sidebar + navbar
  return (
    <div className="flex h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center justify-between bg-white shadow-md p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu className="w-8 h-8" />
          </button>
          <h1 className="text-lg font-bold text-gray-800 truncate">TotalCar</h1>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
          <Routes>
            <Route path="/" element={<RedirectByRole />} />

            {/* Dashboards */}
            <Route
              path="/admin"
              element={
                isAuthenticated() && getRole() === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/unauthorized" />
                )
              }
            />
            <Route
              path="/frontdesk"
              element={
                isAuthenticated() && getRole() === "frontdesk" ? (
                  <FrontdeskDashboard />
                ) : (
                  <Navigate to="/unauthorized" />
                )
              }
            />
            <Route
              path="/mechanic"
              element={
                isAuthenticated() && getRole() === "mechanic" ? (
                  <MechanicDashboard />
                ) : (
                  <Navigate to="/unauthorized" />
                )
              }
            />

            {/* Página acceso denegado */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Vehicles */}
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/new" element={<CreateVehicle />} />
            <Route path="/vehicles/new/:clientId" element={<CreateVehicle />} />
            <Route path="/vehicles/edit/:id" element={<EditVehicle />} />

            {/* Work Orders */}
            <Route path="/work-orders" element={<WorkOrders />} />

            {/* Invoices */}
            <Route path="/invoices" element={<Invoices />} />

            {/* Clients */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/new" element={<CreateClient />} />
            <Route path="/clients/edit/:id" element={<EditClient />} />
            <Route path="/clients/new/company" element={<CreateCompanyClient />} />

            {/* Appointments */}
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/appointments/day/:date" element={<ViewAppointmentsByDay />} />

            {/* Users */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AppWrapper;
