const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta para guardar números
app.post('/guardar-numeros', (req, res) => {
    try {
        const { numeros } = req.body;
       
        if (!numeros || !Array.isArray(numeros)) {
            return res.status(400).json({ error: 'Formato de datos inválido' });
        }

        if (numeros.length < 10 || numeros.length > 20) {
            return res.status(400).json({ error: 'Debe ingresar entre 10 y 20 números' });
        }

        // Crear contenido del archivo - SOLO NÚMEROS CON SALTOS DE LÍNEA
        let contenido = '';
        numeros.forEach((numero, index) => {
            contenido += numero;
            // Agregar salto de línea excepto en el último número
            if (index < numeros.length - 1) {
                contenido += '\n';
            }
        });

        // Crear nombre del archivo con timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const nombreArchivo = `numeros_${timestamp}.txt`;
        const rutaArchivo = path.join(__dirname, 'archivos', nombreArchivo);

        // Crear directorio si no existe
        if (!fs.existsSync(path.join(__dirname, 'archivos'))) {
            fs.mkdirSync(path.join(__dirname, 'archivos'));
        }

        // Guardar archivo
        fs.writeFileSync(rutaArchivo, contenido, 'utf8');

        res.json({
            success: true,
            mensaje: 'Archivo guardado exitosamente',
            archivo: nombreArchivo,
            ruta: rutaArchivo
        });

    } catch (error) {
        console.error('Error al guardar archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para descargar archivo
app.get('/descargar/:archivo', (req, res) => {
    try {
        const nombreArchivo = req.params.archivo;
        const rutaArchivo = path.join(__dirname, 'archivos', nombreArchivo);

        if (fs.existsSync(rutaArchivo)) {
            res.download(rutaArchivo);
        } else {
            res.status(404).json({ error: 'Archivo no encontrado' });
        }
    } catch (error) {
        console.error('Error al descargar archivo:', error);
        res.status(500).json({ error: 'Error al descargar archivo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});