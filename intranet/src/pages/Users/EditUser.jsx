import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setForm({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          username: data.username || "",
          email: data.email || "",
          role: data.role || "",
          password: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user:", err);
        alert("Error loading user data.");
        navigate("/users");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      username: form.username,
      email: form.email,
      role: form.role,
    };

    if (form.password.trim() !== "") {
      payload.password = form.password;
    }

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      setMessage("User updated successfully.");
      setForm((prev) => ({ ...prev, password: "" }));
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      console.error("Update error:", err);
      setError("Error updating user.");
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading user data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-sm border border-gray-200 rounded-xl">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-4">
        <UserPlus size={24} /> Edit User
      </h2>

      {message && <div className="text-green-600 mb-3 text-sm">{message}</div>}
      {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border px-4 py-2 rounded text-sm"
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border px-4 py-2 rounded text-sm"
          required
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="border px-4 py-2 rounded text-sm"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border px-4 py-2 rounded text-sm"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border px-4 py-2 rounded text-sm"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="frontdesk">Frontdesk</option>
          <option value="mechanic">Mechanic</option>
        </select>

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password (leave blank to keep current)"
          className="border px-4 py-2 rounded text-sm"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
