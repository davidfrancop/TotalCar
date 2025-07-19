// File: src/pages/Clients/Clients.jsx (Nueva versión)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Pencil, Trash2 } from "lucide-react"; // Importa Pencil y Trash2 para los botones de acción

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Estado de error
  const navigate = useNavigate();

  // Función para cargar los clientes
  const fetchClients = async () => {
    setLoading(true);
    setError(null); // Limpiar errores anteriores
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) {
        // Manejo de errores más robusto si la respuesta no es OK
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch clients");
      }
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error("Error loading clients:", err);
      setError(err.message); // Guardar el mensaje de error
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  useEffect(() => {
    fetchClients();
  }, []); // Se ejecuta una vez al montar

  const handleDelete = async (id) => {
    // Reemplaza window.confirm con un modal personalizado si estás en un entorno de producción
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Si la eliminación es exitosa, refresca la lista completa
        alert("Client deleted successfully!");
        fetchClients();
      } else {
        const errorData = await res.json();
        console.error("Error deleting client:", errorData);
        alert("Error deleting client: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error deleting client: " + err.message);
    }
  };

  const filteredClients = clients.filter((client) =>
    `${client.first_name || ''} ${client.last_name || ''} ${client.email || ''} ${client.phone_number || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading clients...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-full mx-auto"> {/* Ajustado a max-w-full para mejor responsividad */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"> {/* Gap para espacio en móvil */}
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:max-w-xs text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={() => navigate("/clients/new")}
          className="flex items-center gap-2 text-blue-600 hover:text-green-600 font-medium transition w-full sm:w-auto justify-center sm:ml-4 py-2 px-4 border border-blue-600 rounded hover:bg-blue-50"
        > {/* Mejorado el estilo del botón */}
          <UserPlus size={20} />
          New Client
        </button>
      </div>

      {filteredClients.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No clients found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Vehicles</th> {/* Columna de vehículos */}
                <th className="px-4 py-3 text-center">Actions</th> {/* Centrado para los botones */}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.client_id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {client.first_name} {client.last_name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{client.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{client.phone_number}</td>
                  <td className="px-4 py-3">
                    {/* Mostrar todos los vehículos asociados, si los hay */}
                    {client.vehicles && client.vehicles.length > 0 ? (
                      client.vehicles.map((v) => (
                        <span key={v.vehicle_id} className="block text-gray-700 text-xs">
                          {v.plate} ({v.make} {v.model})
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">No vehicle</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() =>
                        navigate(`/clients/edit/${client.client_id}`)
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm p-1 rounded-md inline-flex items-center"
                      title="Edit Client"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(client.client_id)}
                      className="text-red-600 hover:text-red-800 text-sm p-1 rounded-md inline-flex items-center ml-2"
                      title="Delete Client"
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
}