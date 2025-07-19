// Archivo: intranet/src/pages/Appointments/ViewAppointmentsByDay.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarClock, User, Car } from "lucide-react";

export default function ViewAppointmentsByDay() {
  const { date } = useParams(); // formato esperado: YYYY-MM-DD
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/date/${date}`);
        if (!response.ok) throw new Error("Failed to load appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [date]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2">
        <CalendarClock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Appointments for {date}
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found for this date.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => {
            const time = appt.start?.split("T")[1]?.slice(0, 5); // "HH:MM"
            return (
              <div
                key={appt.appointment_id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    {time}
                  </span>
                  <span className="text-sm text-gray-500">{appt.reason}</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{appt.client_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>{appt.vehicle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-4">
        <Link
          to="/appointments"
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          ← Back to Calendar
        </Link>
      </div>
    </div>
  );
}
