import mysql2 from "mysql2/promise";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { dirname, join } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Configuraciones para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = "tu_secreto_jwt_super_seguro_aqui"; // En producción usar variable de entorno

// Middleware para verificar JWT
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verificar que el usuario aún existe
    const [rows] = await db.execute(
      "SELECT * FROM usuario WHERE id = ? AND activo = true",
      [decoded.userId]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para verificar rol admin
const requireAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({
      message: "Acceso denegado: se requieren permisos de administrador",
    });
  }
  next();
};

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

    // Función para crear usuario admin por defecto
    async function createDefaultAdmin() {
      try {
        // Verificar si ya existe un admin
        const [existingAdmin] = await db.execute(
          'SELECT id FROM usuario WHERE rol = "admin" LIMIT 1'
        );

        if (existingAdmin.length === 0) {
          const hashedPassword = await bcrypt.hash("azulsofia06", 10);
          await db.execute(
            `
            INSERT INTO usuario (nombre, apellido, email, password, rol, activo) 
            VALUES (?, ?, ?, ?, ?, ?)
          `,
            [
              "Azul",
              "Sofia",
              "azulsofiadavid@gmail.com",
              hashedPassword,
              "admin",
              true,
            ]
          );

          console.log("✅ Usuario admin creado por defecto:");
          console.log("   📧 Email: azulsofiadavid@gmail.com");
          console.log("   🔑 Password: azulsofia06");
          console.log("   👤 Rol: admin");
        } else {
          console.log("✅ Ya existe un usuario admin en el sistema");
        }
      } catch (err) {
        console.error("❌ Error creando admin por defecto:", err);
      }
    }

    console.log("Conexión a la base de datos establecida");
    await createDefaultAdmin();

    // ========== RUTAS DE AUTENTICACIÓN ==========

    // Login
    app.post("/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log("Intento de login para:", email);

        // Validar datos
        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "Email y contraseña son requeridos" });
        }

        // Buscar usuario
        const [rows] = await db.execute(
          "SELECT * FROM usuario WHERE email = ? AND activo = true",
          [email]
        );

        if (rows.length === 0) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const user = rows[0];

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Generar token
        const token = jwt.sign(
          { userId: user.id, email: user.email, rol: user.rol },
          JWT_SECRET,
          { expiresIn: "24h" }
        );

        // Remover password de la respuesta
        const { password: _, ...userWithoutPassword } = user;

        console.log("Login exitoso para:", email);
        res.json({
          token,
          user: userWithoutPassword,
        });
      } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
    });

    // Registro
    app.post("/auth/register", async (req, res) => {
      try {
        const {
          nombre,
          apellido,
          email,
          password,
          celular,
          direccion,
          fechaNacimiento,
        } = req.body;
        console.log("Intento de registro para:", email);

        // Validar datos requeridos
        if (!nombre || !apellido || !email || !password) {
          return res.status(400).json({
            message: "Nombre, apellido, email y contraseña son requeridos",
          });
        }

        // Verificar si el email ya existe
        const [existingUser] = await db.execute(
          "SELECT id FROM usuario WHERE email = ?",
          [email]
        );

        if (existingUser.length > 0) {
          return res
            .status(409)
            .json({ message: "El email ya está registrado" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const [result] = await db.execute(
          `INSERT INTO usuario (nombre, apellido, email, password, celular, direccion, fecha_nacimiento, rol, activo) 
           VALUES (?, ?, ?, ?, ?, ?, ?, 'user', true)`,
          [
            nombre,
            apellido,
            email,
            hashedPassword,
            celular,
            direccion,
            fechaNacimiento,
          ]
        );

        // Generar token para el nuevo usuario
        const token = jwt.sign(
          { userId: result.insertId, email, rol: "user" },
          JWT_SECRET,
          { expiresIn: "24h" }
        );

        const newUser = {
          id: result.insertId,
          nombre,
          apellido,
          email,
          celular,
          direccion,
          fecha_nacimiento: fechaNacimiento,
          rol: "user",
          activo: true,
        };

        console.log("Registro exitoso para:", email);
        res.status(201).json({
          token,
          user: newUser,
        });
      } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
    });

    // Verificar token
    app.get("/auth/verify", verifyToken, (req, res) => {
      const { password: _, ...userWithoutPassword } = req.user;
      res.json({ user: userWithoutPassword });
    });

    // Agregar esta nueva ruta después de las rutas de autenticación existentes, antes de las rutas protegidas

    // Cambiar contraseña (usuario autenticado)
    app.put("/auth/change-password", verifyToken, async (req, res) => {
      try {
        const { newPassword, confirmPassword } = req.body;
        const userId = req.user.id;

        console.log("Intento de cambio de contraseña para usuario ID:", userId);

        // Validar datos
        if (!newPassword || !confirmPassword) {
          return res.status(400).json({
            message: "Nueva contraseña y confirmación son requeridas",
          });
        }

        // Verificar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
          return res
            .status(400)
            .json({ message: "Las contraseñas no coinciden" });
        }

        // Validar longitud mínima
        if (newPassword.length < 6) {
          return res.status(400).json({
            message: "La contraseña debe tener al menos 6 caracteres",
          });
        }

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña en la base de datos
        const [result] = await db.execute(
          "UPDATE usuario SET password = ? WHERE id = ?",
          [hashedPassword, userId]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log(
          "Contraseña actualizada exitosamente para usuario ID:",
          userId
        );
        res.json({ message: "Contraseña actualizada correctamente" });
      } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
    });

    // Resetear contraseña (usuario NO autenticado)
    app.put("/auth/reset-password", async (req, res) => {
      try {
        const { email, newPassword, confirmPassword } = req.body;

        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
          return res
            .status(400)
            .json({ message: "Las contraseñas no coinciden" });
        }

        // Verificar que el usuario existe
        const [users] = await db.execute(
          "SELECT * FROM usuario WHERE email = ? AND activo = true",
          [email]
        );

        if (users.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña
        await db.execute("UPDATE usuario SET password = ? WHERE email = ?", [
          hashedPassword,
          email,
        ]);

        res.json({ message: "Contraseña actualizada correctamente" });
      } catch (error) {
        console.error("Error al resetear contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
    });

    // ========== RUTAS PROTEGIDAS DE USUARIOS ==========

    // Agregar usuario (solo admin)
    app.post(
      "/agregar_usuario",
      verifyToken,
      requireAdmin,
      async (req, res) => {
        try {
          console.log("Datos recibidos:", req.body);

          const sql = `
          INSERT INTO usuario (nombre, apellido, direccion, celular, fecha_nacimiento, email, password, rol, activo)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'user', true)
        `;

          // Generar contraseña temporal
          const tempPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(tempPassword, 10);

          const values = [
            req.body.nombre,
            req.body.apellido,
            req.body.direccion,
            req.body.celular,
            req.body.fechaNacimiento,
            req.body.email,
            hashedPassword,
          ];

          console.log("Ejecutando query:", sql, values);
          const [result] = await db.execute(sql, values);

          console.log("Usuario agregado con ID:", result.insertId);
          res.json({
            success: "Usuario agregado correctamente",
            id: result.insertId,
            tempPassword: tempPassword, // En producción, enviar por email
          });
        } catch (err) {
          console.error("Error en /agregar_usuario:", err);
          res
            .status(500)
            .json({ message: "Ocurrió un error inesperado: " + err.message });
        }
      }
    );

    // Obtener todos los usuarios (solo admin)
    app.get("/usuarios", verifyToken, requireAdmin, async (req, res) => {
      try {
        console.log("Obteniendo todos los usuarios...");
        const [rows] = await db.execute(
          "SELECT id, nombre, apellido, email, celular, direccion, fecha_nacimiento, rol, activo FROM usuario ORDER BY id DESC"
        );
        console.log("Usuarios encontrados:", rows.length);
        res.json(rows);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res
          .status(500)
          .json({ message: "Error al obtener usuarios: " + err.message });
      }
    });

    // Obtener usuario por ID (solo admin)
    app.get("/usuario/:id", verifyToken, requireAdmin, async (req, res) => {
      try {
        console.log("Obteniendo usuario con ID:", req.params.id);
        const [rows] = await db.execute(
          "SELECT id, nombre, apellido, email, celular, direccion, fecha_nacimiento, rol, activo FROM usuario WHERE id = ?",
          [req.params.id]
        );

        if (rows.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log("Usuario encontrado:", rows[0]);
        res.json(rows[0]);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        res
          .status(500)
          .json({ message: "Error al obtener usuario: " + err.message });
      }
    });

    // Actualizar usuario (solo admin)
    app.put("/usuario/:id", verifyToken, requireAdmin, async (req, res) => {
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
          req.params.id,
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
        res
          .status(500)
          .json({ message: "Error al actualizar usuario: " + err.message });
      }
    });

    // Eliminar usuario (solo admin)
    app.delete("/usuario/:id", verifyToken, requireAdmin, async (req, res) => {
      try {
        console.log("Eliminando usuario con ID:", req.params.id);
        const [result] = await db.execute("DELETE FROM usuario WHERE id = ?", [
          req.params.id,
        ]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log("Usuario eliminado correctamente");
        res.json({ success: "Usuario eliminado" });
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res
          .status(500)
          .json({ message: "Error al eliminar usuario: " + err.message });
      }
    });

    // Buscar usuarios (usuarios autenticados)
    app.get("/buscar", verifyToken, async (req, res) => {
      try {
        const { q, nombre, apellido, email } = req.query;
        console.log("Parámetros de búsqueda recibidos:", {
          q,
          nombre,
          apellido,
          email,
        });

        let query =
          "SELECT id, nombre, apellido, email, celular, direccion, fecha_nacimiento, rol FROM usuario WHERE activo = true AND ";
        let params = [];
        let conditions = [];

        if (email) {
          conditions.push("email LIKE ?");
          params.push(`%${email}%`);
          console.log("Búsqueda por email:", email);
        } else if (nombre && apellido) {
          conditions.push("(nombre LIKE ? AND apellido LIKE ?)");
          params.push(`%${nombre}%`, `%${apellido}%`);
          console.log("Búsqueda por nombre y apellido:", nombre, apellido);
        } else if (q) {
          conditions.push(
            "(nombre LIKE ? OR apellido LIKE ? OR email LIKE ? OR celular LIKE ? OR direccion LIKE ?)"
          );
          params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
          console.log("Búsqueda general con término:", q);
        } else {
          return res
            .status(400)
            .json({ message: "Se requiere al menos un parámetro de búsqueda" });
        }

        query += conditions.join(" AND ");
        query += " ORDER BY nombre, apellido";

        console.log("Query SQL final:", query);
        console.log("Parámetros SQL:", params);

        const [rows] = await db.execute(query, params);

        console.log(`Resultados encontrados: ${rows.length}`);
        res.json(rows);
      } catch (err) {
        console.error("Error en búsqueda:", err);
        res
          .status(500)
          .json({ message: "Error en la búsqueda: " + err.message });
      }
    });

    // Ruta de prueba para verificar que la API funciona
    app.get("/api/test", (req, res) => {
      res.json({
        message: "API funcionando correctamente",
        timestamp: new Date(),
      });
    });

    // Servir archivos estáticos de React (si existen)
    const buildPath = path.join(__dirname, "dist");

    if (existsSync(buildPath)) {
      app.use(express.static(buildPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
      });
      console.log("Sirviendo archivos estáticos desde:", buildPath);
    } else {
      app.get("/", (req, res) => {
        res.json({
          message: "Servidor API funcionando",
          endpoints: {
            "POST /auth/login": "Iniciar sesión",
            "POST /auth/register": "Registrar usuario",
            "GET /auth/verify": "Verificar token",
            "GET /api/test": "Prueba de API",
            "GET /usuarios": "Obtener todos los usuarios (admin)",
            "GET /usuario/:id": "Obtener usuario por ID (admin)",
            "POST /agregar_usuario": "Agregar nuevo usuario (admin)",
            "PUT /usuario/:id": "Actualizar usuario (admin)",
            "DELETE /usuario/:id": "Eliminar usuario (admin)",
            "GET /buscar?q=termino": "Buscar usuarios (autenticado)",
          },
          note: "Para servir la aplicación React, construye el proyecto con 'npm run build'",
        });
      });
    }

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      console.log(`API disponible en: http://localhost:${PORT}`);
      console.log(`Endpoints de API:`);
      console.log(`  - POST /auth/login`);
      console.log(`  - POST /auth/register`);
      console.log(`  - GET /auth/verify`);
      console.log(`  - GET /usuarios (admin)`);
      console.log(`  - GET /usuario/:id (admin)`);
      console.log(`  - POST /agregar_usuario (admin)`);
      console.log(`  - PUT /usuario/:id (admin)`);
      console.log(`  - DELETE /usuario/:id (admin)`);
      console.log(`  - GET /buscar (autenticado)`);
    });
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

startServer();
