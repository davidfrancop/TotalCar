// File: src/pages/Clients/CreateClient.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function CreateClient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    client_type: "individual",
    first_name: "",
    last_name: "",
    dni: "", // 👈 Añadido
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

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b));
        if (form.country && !sorted.includes(form.country)) {
          sorted.unshift(form.country);
        }
        setCountries(sorted);
      })
      .catch((err) => console.error("Error loading countries:", err));
  }, [form.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleStreetInput = (e) => {
    const value = e.target.value;
    setForm({ ...form, street: value });

    clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        if (value.length > 5) {
          fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
              value
            )}`
          )
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

    const payload = {
      ...form,
      country: form.country?.trim() || "Germany",
    };

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error saving client");

      const data = await res.json();
      const clientId = data.client_id;
      navigate(`/vehicles/new/${clientId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <UserPlus size={28} /> New Client
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Client Type</label>
        <select
          name="client_type"
          value={form.client_type}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "company") {
              navigate("/clients/new/company");
            } else {
              setForm({ ...form, client_type: value });
            }
          }}
          className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
        >
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        {form.client_type === "individual" && (
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={form.dni}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <div className="relative md:col-span-2">
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleStreetInput}
            className="border px-3 py-2 rounded w-full"
            autoComplete="off"
          />
          {addressSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded w-full max-h-48 overflow-y-auto mt-1 shadow">
              {addressSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleAddressSelect(item)}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          name="house_number"
          placeholder="House Number"
          value={form.house_number}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={form.postal_code}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={form.region}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="border px-3 py-2 rounded text-gray-700"
          required
        >
          <option value="" disabled>
            Country
          </option>
          {countries.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2 w-fit"
        >
          <UserPlus size={18} /> Next
        </button>
      </form>
    </div>
  );
}
