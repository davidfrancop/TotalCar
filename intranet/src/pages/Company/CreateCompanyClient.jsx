// File: src/pages/Company/CreateCompanyClient.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function CreateCompanyClient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    registration_number: "",
    email: "",
    phone: "",
    contact_person: "",
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
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .map(c => c.name.common)
          .sort((a, b) => a.localeCompare(b));
        if (form.country && !sorted.includes(form.country)) {
          sorted.unshift(form.country);
        }
        setCountries(sorted);
      })
      .catch(err => console.error("Error loading countries:", err));
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
          fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(value)}`)
            .then(res => res.json())
            .then(data => setAddressSuggestions(data.slice(0, 5)))
            .catch(err => console.error("Address lookup error:", err));
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
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        navigate("/clients");
      } else {
        console.error("Failed to create company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create Company Client</h2>
        <button
          onClick={() => navigate("/clients")}
          className="flex items-center gap-2 text-blue-600 hover:text-green-600 font-medium transition"
        >
          <UserPlus size={18} /> Back to Clients
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Company name"
            value={form.name}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="registration_number"
            placeholder="Registration number"
            value={form.registration_number}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="contact_person"
            placeholder="Contact person"
            value={form.contact_person}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />

          <div className="relative md:col-span-2">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={form.street}
              onChange={handleStreetInput}
              className="border px-4 py-2 rounded w-full"
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
            placeholder="House number"
            value={form.house_number}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="postal_code"
            placeholder="Postal code"
            value={form.postal_code}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={form.region}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />

          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded text-gray-500"
          >
            <option value="" disabled>Country</option>
            {countries.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 text-blue-600 hover:text-green-600 font-medium transition mt-6"
        >
          <UserPlus size={18} /> Save Company
        </button>
      </form>
    </div>
  );
}
