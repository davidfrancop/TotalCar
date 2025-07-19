# 🚗 TotalCar

**TotalCar** is a complete automotive management system designed for modern auto repair shops. It includes:

- 🔧 A backend API built with **Express.js** and **PostgreSQL**
- 🛠 An administrative intranet built with **React + Vite + Tailwind CSS**
- 🌐 A public website for showcasing services, contact, and promotions

---

## 📁 Project Structure

```
Totalcar/
├── backend/
│   ├── .env
│   ├── db/
│   │   └── pool.js
│   ├── db.js
│   ├── index.js
│   ├── controladores/
│   │   ├── appointmentsController.js
│   │   ├── clientsController.js
│   │   ├── companiesController.js
│   │   ├── inspectionTemplatesController.js
│   │   ├── loginController.js
│   │   ├── preWorkOrdersController.js
│   │   ├── usersController.js
│   │   └── vehiclesController.js
│   ├── modelos/
│   │   ├── clients.js
│   │   ├── companies.js
│   │   ├── inspectionTemplates.js
│   │   ├── preWorkOrders.js
│   │   ├── users.js
│   │   └── vehicles.js
│   ├── rutas/
│   │   ├── appointments.js
│   │   ├── clients.js
│   │   ├── companies.js
│   │   ├── inspectionTemplates.js
│   │   ├── login.js
│   │   ├── preWorkOrders.js
│   │   ├── users.js
│   │   └── vehicles.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── package.json
│   └── package-lock.json

├── intranet/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── img/
│   │       └── TotalCar_Logo_Transparent.png
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── utils/
│   │   │   └── auth.js
│   │   ├── components/
│   │   │   ├── AppointmentPreview.jsx
│   │   │   ├── RecentWorkOrdersTable.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SummaryCards.jsx
│   │   └── pages/
│   │       ├── Admin/AdminDashboard.jsx
│   │       ├── Appointments/
│   │       │   ├── Appointments.jsx
│   │       │   ├── CreateAppointment.jsx
│   │       │   └── ViewAppointmentsByDay.jsx
│   │       ├── Clients/
│   │       │   ├── Clients.jsx
│   │       │   ├── CreateClient.jsx
│   │       │   └── EditClient.jsx
│   │       ├── Company/CreateCompanyClient.jsx
│   │       ├── FrontDesk/FrontdeskDashboard.jsx
│   │       ├── IntranetLogin.jsx
│   │       ├── Invoices/Invoices.jsx
│   │       ├── Mechanic/MechanicDashboard.jsx
│   │       ├── RedirectByRole.jsx
│   │       ├── Unauthorized.jsx
│   │       ├── Users/
│   │       │   ├── CreateUser.jsx
│   │       │   ├── EditUser.jsx
│   │       │   └── Users.jsx
│   │       └── Vehicles/
│   │           ├── CreateVehicle.jsx
│   │           ├── EditVehicle.jsx
│   │           └── Vehicles.jsx

├── web/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── img/
│   │       └── TotalCar_Logo_Transparent.png
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── data/
│   │   │   ├── clientes.js
│   │   │   └── usuarios.js
│   │   ├── components/
│   │   │   ├── BannerPromocion.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── ServicioCard.jsx
│   │   └── pages/
│   │       ├── Contacto.jsx
│   │       ├── Inicio.jsx
│   │       ├── Nosotros.jsx
│   │       ├── Promociones.jsx
│   │       └── Servicios.jsx
```

---

## 🔐 Roles

| Role       | Permissions                                          |
|------------|------------------------------------------------------|
| `admin`    | Full access to users, data, dashboards               |
| `frontdesk`| Manage clients, vehicles, appointments, work orders |
| `mechanic` | View-only access to assigned work orders            |

---

## 🌍 Environment Variables

### Backend `.env` file:

```env
PORT=4000
DATABASE_URL=postgres://username:password@localhost:5432/totalcar
JWT_SECRET=your_secret_key
```

---

## 📄 License

MIT — use it, modify it, grow it.

---

## 👨‍🔧 Author

Created by **TotalCar** — for mechanics, by mechanics.
