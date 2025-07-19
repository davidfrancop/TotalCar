// Archivo: intranet/src/pages/Clients/EditClient.jsx

import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserPlus, PlusCircle, Pencil } from "lucide-react";

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    client_type: "individual",
    first_name: "",
    last_name: "",
    dni: "",
    email: "",
    phone_number: "",
    street: "",
    house_number: "",
    postal_code: "",
    city: "",
    region: "",
    country: "",
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [countries, setCountries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loadingClient, setLoadingClient] = useState(true);
  const [errorClient, setErrorClient] = useState(null);
  const [refreshVehicles, setRefreshVehicles] = useState(0);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.map((c) => c.name.common).sort();
        if (form.country && !sorted.includes(form.country)) {
          setCountries([form.country, ...sorted]);
        } else {
          setCountries(sorted);
        }
      })
      .catch((err) => console.error("Error loading countries:", err));
  }, [form.country]);

  const fetchClientDataAndVehicles = useCallback(async () => {
    setLoadingClient(true);
    setErrorClient(null);
    try {
      const res = await fetch(`/api/clients/${id}`);
      if (!res.ok) throw new Error("Failed to fetch client data");
      const data = await res.json();
      setForm({
        client_type: data.client_type || "individual",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        dni: data.dni || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        street: data.street || "",
        house_number: data.house_number || "",
        postal_code: data.postal_code || "",
        city: data.city || "",
        region: data.region || "",
        country: data.country || "",
      });
      setVehicles(data.vehicles || []);
    } catch (err) {
      setErrorClient("Failed to load client details: " + err.message);
    } finally {
      setLoadingClient(false);
    }
  }, [id, refreshVehicles]);

  useEffect(() => {
    fetchClientDataAndVehicles();
  }, [fetchClientDataAndVehicles]);

  useEffect(() => {
    const handlePopState = () => setRefreshVehicles((prev) => prev + 1);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStreetInput = (e) => {
    const value = e.target.value;
    setForm({ ...form, street: value });
    clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        if (value.length > 5) {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(value)}`)
            .then((res) => res.json())
            .then((data) => setAddressSuggestions(data.slice(0, 5)))
            .catch((err) => console.error("Address lookup error:", err));
        } else {
          setAddressSuggestions([]);
        }
      }, 400)
    );
  };

  const handleAddressSelect = (suggestion) => {
    const address = suggestion.address;
    setForm({
      ...form,
      street: address.road || suggestion.display_name.split(",")[0] || "",
      house_number: address.house_number || "",
      postal_code: address.postcode || "",
      city: address.city || address.town || address.village || "",
      region: address.state || "",
      country: address.country || "",
    });
    setAddressSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Client updated successfully!");
    } catch (err) {
      alert("Error updating client: " + err.message);
    }
  };

  if (loadingClient) return <div className="p-6 text-center text-gray-600">Loading client data...</div>;
  if (errorClient) return <div className="p-6 text-center text-red-600">Error: {errorClient}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <UserPlus size={28} /> Edit Client
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">Client Type</label>
        <select
          name="client_type"
          value={form.client_type}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded text-sm text-gray-700 focus:ring focus:ring-blue-200"
        >
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        {form.client_type === "individual" && (
          <input type="text" name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        )}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        <input type="tel" name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        <div className="relative md:col-span-2">
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleStreetInput}
            className="border px-4 py-2 rounded w-full text-sm"
            autoComplete="off"
          />
          {addressSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded w-full max-h-48 overflow-y-auto mt-1 shadow">
              {addressSuggestions.map((item, idx) => (
                <li key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" onClick={() => handleAddressSelect(item)}>
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type="text" name="house_number" placeholder="House Number" value={form.house_number} onChange={handleChange} className="border px-4 py-2 rounded text-sm" />
        <input type="text" name="postal_code" placeholder="Postal Code" value={form.postal_code} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required className="border px-4 py-2 rounded text-sm" />
        <input type="text" name="region" placeholder="Region" value={form.region} onChange={handleChange} className="border px-4 py-2 rounded text-sm" />
        <select name="country" value={form.country} onChange={handleChange} required className="border px-4 py-2 rounded text-sm text-gray-700">
          <option value="" disabled>Country</option>
          {countries.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2 w-fit"
        >
          <UserPlus size={18} /> Update
        </button>
      </form>

      {/* Vehículos asociados */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Associated Vehicles</h3>
          <button
            onClick={() => navigate(`/vehicles/new/${id}`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 text-sm"
          >
            <PlusCircle size={18} /> Add Vehicle
          </button>
        </div>

        {vehicles.length === 0 ? (
          <p className="text-gray-500 text-sm">No vehicles registered.</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">Plate</th>
                  <th className="px-4 py-2 text-left">Make</th>
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-left">VIN</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.vehicle_id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{v.plate}</td>
                    <td className="px-4 py-2">{v.make}</td>
                    <td className="px-4 py-2">{v.model}</td>
                    <td className="px-4 py-2">{v.year}</td>
                    <td className="px-4 py-2">{v.vin}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => navigate(`/vehicles/edit/${v.vehicle_id}`)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
