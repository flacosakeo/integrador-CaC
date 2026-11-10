// Constantes de precios y descuentos
const PRECIO_TICKET = 200;
const DESCUENTOS = {
    estudiante: 0.80, // 80% de descuento (paga el 20%)
    trainee: 0.50,    // 50% de descuento (paga el 50%)
    junior: 0.15,     // 15% de descuento (paga el 85%)
    general: 0.00     // Sin descuento
};

// Elementos del DOM
const form = document.getElementById("formul");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputMail = document.getElementById("mail");
const inputCantidad = document.getElementById("cantidad");
const selectCategoria = document.getElementById("op");
const inputTotal = document.getElementById("total");
const btnResumen = document.getElementById("resumen");
const btnBorrar = document.getElementById("borrar");
const btnComprar = document.getElementById("btn-confirmar-compra");

// Tarjetas de descuento interactivas
const cardDescuentos = {
    estudiante: document.getElementById("des1"),
    trainee: document.getElementById("des2"),
    junior: document.getElementById("des3")
};

function actualizarTarjetasSeleccionadas(categoria) {
    Object.keys(cardDescuentos).forEach(cat => {
        const card = cardDescuentos[cat];
        if (card) {
            if (cat === categoria) {
                card.classList.add("tarjeta-activa");
            } else {
                card.classList.remove("tarjeta-activa");
            }
        }
    });
}

// Vincular clic en tarjetas para elegir la categoría en el selector
Object.keys(cardDescuentos).forEach(cat => {
    const card = cardDescuentos[cat];
    if (card) {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            selectCategoria.value = cat;
            actualizarTarjetasSeleccionadas(cat);
            if (inputCantidad.value && parseInt(inputCantidad.value, 10) > 0) {
                calcularTotal();
            }
        });
    }
});

selectCategoria.addEventListener("change", () => {
    actualizarTarjetasSeleccionadas(selectCategoria.value);
    if (inputCantidad.value && parseInt(inputCantidad.value, 10) > 0) {
        calcularTotal();
    }
});

// Validación en tiempo real para limpiar errores al escribir
[inputNombre, inputApellido, inputCantidad].forEach(input => {
    if (input) {
        input.addEventListener("input", () => {
            if (input.value.trim() !== "") {
                input.classList.remove("is-invalid");
            }
        });
    }
});

if (inputMail) {
    inputMail.addEventListener("input", () => {
        if (esMailValido(inputMail.value)) {
            inputMail.classList.remove("is-invalid");
            inputMail.classList.add("is-valid");
        }
    });
    inputMail.addEventListener("blur", () => {
        validarMail(inputMail.value);
    });
}

// Función para validar todos los campos del formulario
function validarCampos() {
    let esValido = true;

    // Nombre
    if (!inputNombre.value.trim()) {
        inputNombre.classList.add("is-invalid");
        esValido = false;
    } else {
        inputNombre.classList.remove("is-invalid");
    }

    // Apellido
    if (!inputApellido.value.trim()) {
        inputApellido.classList.add("is-invalid");
        esValido = false;
    } else {
        inputApellido.classList.remove("is-invalid");
    }

    // Email
    if (!validarMail(inputMail.value)) {
        esValido = false;
    }

    // Cantidad
    const cantidad = parseInt(inputCantidad.value, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
        inputCantidad.classList.add("is-invalid");
        esValido = false;
    } else {
        inputCantidad.classList.remove("is-invalid");
        inputCantidad.value = cantidad; // aseguramos enteros
    }

    return esValido;
}

// Función para calcular y retornar el total
function calcularTotal() {
    if (!validarCampos()) {
        return null;
    }

    const cantidad = parseInt(inputCantidad.value, 10);
    const categoria = selectCategoria.value;
    const porcentajeDescuento = DESCUENTOS[categoria] !== undefined ? DESCUENTOS[categoria] : 0;
    const precioUnitario = PRECIO_TICKET * (1 - porcentajeDescuento);
    const totalPagar = Math.round(cantidad * precioUnitario);

    inputTotal.value = `Total a pagar: $${totalPagar}`;
    return totalPagar;
}

// Botón Resumen
btnResumen.addEventListener("click", () => {
    const total = calcularTotal();
    if (total !== null && btnComprar) {
        btnComprar.classList.remove("d-none");
    }
});

// Botón Borrar
btnBorrar.addEventListener("click", () => {
    form.reset();
    inputTotal.value = "Total a pagar: $";
    [inputNombre, inputApellido, inputMail, inputCantidad].forEach(el => {
        if (el) el.classList.remove("is-invalid", "is-valid");
    });
    actualizarTarjetasSeleccionadas(selectCategoria.value);
    if (btnComprar) {
        btnComprar.classList.add("d-none");
    }
});

