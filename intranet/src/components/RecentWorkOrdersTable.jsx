// Archivo: totalcar-intranet/src/components/RecentWorkOrdersTable.jsx

export default function RecentWorkOrdersTable() {
  const orders = [
    { id: "#ORD-001", client: "John Doe", vehicle: "Ford Fiesta 2018", status: "Completed" },
    { id: "#ORD-002", client: "María López", vehicle: "Volkswagen Golf 2020", status: "Pending" },
    { id: "#ORD-003", client: "Alex Müller", vehicle: "BMW i3 2022", status: "Cancelled" },
  ];

  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700 whitespace-nowrap">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Vehicle</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-3">{order.id}</td>
              <td className="px-4 py-3">{order.client}</td>
              <td className="px-4 py-3">{order.vehicle}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
