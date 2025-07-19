// Archivo: intranet/src/pages/Appointments/CreateAppointment.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    client_id: "",
    vehicle_id: "",
    start: "",
    end_time: "",
    reason: "",
  });
  const [message, setMessage] = useState(null);

  // Cargar clientes
  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then(setClients)
      .catch((err) => console.error("Error loading clients", err));
  }, []);

  // Cargar vehículos cuando se selecciona un cliente
  useEffect(() => {
    if (form.client_id) {
      fetch(`/api/clients/${form.client_id}`)
        .then((res) => res.json())
        .then((data) => setVehicles(data.vehicles || []))
        .catch((err) => console.error("Error loading vehicles", err));
    }
  }, [form.client_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create appointment");

      setMessage("Appointment successfully created.");
      setTimeout(() => navigate("/appointments"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Error creating appointment.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Create New Appointment
      </h2>

      {message && <p className="mb-4 text-center text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client */}
        <select
          name="client_id"
          value={form.client_id}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.client_id} value={client.client_id}>
              {client.first_name} {client.last_name}
            </option>
          ))}
        </select>

        {/* Vehicle */}
        <select
          name="vehicle_id"
          value={form.vehicle_id}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a vehicle</option>
          {vehicles.map((v) => (
            <option key={v.vehicle_id} value={v.vehicle_id}>
              {v.make} {v.model} ({v.plate})
            </option>
          ))}
        </select>

        {/* Start datetime */}
        <input
          type="datetime-local"
          name="start"
          value={form.start}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* End datetime */}
        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Reason */}
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Service reason"
          required
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Appointment
        </button>
      </form>
    </div>
  );
}
