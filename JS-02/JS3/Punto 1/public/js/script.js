 let numeros = [];

        function agregarNumero() {
            const input = document.getElementById('numeroInput');
            const valor = parseFloat(input.value);

            // Validaciones
            if (isNaN(valor)) {
                mostrarMensaje('Por favor, ingrese un número válido', 'error');
                return;
            }

            if (numeros.length >= 20) {
                mostrarMensaje('Ya se alcanzó el máximo de 20 números', 'error');
                return;
            }

            // Agregar número
            numeros.push(valor);
            input.value = '';
            input.focus();

            // Actualizar interfaz
            actualizarGrid();
            actualizarContador();
            actualizarEstadisticas();
            actualizarBotonGuardar();

            mostrarMensaje(`Número ${valor} agregado correctamente`, 'info');
        }

        function actualizarGrid() {
            const grid = document.getElementById('numerosGrid');
            
            if (numeros.length === 0) {
                grid.innerHTML = '<div style="text-align: center; color: #999; grid-column: 1 / -1; padding: 40px; font-style: italic;">Los números aparecerán aquí a medida que los ingreses...</div>';
                return;
            }

            grid.innerHTML = numeros.map((numero, index) => `
                <div class="numero-item">
                    <div class="indice">${index + 1}</div>
                    ${numero}
                </div>
            `).join('');
        }

        function actualizarContador() {
            document.getElementById('contador').textContent = numeros.length;
        }

        function actualizarEstadisticas() {
            const estadisticas = document.getElementById('estadisticas');
            
            if (numeros.length === 0) {
                estadisticas.classList.remove('visible');
                return;
            }

            estadisticas.classList.add('visible');

            const suma = numeros.reduce((acc, num) => acc + num, 0);
            const promedio = suma / numeros.length;
            const maximo = Math.max(...numeros);
            const minimo = Math.min(...numeros);

            document.getElementById('suma').textContent = suma.toFixed(2);
            document.getElementById('promedio').textContent = promedio.toFixed(2);
            document.getElementById('maximo').textContent = maximo;
            document.getElementById('minimo').textContent = minimo;
        }

        function actualizarBotonGuardar() {
            const btnGuardar = document.getElementById('btnGuardar');
            btnGuardar.disabled = numeros.length < 10;
            
            if (numeros.length < 10) {
                btnGuardar.textContent = `💾 Guardar en Archivo TXT (Faltan ${10 - numeros.length} números)`;
            } else {
                btnGuardar.textContent = '💾 Guardar en Archivo TXT';
            }
        }

        function limpiarTodo() {
            if (numeros.length === 0) {
                mostrarMensaje('No hay números para limpiar', 'info');
                return;
            }

            if (confirm('¿Está seguro de que desea limpiar todos los números?')) {
                numeros = [];
                actualizarGrid();
                actualizarContador();
                actualizarEstadisticas();
                actualizarBotonGuardar();
                mostrarMensaje('Números limpiados correctamente', 'info');
            }
        }

        async function guardarArchivo() {
            if (numeros.length < 10) {
                mostrarMensaje('Debe ingresar al menos 10 números', 'error');
                return;
            }

            const loading = document.getElementById('loading');
            const btnGuardar = document.getElementById('btnGuardar');
            
            loading.style.display = 'flex';
            btnGuardar.disabled = true;

            try {
                const response = await fetch('/guardar-numeros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ numeros: numeros })
                });

                const data = await response.json();

                if (data.success) {
                    mostrarMensaje(`¡Archivo guardado exitosamente! ${data.archivo}`, 'exito');
                    
                    // Crear enlace de descarga
                    const enlaceDescarga = document.createElement('a');
                    enlaceDescarga.href = `/descargar/${data.archivo}`;
                    enlaceDescarga.download = data.archivo;
                    enlaceDescarga.click();
                    
                } else {
                    mostrarMensaje(`Error: ${data.error}`, 'error');
                }

            } catch (error) {
                console.error('Error:', error);
                mostrarMensaje('Error al guardar el archivo', 'error');
            } finally {
                loading.style.display = 'none';
                btnGuardar.disabled = false;
            }
        }

        function mostrarMensaje(texto, tipo) {
            const contenedor = document.getElementById('mensajes');
            const mensaje = document.createElement('div');
            mensaje.className = `mensaje ${tipo}`;
            mensaje.textContent = texto;
            
            contenedor.innerHTML = '';
            contenedor.appendChild(mensaje);

            // Remover mensaje después de 5 segundos
            setTimeout(() => {
                mensaje.remove();
            }, 5000);
        }

        // Event listeners
        document.getElementById('numeroInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                agregarNumero();
            }
        });

        // Inicializar
        document.getElementById('numeroInput').focus();