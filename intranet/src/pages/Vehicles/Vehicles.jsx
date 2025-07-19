
// Archivo: src/pages/Vehicles/Vehicles.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { getRole } from "../../utils/auth";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    fetch("/api/vehicles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch((err) => {
        console.error("Error loading vehicles:", err);
        setError("Error loading vehicles.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = () => navigate("/vehicles/new");

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete vehicle");

      setVehicles((prev) => prev.filter((v) => v.vehicle_id !== id));
      alert("Vehicle deleted successfully!");
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("Error deleting vehicle.");
    }
  };

  const filtered = vehicles.filter((v) =>
    `${v.plate} ${v.vin} ${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6 text-center text-gray-600">Loading vehicles...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:max-w-xs text-sm"
        />
        {role !== "mechanic" && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 text-blue-600 hover:text-green-600 font-medium transition w-full sm:w-auto justify-center sm:ml-4 py-2 px-4 border border-blue-600 rounded hover:bg-blue-50"
          >
            <PlusCircle size={20} />
            Add Vehicle
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No vehicles found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Plate</th>
                <th className="px-4 py-3">Make</th>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">VIN</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.vehicle_id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{v.plate}</td>
                  <td className="px-4 py-3">{v.make}</td>
                  <td className="px-4 py-3">{v.model}</td>
                  <td className="px-4 py-3">{v.year}</td>
                  <td className="px-4 py-3">{v.vin}</td>
                  <td className="px-4 py-3 text-center">
                    {role !== "mechanic" && (
                      <>
                        <button
                          onClick={() => navigate(`/vehicles/edit/${v.vehicle_id}`)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit Vehicle"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(v.vehicle_id)}
                          className="text-red-600 hover:text-red-800 p-1 ml-2"
                          title="Delete Vehicle"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
