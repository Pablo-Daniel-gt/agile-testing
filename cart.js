/**
 * Módulo de Lógica de Negocio - Carrito de Compras
 */

const REGLAS_NEGOCIO = {
    ENVIO_GRATIS_UMBRAL: 50.0, // Envío gratis a partir de $50
    COSTO_ENVIO: 5.0,          // Costo de envío estándar $5
    CUPONES: {
        'DESCUENTO10': 0.10,   // 10% de descuento
        'DESCUENTO20': 0.20,   // 20% de descuento
        'SUPER50': 0.50        // 50% de descuento
    }
};

/**
 * Calcula el subtotal del carrito sumando (precio * cantidad) de cada producto.
 * @param {Array} items - Lista de ítems [{ id, nombre, precio, cantidad }]
 * @return {number} Subtotal
 */
function calcularSubtotal(items) {
    if (!Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((acc, item) => {
        const cantidad = Math.max(0, parseInt(item.cantidad) || 0);
        const precio = Math.max(0, parseFloat(item.precio) || 0);
        return acc + (precio * cantidad);
    }, 0);
}

/**
 * Calcula el monto a descontar según el cupón aplicado.
 * @param {number} subtotal 
 * @param {string} codigoCupon 
 * @return {number} Monto del descuento
 */
function calcularDescuento(subtotal, codigoCupon) {
    if (subtotal <= 0 || !codigoCupon) return 0;
    const cuponNormalizado = codigoCupon.trim().toUpperCase();
    const porcentaje = REGLAS_NEGOCIO.CUPONES[cuponNormalizado] || 0;
    return subtotal * porcentaje;
}

/**
 * Calcula el costo de envío según el subtotal descontado.
 * @param {number} subtotalConDescuento 
 * @return {number} Costo de envío
 */
function calcularEnvio(subtotalConDescuento) {
    if (subtotalConDescuento <= 0) return 0;
    if (subtotalConDescuento >= REGLAS_NEGOCIO.ENVIO_GRATIS_UMBRAL) {
        return 0; // Envío gratis
    }
    return REGLAS_NEGOCIO.COSTO_ENVIO;
}

/**
 * Calcula el resumen completo de la compra.
 * @param {Array} items 
 * @param {string} codigoCupon 
 * @return {Object} Resumen con subtotal, descuento, envío y total
 */
function calcularTotalCompra(items, codigoCupon = '') {
    const subtotal = calcularSubtotal(items);
    const descuento = calcularDescuento(subtotal, codigoCupon);
    const subtotalConDescuento = Math.max(0, subtotal - descuento);
    const costoEnvio = calcularEnvio(subtotalConDescuento);
    const total = subtotalConDescuento + costoEnvio;

    return {
        subtotal: Number(subtotal.toFixed(2)),
        descuento: Number(descuento.toFixed(2)),
        envio: Number(costoEnvio.toFixed(2)),
        total: Number(total.toFixed(2))
    };
}

// Exportación compatible para entorno Node.js / Jest (Pruebas) y Navegador
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        REGLAS_NEGOCIO,
        calcularSubtotal,
        calcularDescuento,
        calcularEnvio,
        calcularTotalCompra
    };
}
