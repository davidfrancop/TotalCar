// Archivo: src/pages/Users/Users.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.178.36:4000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Error loading users:", err);
        setError("Error loading users. Check server connection.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = () => {
    navigate("/users/new");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://192.168.178.36:4000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((user) => user.user_id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user.");
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:max-w-xs text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 text-blue-600 hover:text-green-600 font-medium transition w-full sm:w-auto justify-center sm:ml-4 py-2 px-4 border border-blue-600 rounded hover:bg-blue-50"
        >
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No users found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.user_id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{u.username}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">{u.role}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.email}</td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/users/edit/${u.user_id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm p-1 rounded-md inline-flex items-center"
                      title="Edit User"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(u.user_id)}
                      className="text-red-600 hover:text-red-800 text-sm p-1 rounded-md inline-flex items-center ml-2"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
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

export default Users;
