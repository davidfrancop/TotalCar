// ========================
// File: generarEstructura.js
// ========================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Reemplazo de __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ignorar = ["node_modules", ".git", "dist", ".next", ".DS_Store", "build"];

const comentarios = {
  ".env": "# Variables de entorno",
  ".gitignore": "# Archivos que Git no debe subir",
  "index.html": "# HTML principal de Vite",
  "vite.config.js": "# Configuración de Vite",
  "tailwind.config.js": "# Configuración Tailwind CSS",
  "postcss.config.js": "# Configuración PostCSS para Tailwind",
  "App.jsx": "# Rutas principales",
  "main.jsx": "# Punto de entrada (ReactDOM)",
  "App.css": "# Estilos globales personalizados",
  "index.css": "# Estilos de Tailwind",
  "package.json": "# Configuración y scripts del proyecto",
  "pool.js": "# Conexión a PostgreSQL",
  "setup.js": "# Script opcional para crear las tablas",
  "auth.js": "# Middleware de autenticación",
  "clientes.js": "# Endpoints de clientes",
  "vehiculos.js": "# Endpoints de vehículos",
  "login.js": "# Login y generación de token",
  "usuarios.js": "# Endpoints de usuarios",
  "RutaProtegida.jsx": "# Autenticación por rol",
  "README.md": "# Documentación del proyecto"
};

let output = "Totalcar/\n";

function imprimirArbol(dir, prefijo = "") {
  const archivos = fs.readdirSync(dir).filter(f => !ignorar.includes(f));
  archivos.sort();

  archivos.forEach((archivo, i) => {
    const ruta = path.join(dir, archivo);
    const esUltimo = i === archivos.length - 1;
    const simbolo = esUltimo ? "└──" : "├──";
    const comentario = comentarios[archivo] ? "  " + comentarios[archivo] : "";
    const linea = `${prefijo}${simbolo} ${archivo}${comentario}`;
    output += linea + "\n";

    if (fs.statSync(ruta).isDirectory()) {
      const nuevoPrefijo = prefijo + (esUltimo ? "    " : "│   ");
      imprimirArbol(ruta, nuevoPrefijo);
    }
  });
}

["backend", "intranet", "web"].forEach((carpeta, i, arr) => {
  const esUltimo = i === arr.length - 1;
  const simbolo = esUltimo ? "└──" : "├──";
  output += `${simbolo} ${carpeta}/\n`;
  imprimirArbol(path.join(__dirname, carpeta), esUltimo ? "    " : "│   ");
});

fs.writeFileSync("estructura.txt", output, "utf-8");
console.log("✅ Archivo 'estructura.txt' generado correctamente.");
