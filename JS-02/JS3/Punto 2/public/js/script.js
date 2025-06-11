const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const downloadBtn = document.getElementById('downloadBtn');

let selectedFile = null;
let resultFileName = null;

// Eventos de drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
        showError('Por favor selecciona un archivo .txt válido');
        return;
    }

    selectedFile = file;
    uploadArea.innerHTML = `
                <div class="upload-icon">✅</div>
                <h3>Archivo seleccionado: ${file.name}</h3>
                <p>Tamaño: ${(file.size / 1024).toFixed(2)} KB</p>
            `;
    uploadBtn.disabled = false;
}

uploadBtn.addEventListener('click', () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('archivo', selectedFile);

    loading.style.display = 'block';
    results.style.display = 'none';
    uploadBtn.disabled = true;

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';

            if (data.success) {
                showResults(data.resultados);
                resultFileName = data.archivoResultado.split('/').pop();
                showSuccess('Archivo procesado exitosamente');
            } else {
                showError(data.error || 'Error al procesar el archivo');
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            showError('Error de conexión: ' + error.message);
            console.error('Error:', error);
        })
        .finally(() => {
            uploadBtn.disabled = false;
        });
});

function showResults(data) {
    const stats = data.estadisticas;

    document.getElementById('totalNumbers').textContent = stats.totalNumeros;
    document.getElementById('usefulNumbers').textContent = stats.cantidadUtiles;
    document.getElementById('unusefulNumbers').textContent = stats.cantidadNoUtiles;
    document.getElementById('percentage').textContent = stats.porcentajeUtiles + '%';

    const usefulList = document.getElementById('usefulNumbersList');
    usefulList.innerHTML = '';

    data.numerosUtiles.forEach(numero => {
        const span = document.createElement('span');
        span.className = 'number-item';
        span.textContent = numero;
        usefulList.appendChild(span);
    });

    results.style.display = 'block';
}

downloadBtn.addEventListener('click', () => {
    if (resultFileName) {
        window.location.href = `/download/${resultFileName}`;
    }
});

function showError(message) {
    const existing = document.querySelector('.error');
    if (existing) existing.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.querySelector('.content').insertBefore(errorDiv, document.querySelector('.upload-section'));

    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message) {
    const existing = document.querySelector('.success');
    if (existing) existing.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    document.querySelector('.content').insertBefore(successDiv, document.querySelector('.upload-section'));

    setTimeout(() => successDiv.remove(), 5000);
}