/**
 * Pruebas unitarias de regresión para cart.js usando Jest / Node.js
 */

const { calcularSubtotal, calcularDescuento, calcularEnvio, calcularTotalCompra } = require('./cart');

describe('Agile Testing - Carrito de Compras Unit Tests', () => {

    test('1. Carrito vacío calcula subtotal y total cero', () => {
        const resultado = calcularTotalCompra([]);
        expect(resultado.subtotal).toBe(0);
        expect(resultado.total).toBe(0);
    });

    test('2. Compra menor a $50 aplica costo de envío de $5', () => {
        const items = [{ precio: 20, cantidad: 2 }]; // $40
        const resultado = calcularTotalCompra(items);
        expect(resultado.subtotal).toBe(40);
        expect(resultado.envio).toBe(5);
        expect(resultado.total).toBe(45);
    });

    test('3. Compra igual o mayor a $50 aplica envío GRATIS', () => {
        const items = [{ precio: 50, cantidad: 1 }]; // $50
        const resultado = calcularTotalCompra(items);
        expect(resultado.subtotal).toBe(50);
        expect(resultado.envio).toBe(0);
        expect(resultado.total).toBe(50);
    });

    test('4. Aplicar cupón de descuento del 10%', () => {
        const items = [{ precio: 100, cantidad: 1 }];
        const resultado = calcularTotalCompra(items, 'DESCUENTO10');
        expect(resultado.descuento).toBe(10);
        expect(resultado.total).toBe(90);
    });

    test('5. Caso Borde: Descuento hace caer el monto por debajo del umbral de envío gratis', () => {
        const items = [{ precio: 55, cantidad: 1 }]; // Subtotal $55
        // Con 20% descuento -> $55 - 11 = $44.
        // Como $44 < $50 (Umbral envío gratis), se cobra envío de $5 -> Total = $49
        const resultado = calcularTotalCompra(items, 'DESCUENTO20');
        expect(resultado.descuento).toBe(11);
        expect(resultado.envio).toBe(5);
        expect(resultado.total).toBe(49);
    });

    test('6. Cupón insensible a mayúsculas/minúsculas y espacios', () => {
        const items = [{ precio: 100, cantidad: 1 }];
        const resultado = calcularTotalCompra(items, '  descuento10  ');
        expect(resultado.descuento).toBe(10);
    });
});
