// Archivo: intranet/src/pages/Vehicles/CreateVehicle.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateVehicle = () => {
  const { clientId } = useParams(); // Captura el clientId de la URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    plate: "",
    vin: "",
    make: "",
    model: "",
    year: "",
    hsn: "",
    tsn: "",
    fuel_type: "",
    vehicle_type: "",
    drive: "",
    transmission: "",
    km: "",
    tuv_month: "",
    tuv_year: "",
    registration_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      client_id: parseInt(clientId), // ✅ aseguramos que client_id se incluya
      year: parseInt(form.year),
      km: parseInt(form.km),
      tuv_month: parseInt(form.tuv_month),
      tuv_year: parseInt(form.tuv_year),
    };

    // --- CONSOLE LOGS AÑADIDOS PARA DEPURACIÓN ---
    console.log("🚀 [CreateVehicle] clientId de la URL:", clientId);
    console.log("🚀 [CreateVehicle] client_id en el payload (parseado):", payload.client_id);
    console.log("🚀 [CreateVehicle] Payload completo enviado al backend:", payload);
    // --- FIN CONSOLE LOGS ---

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        // Asegúrate de que el error del backend se muestre aquí
        console.error("❌ [CreateVehicle] Error de respuesta del backend:", errData);
        throw new Error(errData.error || errData.message || "Failed to create vehicle");
      }

      alert("Vehicle created successfully");
      navigate(`/clients/edit/${clientId}`); // Redirige de vuelta a la edición del cliente
    } catch (err) {
      console.error("❌ [CreateVehicle] Error creando vehículo en frontend:", err.message);
      alert("Error creating vehicle: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Register Vehicle</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="plate" placeholder="Plate" value={form.plate} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="vin" placeholder="VIN" value={form.vin} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="make" placeholder="Make" value={form.make} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="year" placeholder="Year" type="number" value={form.year} onChange={handleChange} required className="w-full border p-2 rounded" />

        <div className="flex gap-4">
          <input name="hsn" placeholder="HSN (4 digits)" maxLength={4} value={form.hsn} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="tsn" placeholder="TSN (3 chars)" maxLength={3} value={form.tsn} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <select name="fuel_type" value={form.fuel_type} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Gas">Gas</option>
          </select>

          <select name="vehicle_type" value={form.vehicle_type} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Vehicle Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Pickup">Pickup</option>
            <option value="Other">Other</option>
          </select>

          <select name="drive" value={form.drive} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Drive</option>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
          </select>

          <select name="transmission" value={form.transmission} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="CVT">CVT</option>
          </select>
        </div>

        <input name="km" placeholder="Kilometers" type="number" value={form.km} onChange={handleChange} required className="w-full border p-2 rounded" />

        <div className="flex gap-4">
          <input name="tuv_month" placeholder="TÜV Month (1-12)" type="number" value={form.tuv_month} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="tuv_year" placeholder="TÜV Year" type="number" value={form.tuv_year} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <input name="registration_date" placeholder="Registration Date" type="date" value={form.registration_date} onChange={handleChange} required className="w-full border p-2 rounded" />

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Vehicle</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVehicle;