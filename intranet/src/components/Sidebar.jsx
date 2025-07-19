
// Archivo: totalcar-intranet/src/components/Sidebar.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Car,
  ClipboardList,
  FileText,
  Users,
  X,
  CalendarDays,
  LayoutDashboard,
  UserCog,
  LogOut,
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path:
        userRole === "admin"
          ? "/admin"
          : userRole === "frontdesk"
          ? "/frontdesk"
          : userRole === "mechanic"
          ? "/mechanic"
          : "/",
      roles: ["admin", "frontdesk", "mechanic"],
    },
    {
      name: "Vehicles",
      icon: Car,
      path: "/vehicles",
      roles: ["admin", "frontdesk", "mechanic"],
    },
    {
      name: "Work Orders",
      icon: ClipboardList,
      path: "/work-orders",
      roles: ["admin", "mechanic"],
    },
    {
      name: "Invoices",
      icon: FileText,
      path: "/invoices",
      roles: ["admin", "frontdesk"],
    },
    {
      name: "Clients",
      icon: Users,
      path: "/clients",
      roles: ["admin", "frontdesk"],
    },
    {
      name: "Appointments",
      icon: CalendarDays,
      path: "/appointments",
      roles: ["admin", "frontdesk"],
    },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex lg:flex-col w-64 max-w-full py-6 px-4`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold truncate">TotalCar</h1>
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {menu.map((item) => {
            if (item.roles && userRole && item.roles.includes(userRole)) {
              const Icon = item.icon;
              return (
                <NavLink
                  to={item.path}
                  key={item.name}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
                      isActive ? "bg-gray-800 text-white" : "text-gray-300"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium truncate">{item.name}</span>
                </NavLink>
              );
            }
            return null;
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-800">
          {userRole === "admin" && (
            <NavLink
              to="/users"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-300"
                } mb-2`
              }
            >
              <UserCog className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium truncate">Users</span>
            </NavLink>
          )}

          {userRole && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg w-full text-red-300 hover:bg-red-800 hover:scale-105 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium truncate">Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
