// Archivo: src/components/AppointmentPreview.jsx

import { CalendarDays, Clock3, User, Car, BadgeCheck } from "lucide-react";

const citasSimuladas = [
  {
    id: 1,
    cliente: "John Doe",
    vehiculo: "Ford Fiesta 2018",
    fecha: "2025-06-28",
    hora: "09:00",
    estado: "confirmed",
  },
  {
    id: 2,
    cliente: "Laura Meier",
    vehiculo: "Audi A3 2020",
    fecha: "2025-06-29",
    hora: "14:30",
    estado: "pending",
  },
  {
    id: 3,
    cliente: "Carlos Sánchez",
    vehiculo: "BMW i3 2022",
    fecha: "2025-06-30",
    hora: "11:15",
    estado: "completed",
  },
];

const getEstadoColor = (estado) => {
  switch (estado) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function AppointmentPreview() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <CalendarDays className="w-6 h-6" />
        Upcoming Appointments
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {citasSimuladas.map((appt) => (
          <div
            key={appt.id}
            className="bg-white rounded-lg shadow border p-4 space-y-1"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" />
              <span>{appt.cliente}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Car className="w-4 h-4" />
              <span>{appt.vehiculo}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDays className="w-4 h-4" />
              <span>{appt.fecha}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock3 className="w-4 h-4" />
              <span>{appt.hora}</span>
            </div>
            <div
              className={`inline-flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full ${getEstadoColor(
                appt.estado
              )}`}
            >
              <BadgeCheck className="w-4 h-4" />
              {appt.estado}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
