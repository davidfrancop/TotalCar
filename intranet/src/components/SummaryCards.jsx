
// Archivo: intranet/src/components/SummaryCards.jsx

import React, { useEffect, useState } from "react";
import {
  Car,
  Users,
  ClipboardList,
  FileText,
} from "lucide-react";

export default function SummaryCards() {
  const [data, setData] = useState({
    vehicles: 0,
    clients: 0,
    workOrders: 0,
    invoices: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchCounts = async () => {
      try {
        const [resVehicles, resClients, resWorkOrders, resInvoices] =
          await Promise.all([
            fetch("/api/vehicles/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("/api/clients/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("/api/work-orders/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("/api/invoices/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        const vehicles = resVehicles.ok ? await resVehicles.json() : { count: 0 };
        const clients = resClients.ok ? await resClients.json() : { count: 0 };
        const workOrders = resWorkOrders.ok ? await resWorkOrders.json() : { count: 0 };
        const invoices = resInvoices.ok ? await resInvoices.json() : { count: 0 };

        setData({
          vehicles: vehicles.count ?? 0,
          clients: clients.count ?? 0,
          workOrders: workOrders.count ?? 0,
          invoices: invoices.count ?? 0,
        });
      } catch (err) {
        console.error("Error loading summary data:", err);
        setError("Error loading summary");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 text-sm">Loading summary...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-sm">{error}</p>;
  }

  const cards = [
    {
      label: "Vehicles",
      value: data.vehicles,
      icon: <Car className="w-6 h-6 text-blue-600" />,
    },
    {
      label: "Clients",
      value: data.clients,
      icon: <Users className="w-6 h-6 text-green-600" />,
    },
    {
      label: "Work Orders",
      value: data.workOrders,
      icon: <ClipboardList className="w-6 h-6 text-yellow-600" />,
    },
    {
      label: "Invoices",
      value: data.invoices,
      icon: <FileText className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl shadow p-4 flex items-center justify-between hover:shadow-md transition"
        >
          <div>
            <p className="text-gray-500 text-sm">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
          {card.icon}
        </div>
      ))}
    </div>
  );
}
