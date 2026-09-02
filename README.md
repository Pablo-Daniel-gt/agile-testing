# 🛒 Guía Completa de Demostración: Agile Testing con Carrito de Compras

Esta carpeta contiene una aplicación web sencilla y modular diseñada específicamente 
para realizar una demostración práctica de **Agile Testing** (Testing Ágil), ideal 
para presentaciones y exposiciones académicas o profesionales.

---

## 📁 Estructura de Archivos en `Testing_agil_v2`

* 📄 **`index.html`**: Interfaz gráfica del carrito de compras + **Consola de Pruebas Unitarias Integrada** (se ejecuta directo en el navegador sin instalar herramientas complejas).
* 📄 **`cart.js`**: Módulo de lógica de negocio (funciones puras: subtotal, cupones, reglas de envío gratis).
* 📄 **`cart.test.js`**: Suite de pruebas unitarias configurada para entornos de automatización como **Jest / Node.js**.
* 📄 **`README.md`**: Este archivo con las instrucciones y el guión detallado para la exposición.

---

## 🎭 GUÍA PASO A PASO PARA LA EXPOSICIÓN (Script de Demostración)

A continuación tienes la secuencia exacta que debes seguir durante tu presentación para explicar la metodología de **Agile Testing** mientras utilizas el programa.

---

### 🔹 PASO 1: Introducción Teórica y Contextualización (2-3 minutos)
**Objetivo:** Explicar el concepto fundamental de Agile Testing antes de tocar el código.

1. **Abre la presentación** explicando qué es Agile Testing:
   > *"A diferencia del testing tradicional (Waterfall), donde las pruebas se hacen al final del desarrollo cuando el producto ya está construido, en **Agile Testing** las pruebas ocurren continuamente desde el día 1, integradas en cada iteración o Sprint."*
2. **Presenta el software:**
   > *"Para esta demostración he creado un Carrito de Compras con Reglas de Negocio Automatizadas. Les mostraré cómo aplicamos los Cuadrantes de Agile Testing, pruebas unitarias y pruebas de regresión ante cambios inesperados de requisitos."*

---

### 🔹 PASO 2: Demostración Funcional en el Navegador (Cuadrante Q2)
**Objetivo:** Mostrar la perspectiva del usuario y las Reglas de Negocio (Criterios de Aceptación).

1. Abre el archivo **`index.html`** haciendo doble clic (se abrirá en tu navegador web).
2. **Demuestra las reglas del negocio:**
   * **Caso 1 (Envío Estándar):** Agrega al carrito un *Mouse Inalámbrico* ($15.00). Muestra a la audiencia que el subtotal es $15.00, el envío es $5.00 y el total es $20.00.
   * **Caso 2 (Criterio de Aceptación - Envío Gratis):** Agrega unos *Audífonos Gamer* ($60.00). Señala cómo el costo de envío cambia automáticamente a **¡GRATIS!** porque el subtotal ($75.00) superó el umbral de $50.00.
   * **Caso 3 (Cupones de Descuento):** Escribe el código `DESCUENTO10` en la casilla de cupón y presiona **Aplicar**. Muestra cómo se descuenta el 10% ($7.50).

---

### 🔹 PASO 3: Ejecución de Pruebas Unitarias Integradas (Cuadrante Q1)
**Objetivo:** Mostrar la automatización de pruebas y la velocidad del feedback en Agile Testing.

1. Desplázate hacia la parte inferior de la pantalla a la sección negra llamada **🧪 Suite de Pruebas Unitarias Automatizadas**.
2. Haz clic en el botón morado **`▶ Ejecutar Pruebas`**.
3. **Explica lo que está sucediendo a la audiencia:**
   > *"En Agile Testing buscamos **Feedback Rápido**. En lugar de probar manualmente cada combinación de carrito, tenemos una suite automatizada que valida 6 escenarios clave (incluyendo casos borde) en menos de 1 segundo."*
4. Revisa los resultados verdes (`✔ [PASS]`) y resalta especialmente la **Prueba 5 (Caso Borde)**:
   > *"Fíjense en la Prueba 5: Si una compra es de $55.00 califica para envío gratis, pero si el usuario aplica un 20% de descuento, el subtotal cae a $44.00. La prueba verifica que el sistema sea lo suficientemente inteligente para volver a cobrar el envío de $5.00. Esto previene pérdidas de dinero a la empresa."*

---

