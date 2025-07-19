// Archivo: intranet/src/pages/Vehicles/EditVehicle.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { getRole } from "../../utils/auth"; // 👈 asegúrate de tener esta función

const EditVehicle = () => {
  const { id } = useParams(); // vehicle_id
  const navigate = useNavigate();
  const role = getRole(); // 👈 detectamos el rol aquí

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
    client_id: null,
    last_service_date: null,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vehicle");
        return res.json();
      })
      .then((data) => {
        setForm({
          plate: data.plate,
          vin: data.vin,
          make: data.make,
          model: data.model,
          year: data.year,
          hsn: data.hsn,
          tsn: data.tsn,
          fuel_type: data.fuel_type,
          vehicle_type: data.vehicle_type,
          drive: data.drive,
          transmission: data.transmission,
          km: data.km,
          tuv_month: data.tuv_month,
          tuv_year: data.tuv_year,
          registration_date: data.registration_date?.split("T")[0] || "",
          client_id: data.client_id || null,
          last_service_date: data.last_service_date || null,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading vehicle");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const payload = {
      ...form,
      client_id: form.client_id || null,
      last_service_date: form.last_service_date || null,
    };

    try {
      console.log("Enviando payload al backend:", payload);

      const res = await fetch(`/api/vehicles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        body: JSON.stringify(payload),
      });

      console.log("Código de respuesta:", res.status);

      if (!res.ok) throw new Error("Failed to update vehicle");

      setMessage("Vehicle updated successfully");
    } catch (err) {
      console.error(err);
      setError("Error updating vehicle");
    }
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;

  if (role === "mechanic") {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded shadow text-center text-gray-700">
        Mechanics are not allowed to edit vehicles.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
        <Pencil className="w-5 h-5" /> Edit Vehicle
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="plate" placeholder="Plate" value={form.plate} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="vin" placeholder="VIN" value={form.vin} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="make" placeholder="Make" value={form.make} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="year" placeholder="Year" type="number" value={form.year} onChange={handleChange} required className="w-full border p-2 rounded" />

        <div className="flex gap-4">
          <input name="hsn" placeholder="HSN" maxLength={4} value={form.hsn} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="tsn" placeholder="TSN" maxLength={3} value={form.tsn} onChange={handleChange} required className="w-full border p-2 rounded" />
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
          <input name="tuv_month" placeholder="TÜV Month" type="number" value={form.tuv_month} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="tuv_year" placeholder="TÜV Year" type="number" value={form.tuv_year} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <input name="registration_date" placeholder="Registration Date" type="date" value={form.registration_date} onChange={handleChange} required className="w-full border p-2 rounded" />

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>

      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default EditVehicle;
