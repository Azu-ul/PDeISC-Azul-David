import mysql2 from "mysql2/promise";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from 'fs';
import { dirname, join } from "path";

// Configuraciones para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Conexión a la base de datos
let db;
async function startServer() {
  try {
    db = await mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "usuarios",
    });

    console.log("Conexión a la base de datos establecida");

    // Rutas de la API
    app.post("/agregar_usuario", async (req, res) => {
      try {
        console.log("Datos recibidos:", req.body);

        const sql = `
          INSERT INTO usuario (nombre, apellido, direccion, celular, fecha_nacimiento, email)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
      // Asegurarse de que los datos estén en el orden correcto
        const values = [
          req.body.nombre,
          req.body.apellido,
          req.body.direccion,
          req.body.celular,
          req.body.fechaNacimiento,
          req.body.email,
        ];

        // Log de la consulta y los valores

        console.log("Ejecutando query:", sql, values);
        const [result] = await db.execute(sql, values);

        console.log("Usuario agregado con ID:", result.insertId);
        res.json({
          success: "Usuario agregado correctamente",
          id: result.insertId,
        });
      } catch (err) {
        console.error("Error en /agregar_usuario:", err);
        res
          .status(500)
          .json({ message: "Ocurrió un error inesperado: " + err.message });
      }
    });

    // Obtener todos los usuarios
    app.get("/usuarios", async (req, res) => {
      try {
        console.log("Obteniendo todos los usuarios...");
        const [rows] = await db.execute("SELECT * FROM usuario ORDER BY id DESC");
        console.log("Usuarios encontrados:", rows.length);
        res.json(rows);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ message: "Error al obtener usuarios: " + err.message });
      }
    });

    // Obtener usuario por ID
    app.get("/usuario/:id", async (req, res) => {
      try {
        console.log("Obteniendo usuario con ID:", req.params.id);
        const [rows] = await db.execute("SELECT * FROM usuario WHERE id = ?", [req.params.id]);
        
        if (rows.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        console.log("Usuario encontrado:", rows[0]);
        res.json(rows[0]);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        res.status(500).json({ message: "Error al obtener usuario: " + err.message });
      }
    });

    // Actualizar usuario
    app.put("/usuario/:id", async (req, res) => {
      try {
        console.log("Actualizando usuario con ID:", req.params.id);
        console.log("Nuevos datos:", req.body);

        const sql = `
          UPDATE usuario 
          SET nombre = ?, apellido = ?, direccion = ?, celular = ?, fecha_nacimiento = ?, email = ?
          WHERE id = ?
        `;

        const values = [
          req.body.nombre,
          req.body.apellido,
          req.body.direccion,
          req.body.celular,
          req.body.fechaNacimiento,
          req.body.email,
          req.params.id
        ];

        console.log("Ejecutando query:", sql, values);
        const [result] = await db.execute(sql, values);
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        console.log("Usuario actualizado correctamente");
        res.json({ success: "Usuario actualizado correctamente" });
      } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ message: "Error al actualizar usuario: " + err.message });
      }
    });

    // Eliminar usuario
    app.delete("/usuario/:id", async (req, res) => {
      try {
        console.log("Eliminando usuario con ID:", req.params.id);
        const [result] = await db.execute("DELETE FROM usuario WHERE id = ?", [req.params.id]);
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        console.log("Usuario eliminado correctamente");
        res.json({ success: "Usuario eliminado" });
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ message: "Error al eliminar usuario: " + err.message });
      }
    });

    // Buscar usuarios
    app.get("/buscar", async (req, res) => {
      try {
        const { q, nombre, apellido, email } = req.query;
        console.log("Parámetros de búsqueda recibidos:", { q, nombre, apellido, email });
        
        let query = 'SELECT * FROM usuario WHERE ';
        let params = [];
        let conditions = [];

        if (email) {
          // Búsqueda específica por email
          conditions.push('email LIKE ?');
          params.push(`%${email}%`);
          console.log("Búsqueda por email:", email);
        } else if (nombre && apellido) {
          // Búsqueda específica por nombre y apellido
          conditions.push('(nombre LIKE ? AND apellido LIKE ?)');
          params.push(`%${nombre}%`, `%${apellido}%`);
          console.log("Búsqueda por nombre y apellido:", nombre, apellido);
        } else if (q) {
          // Búsqueda general en todos los campos
          conditions.push('(nombre LIKE ? OR apellido LIKE ? OR email LIKE ? OR celular LIKE ? OR direccion LIKE ?)');
          params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
          console.log("Búsqueda general con término:", q);
        } else {
          return res.status(400).json({ message: 'Se requiere al menos un parámetro de búsqueda' });
        }

        query += conditions.join(' AND ');
        query += ' ORDER BY nombre, apellido';

        console.log('Query SQL final:', query);
        console.log('Parámetros SQL:', params);

        const [rows] = await db.execute(query, params);
        
        console.log(`Resultados encontrados: ${rows.length}`);
        res.json(rows);

      } catch (err) {
        console.error("Error en búsqueda:", err);
        res.status(500).json({ message: "Error en la búsqueda: " + err.message });
      }
    });

    // Ruta de prueba para verificar que la API funciona
    app.get("/api/test", (req, res) => {
      res.json({ message: "API funcionando correctamente", timestamp: new Date() });
    });

    // Servir archivos estáticos de React (si existen)
    const buildPath = path.join(__dirname, "dist"); // o "build" si usas create-react-app
    
    // Verificar si existe la carpeta de build
    if (existsSync(buildPath)) {
      // Si existe, servir los archivos estáticos
      app.use(express.static(buildPath));
      
      // Manejar todas las rutas de React Router
      app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
      });
      
      console.log("Sirviendo archivos estáticos desde:", buildPath);
    } else {
      // Si no hay build de React, mostrar mensaje informativo
      app.get("/", (req, res) => {
        res.json({
          message: "Servidor API funcionando",
          endpoints: {
            "GET /api/test": "Prueba de API",
            "GET /usuarios": "Obtener todos los usuarios",
            "GET /usuario/:id": "Obtener usuario por ID",
            "POST /agregar_usuario": "Agregar nuevo usuario", 
            "PUT /usuario/:id": "Actualizar usuario",
            "DELETE /usuario/:id": "Eliminar usuario",
            "GET /buscar?q=termino": "Buscar usuarios (mejorado)"
          },
          note: "Para servir la aplicación React, construye el proyecto con 'npm run build' y asegúrate de que esté en la carpeta 'dist' o 'build'"
        });
      });
    }

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      console.log(`API disponible en: http://localhost:${PORT}`);
      console.log(`Endpoints de API:`);
      console.log(`  - GET /api/test`);
      console.log(`  - GET /usuarios`);
      console.log(`  - GET /usuario/:id`);
      console.log(`  - POST /agregar_usuario`);
      console.log(`  - PUT /usuario/:id`);
      console.log(`  - DELETE /usuario/:id`);
      console.log(`  - GET /buscar?q=termino (mejorado)`);
    });
    
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

startServer();