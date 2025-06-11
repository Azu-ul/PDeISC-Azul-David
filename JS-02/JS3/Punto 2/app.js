const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/plain' || file.originalname.endsWith('.txt')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos .txt'), false);
        }
    }
});

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Función para verificar si un número empieza y termina con el mismo dígito
function empiezaYTerminaIgual(numero) {
    const str = numero.toString();
    return str[0] === str[str.length - 1];
}

// Función para procesar archivo de números
function procesarArchivo(filePath) {
    try {
        const contenido = fs.readFileSync(filePath, 'utf8');
        const numeros = contenido.split('\n')
            .map(line => line.trim())
            .filter(line => line !== '' && !isNaN(line))
            .map(line => parseInt(line));

        // Filtrar números que empiezan y terminan igual
        const numerosUtiles = numeros.filter(empiezaYTerminaIgual);
        const numerosNoUtiles = numeros.filter(num => !empiezaYTerminaIgual(num));

        // Ordenar números útiles de forma ascendente
        numerosUtiles.sort((a, b) => a - b);

        // Calcular estadísticas
        const totalNumeros = numeros.length;
        const cantidadUtiles = numerosUtiles.length;
        const cantidadNoUtiles = numerosNoUtiles.length;
        const porcentajeUtiles = totalNumeros > 0 ? ((cantidadUtiles / totalNumeros) * 100).toFixed(2) : 0;

        return {
            todosLosNumeros: numeros,
            numerosUtiles,
            numerosNoUtiles,
            estadisticas: {
                totalNumeros,
                cantidadUtiles,
                cantidadNoUtiles,
                porcentajeUtiles
            }
        };
    } catch (error) {
        throw new Error('Error al procesar el archivo: ' + error.message);
    }
}

// Función para guardar resultados en archivo
function guardarResultados(resultados, outputPath) {
    let contenido = `=== RESULTADOS DEL FILTRADO ===\n\n`;
    contenido += `Números que empiezan y terminan con el mismo dígito (ordenados):\n`;
    contenido += resultados.numerosUtiles.join(', ') + '\n\n';
    
    contenido += `=== ESTADÍSTICAS ===\n`;
    contenido += `Total de números procesados: ${resultados.estadisticas.totalNumeros}\n`;
    contenido += `Números útiles: ${resultados.estadisticas.cantidadUtiles}\n`;
    contenido += `Números no útiles: ${resultados.estadisticas.cantidadNoUtiles}\n`;
    contenido += `Porcentaje de números útiles: ${resultados.estadisticas.porcentajeUtiles}%\n\n`;
    
    contenido += `=== NÚMEROS NO ÚTILES ===\n`;
    contenido += resultados.numerosNoUtiles.join(', ') + '\n';

    fs.writeFileSync(outputPath, contenido, 'utf8');
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
//index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', upload.single('archivo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó archivo' });
        }

        const filePath = req.file.path;
        const resultados = procesarArchivo(filePath);

        // Crear directorio de resultados si no existe
        const resultsDir = './results/';
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        // Guardar resultados en archivo
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `resultados-${timestamp}.txt`;
        const outputPath = path.join(resultsDir, fileName);
        guardarResultados(resultados, outputPath);

        // Limpiar archivo temporal
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            resultados: resultados,
            archivoResultado: fileName
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'results', filename);
    
    console.log('Intentando descargar:', filePath); // Para debugging
    
    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Error en descarga:', err);
                res.status(500).json({ error: 'Error al descargar archivo' });
            }
        });
    } else {
        console.log('Archivo no encontrado:', filePath);
        res.status(404).json({ error: 'Archivo no encontrado' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Presiona Ctrl+C para detener el servidor');
});

module.exports = app;

