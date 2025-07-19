// ========================
// Archivo: src/App.jsx
// ========================
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas públicas
import Inicio from './pages/Inicio';
import Promociones from './pages/Promociones';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

// Página 404 sencilla
function PaginaNoEncontrada() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-3xl font-bold mb-2">404</h2>
      <p className="text-lg text-gray-500">Página no encontrada</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