// Botón Confirmar Compra
if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        const total = calcularTotal();
        if (total === null) return;

        const cantidad = inputCantidad.value;
        const nombre = `${inputNombre.value.trim()} ${inputApellido.value.trim()}`;
        const email = inputMail.value.trim();
        const categoriaClave = selectCategoria.value;
        const categoriaTexto = selectCategoria.options[selectCategoria.selectedIndex].text.split('(')[0].trim();
        const porcentaje = Math.round((DESCUENTOS[categoriaClave] || 0) * 100);
        const descuentoTexto = porcentaje > 0 ? `${porcentaje}% OFF` : 'Sin descuento';
        const totalEntero = Math.round(total);
        const ticketCode = `CBA-${Math.floor(100000 + Math.random() * 900000)}`;
        const ahora = new Date();
        const fechaCompra = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

        const ticketHTML = `
            <div class="ticket-wrapper" id="ticket-a-imprimir">
                <!-- Encabezado del Ticket -->
                <div class="ticket-header d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-2">
                        <img src="./assets/img/codoacodo.png" alt="Logo Conf Bs As" style="height: 38px; width: auto; filter: brightness(1.2);">
                        <div>
                            <h4 class="h5 fw-bold mb-0 text-white">Conf Bs As 2026</h4>
                            <small class="text-white-50">Conferencia Oficial de Tecnología</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <span class="ticket-badge">PASE DE ACCESO</span>
                        <div class="small fw-bold text-warning mt-1">${ticketCode}</div>
                    </div>
                </div>

                <!-- Cuerpo del Ticket -->
                <div class="ticket-body">
                    <div class="row g-3 mb-2">
                        <div class="col-7">
                            <div class="ticket-label">Asistente</div>
                            <div class="ticket-value text-capitalize">${nombre}</div>
                        </div>
                        <div class="col-5">
                            <div class="ticket-label">Fecha de Compra</div>
                            <div class="ticket-value">${fechaCompra}</div>
                        </div>
                    </div>

                    <div class="row g-3 mb-2">
                        <div class="col-7">
                            <div class="ticket-label">Correo Electrónico</div>
                            <div class="ticket-value text-truncate">${email}</div>
                        </div>
                        <div class="col-5">
                            <div class="ticket-label">Sede & Lugar</div>
                            <div class="ticket-value">Bs As - Octubre 2026</div>
                        </div>
                    </div>

                    <div class="ticket-divider"></div>

                    <!-- Resumen Numérico -->
                    <div class="row g-2 text-center py-2 bg-body-tertiary rounded-3 mb-3">
                        <div class="col-3">
                            <div class="ticket-label">Categoría</div>
                            <div class="fw-bold">${categoriaTexto}</div>
                        </div>
                        <div class="col-3">
                            <div class="ticket-label">Cantidad</div>
                            <div class="fw-bold">${cantidad} ticket(s)</div>
                        </div>
                        <div class="col-3">
                            <div class="ticket-label">Descuento</div>
                            <div class="fw-bold text-success">${descuentoTexto}</div>
                        </div>
                        <div class="col-3">
                            <div class="ticket-label">Total Abonado</div>
                            <div class="h5 fw-bold text-primary mb-0">$${totalEntero}</div>
                        </div>
                    </div>

                    <!-- Código de Barras Decorativo -->
                    <div class="ticket-barcode-container pt-2">
                        <div class="ticket-barcode">
                            <span class="thick"></span><span class="thin"></span><span class="space"></span>
                            <span class="thin"></span><span class="thick"></span><span class="thin"></span>
                            <span class="space"></span><span class="thick"></span><span class="thin"></span>
                            <span class="thick"></span><span class="space"></span><span class="thin"></span>
                            <span class="thick"></span><span class="thin"></span><span class="space"></span>
                            <span class="thick"></span><span class="thick"></span><span class="thin"></span>
                            <span class="space"></span><span class="thin"></span><span class="thick"></span>
                        </div>
                        <small class="text-muted fw-monospace" style="font-size: 0.72rem;">${ticketCode} • COMPROBANTE OFICIAL DE PAGO</small>
                    </div>
                </div>
            </div>
        `;

        const modalBody = document.getElementById("modalTicketBody");
        const printArea = document.getElementById("area-impresion");

        if (modalBody) {
            modalBody.innerHTML = ticketHTML;
            if (printArea) {
                printArea.innerHTML = ticketHTML;
            }
            const ticketModal = new bootstrap.Modal(document.getElementById("ticketModal"));
            ticketModal.show();
        } else {
            alert(`¡Felicitaciones ${nombre}!\nCompra confirmada por ${cantidad} ticket(s).\nTotal: $${total} pesos.`);
            btnBorrar.click();
        }
    });
}

// Función para imprimir únicamente el comprobante estilizado
function imprimirComprobante() {
    const ticket = document.getElementById("ticket-a-imprimir");
    const printArea = document.getElementById("area-impresion");
    if (ticket && printArea) {
        printArea.innerHTML = ticket.outerHTML;
    }
    window.print();
}

// Inicializar selección visual de tarjeta
actualizarTarjetasSeleccionadas(selectCategoria.value);
