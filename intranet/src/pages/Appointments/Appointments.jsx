// Archivo: intranet/src/pages/Appointments/Appointments.jsx

import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function Appointments() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        if (!res.ok) throw new Error("Error loading appointments");
        const data = await res.json();

        // Transformar datos a formato de Big Calendar
        const formatted = data.map(appt => ({
          title: `${appt.client_name} - ${appt.reason}`,
          start: new Date(appt.start),
          end: new Date(appt.end_time),
          appointment_id: appt.appointment_id,
          status: appt.status || "confirmed",
        }));

        setEvents(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAppointments();
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor = "#002B5B";
    if (event.status === "confirmed") backgroundColor = "#22c55e";
    if (event.status === "cancelled") backgroundColor = "#ef4444";
    if (event.status === "company") backgroundColor = "#3b82f6";

    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "6px",
        padding: "4px",
        border: "none",
      },
    };
  };

  const handleSelectEvent = (event) => {
    const dateStr = event.start.toISOString().split("T")[0];
    navigate(`/appointments/day/${dateStr}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#002B5B]">Appointments</h1>

      {error ? (
        <p className="text-red-600 mb-4">{error}</p>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={eventStyleGetter}
            popup
            onSelectEvent={handleSelectEvent}
          />
        </div>
      )}
    </div>
  );
}