### 🔹 PASO 4: Demostración de Cambio de Requisitos y Pruebas de Regresión (El "Momento Clave")
**Objetivo:** Demostrar cómo Agile Testing protege el código cuando el cliente (Product Owner) cambia los requisitos del negocio.

#### Escenario de Cambio:
Simula la siguiente historia ante tu audiencia:
> *"El equipo de Marketing nos informa en medio del Sprint que la regla de envío gratis ya no será a partir de $50.00, sino a partir de $100.00."*

#### Cómo realizar el cambio en vivo:
1. Abre el archivo **`cart.js`** en un editor de texto (como Notepad, VS Code o el Bloc de Notas).
2. En las primeras líneas ubica la constante `ENVIO_GRATIS_UMBRAL`:
   ```javascript
   const REGLAS_NEGOCIO = {
       ENVIO_GRATIS_UMBRAL: 100.0, // <-- Cambia de 50.0 a 100.0
       COSTO_ENVIO: 5.0,
       ...
   };
   ```
3. Guarda los cambios en `cart.js`.
4. Regresa al navegador en `index.html`, recarga la página (`F5`) y presiona el botón **`▶ Ejecutar Pruebas`**.

#### Explicación del Resultado:
Verás que las pruebas 3, 4 y 5 fallarán marcadas en rojo (`✖ [FAIL]`).
* **Explicación para tu audiencia:**
  > *"¡Esto es la **Prueba de Regresión en Agile Testing**! Las pruebas fallaron en rojo porque las expectativas del sistema cambiaron. La automatización nos avisa inmediatamente qué partes del sistema fueron afectadas por el nuevo requisito antes de subir el código a producción."*

*(Nota: Para restaurar el sistema, vuelve a cambiar `ENVIO_GRATIS_UMBRAL` a `50.0`, guarda el archivo y vuelve a ejecutar las pruebas para verlas en verde `PASS`).*

---

## 🛠️ ¿CÓMO UTILIZAR EL ARCHIVO `cart.test.js`? (Pruebas con Node.js / Jest)

El archivo **`cart.test.js`** contiene las mismas pruebas unitarias estructuradas bajo el estándar de la industria usando la sintaxis de **Jest** (el framework de testing en JavaScript más popular del mundo).

### 💡 ¿Para qué sirve?
Mientras que la consola en `index.html` permite ejecutar pruebas dentro del navegador de forma visual, el archivo `cart.test.js` está diseñado para ejecutarse en la **Terminal / Consola de Comandos**. En un entorno real de trabajo Ágil, estas pruebas se ejecutan automáticamente en servidores de **Integración Continua (CI/CD)** cada vez que un programador sube un cambio de código.

### 📋 Requisitos para ejecutarlo (Opcional):
Tener instalado **Node.js** en tu computadora.

### 🏃‍♂️ Pasos para ejecutar `cart.test.js`:

1. Abre la Terminal (PowerShell o Símbolo del sistema) en la carpeta `Testing_agil_v2`:
   ```bash
   cd C:\Users\Usuario\Desktop\Testing_agil_v2
   ```
2. Inicializa un proyecto básico de Node.js e instala **Jest** (solo la primera vez):
   ```bash
   npm init -y
   npm install --save-dev jest
   ```
3. Ejecuta las pruebas unitarias desde la terminal:
   ```bash
   npx jest cart.test.js
   ```

### 📊 Resultado esperado en Terminal:
Verás una salida formateada directamente en tu consola indicando la suite ejecutada, los tiempos de ejecución en milisegundos y el estado de cada test (`PASS` o `FAIL`). Esto demuestra cómo los equipos ágiles integran las pruebas automatizadas en sus pipelines de despliegue continuo.

---

## 🎯 RESUMEN DE MAPEO TEÓRICO (Para responder preguntas de los asistentes)

Si te hacen preguntas durante o al final de la exposición, puedes responder con este mapa:

* **¿Qué es TDD (Test-Driven Development)?**
  * *Respuesta:* Es escribir primero la prueba en `cart.test.js` (que fallará), y luego escribir el código en `cart.js` necesario para que la prueba pase.
* **¿Qué son los Casos Borde (Edge Cases)?**
  * *Respuesta:* Probar situaciones donde las condiciones cambian súbitamente (como en la Prueba 5, cuando el descuento hace que una compra pierda el beneficio de envío gratis).
* **¿Qué beneficio aporta el Testing Ágil al negocio?**
  * *Respuesta:* Permite lanzar nuevas características rápidamente reduciendo el riesgo de errores graves en producción, gracias a las pruebas de regresión automatizadas.
