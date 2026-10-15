# Ficha APA

Curso de autogestión del aprendizaje sobre las normas APA 7.ª edición, construido con React + Vite.

Incluye 6 módulos, 31 lecciones (texto, video y cuestionarios), listas de chequeo, progreso guardado automáticamente en el navegador del estudiante, y una **página de ventas con candado de código de acceso** para vender el curso.

## Cómo funciona el sistema de venta

El sitio ahora tiene dos partes:

1. **Página de ventas** (lo primero que ve cualquier visitante): explica el curso, muestra tu QR de pago y tus datos de transferencia bancaria, y tiene un botón de WhatsApp para que te envíen el comprobante.
2. **El curso completo**: solo se desbloquea cuando la persona ingresa un código de acceso válido. Una vez desbloqueado, queda guardado en ese navegador (no tiene que volver a ingresarlo).

### Antes de publicar: edita tu información

Abre el archivo `src/Landing.jsx` y edita el bloque `CONFIG` al principio del archivo:

```js
const CONFIG = {
  precioUsd: "5",
  precioBs: "35",
  whatsappNumero: "59100000000",   // tu número con código de país, sin +, sin espacios
  whatsappMensaje: "...",
  correoContacto: "tu-correo@ejemplo.com",
  banco: "Nombre del banco",
  titular: "Betty Meneses Ayllón",
  numeroCuenta: "0000000000",
  tipoCuenta: "Caja de ahorro / Cuenta corriente",
};
```

### Cómo agregar tu imagen de QR real

Ahora mismo se muestra una caja de ejemplo en lugar de tu QR. Para usar tu QR real:

1. Guarda tu imagen de QR como `qr.png` dentro de una carpeta llamada `public/` en la raíz del proyecto (créala si no existe).
2. En `src/Landing.jsx`, busca el bloque `<div className="ld-qr-box">` y reemplázalo por:
   ```jsx
   <img src="/qr.png" alt="Código QR para pagar" style={{ width: "100%", maxWidth: 220, borderRadius: 8 }} />
   ```

### Cómo cambiar o agregar códigos de acceso

Abre `src/Gate.jsx` y edita la lista `VALID_CODES`:

```js
const VALID_CODES = ["APA-AGOSTO2026"];
```

Puedes agregar varios códigos a la vez (por ejemplo, uno por mes, o uno por grupo de estudiantes):

```js
const VALID_CODES = ["APA-AGOSTO2026", "APA-SEPTIEMBRE2026", "GRUPO-METODOLOGIA"];
```

Cada vez que cambies este archivo, necesitas subir el cambio a GitHub para que se actualice en el sitio publicado (Vercel lo vuelve a publicar automáticamente).

**Cuidado con el campo de texto de `src/Landing.jsx`:** el placeholder (el texto gris de ejemplo dentro de la casilla) es genérico a propósito ("Escribe tu código de acceso"). Nunca lo cambies por un código real de ejemplo — quedaría visible para cualquier visitante del sitio, sin necesidad de pagar.

**Importante sobre seguridad:** este candado es simple a propósito — no requiere base de datos ni servidor. Es adecuado para un curso de bajo costo, igual que la carpeta compartida con la que empezaste. El código queda dentro del archivo público del sitio, así que alguien con conocimientos técnicos podría encontrarlo revisando el código fuente. Para la mayoría de los casos esto es una molestia menor, no un problema real — pero si más adelante vendes algo de mayor valor, conviene pasar a una plataforma con pagos automatizados (como Hotmart) o a un sistema con backend real.

## Requisitos

- [Node.js](https://nodejs.org) versión 18 o superior instalado en tu computadora.

## Cómo correrlo en tu computadora

1. Abre una terminal dentro de esta carpeta.
2. Instala las dependencias (solo la primera vez):
   ```
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
4. Abre en el navegador la dirección que aparezca en la terminal (normalmente `http://localhost:5173`).

## Cómo publicarlo en internet (gratis)

La forma más simple es con **Vercel** o **Netlify**, conectando este mismo repositorio de GitHub:

1. Sube esta carpeta a un repositorio de GitHub (ver instrucciones más abajo).
2. Entra a [vercel.com](https://vercel.com) (o [netlify.com](https://netlify.com)) e inicia sesión con tu cuenta de GitHub.
3. Elige "Add New Project" / "Import from GitHub" y selecciona el repositorio `ficha-apa`.
4. Deja la configuración automática (Vite se detecta solo) y haz clic en "Deploy".
5. En un par de minutos obtendrás un enlace público (por ejemplo, `ficha-apa.vercel.app`) que puedes compartir con tus estudiantes.

## Cómo subir esta carpeta a GitHub

Si nunca has usado Git, la forma más simple es:

1. Crea un repositorio nuevo en [github.com](https://github.com) (botón "New").
2. En tu computadora, dentro de esta carpeta, abre una terminal y ejecuta:
   ```
   git init
   git add .
   git commit -m "Primera versión de Ficha APA"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/ficha-apa.git
   git push -u origin main
   ```
   (Reemplaza `TU-USUARIO` por tu usuario de GitHub y `ficha-apa` por el nombre real que le diste al repositorio.)

## Actividades prácticas

Además de texto, video y cuestionarios, el curso ahora tiene un cuarto tipo de lección: **actividad práctica**. Se completa en línea (con guardado automático, igual que el resto del progreso) y también se puede descargar como PDF para imprimir o completar a mano.

Las 6 actividades prácticas del curso ya están completas — una por módulo (`l1-6`, `l2-6`, `l6-6`, `l3-7`, `l4-6` y `l5-6` en `src/App.jsx`), cada una con su PDF descargable en `public/actividad-practica-modulo1.pdf` a `public/actividad-practica-modulo6.pdf`.

Los campos de instrucción (`instruction`) y de etiqueta de pregunta (`prompts[].label`) admiten saltos de línea (`\n`) — útil, por ejemplo, para mostrar los datos crudos de una fuente antes de pedirle al estudiante que escriba la referencia completa (ver la actividad del Módulo 5).

El ejercicio de tipo `"choice-items"` ahora admite cualquier cantidad de opciones en `choiceLabels` (no solo dos) — por ejemplo, la actividad del Módulo 3 usa cinco botones ("Nivel 1" a "Nivel 5") para identificar el nivel de encabezado correcto.

Para agregar otra actividad práctica a un módulo, copia el bloque de la lección `l1-6` dentro de `src/App.jsx` y ajusta:

- `title`, `duration`, `intro`
- `pdfHref` (si generas un PDF descargable para esa actividad; si no, puedes omitir esta propiedad)
- `exercises`: cada ejercicio tiene un `kind`:
  - `"choice-items"` — una lista de afirmaciones con dos o más botones de opción y un campo de texto de justificación. Cada `item` puede llevar `correct` (el índice de la opción correcta, empezando en 0) y `explanation` (el texto que se muestra al revisar). Si los agregas, aparece un botón "Revisar mis respuestas" que resalta en verde/rojo y muestra la explicación.
  - `"source-compare"` — un fragmento original (y, opcionalmente, una versión del estudiante para comparar), con preguntas abiertas debajo.
  - `"prompts"` — una o más preguntas abiertas simples. Cada `prompt` puede llevar `sample` (una respuesta modelo); si la agregas, aparece un botón "Ver respuesta modelo" debajo del campo de texto.

### Retroalimentación en las actividades prácticas

Los ejercicios de elección (`choice-items`) se autocalifican: al hacer clic en "Revisar mis respuestas", cada opción se resalta en verde (correcta) o rojo (si el estudiante eligió otra), y se muestra una breve explicación. El botón "Intentar de nuevo" reinicia el ejercicio.

Los ejercicios de escritura abierta (`prompts` y `source-compare`) no tienen una única respuesta correcta, así que no se califican como verdadero/falso — en su lugar, cada pregunta puede mostrar una "respuesta modelo" para que el estudiante compare su propia redacción.

### Retroalimentación: cómo sabe el estudiante si acertó

Cada ejercicio de `"choice-items"` puede llevar, en cada ítem, una propiedad `correct` (el índice de la opción correcta, empezando en 0) y una `explanation` (el porqué). Cuando ambas están presentes, aparece un botón **"Revisar mis respuestas"** que resalta en verde la opción correcta y en rojo la que el estudiante marcó si se equivocó, mostrando la explicación debajo. El botón "Intentar de nuevo" reinicia el ejercicio.

Cada pregunta dentro de `"prompts"` o `"source-compare"` puede llevar una propiedad `sample` (una respuesta modelo). Cuando está presente, aparece un botón **"Ver respuesta modelo"** individual debajo de esa pregunta, para que el estudiante compare su propia redacción — sin marcarla como correcta o incorrecta, porque este tipo de ejercicio no tiene una única respuesta válida.

Si agregas una actividad práctica nueva, procura incluir `correct`/`explanation` en los ejercicios de elección y `sample` en las preguntas abiertas — de lo contrario, esos ejercicios se mostrarán sin retroalimentación (el estudiante podrá responder, pero no revisar ni comparar).

## Progreso de los estudiantes

El progreso (lecciones completadas, respuestas de las listas de chequeo, enlaces de video) se guarda en el navegador de cada estudiante mediante `localStorage`. Esto significa que:

- El progreso es individual por navegador y por dispositivo — no se sincroniza entre computadoras.
- Si el estudiante borra los datos de navegación de su navegador, perderá su progreso guardado.
- No requiere ninguna base de datos ni backend: el sitio funciona igual de bien en Vercel, Netlify, GitHub Pages, o cualquier hosting estático.

## Autora

Msc. Betty Meneses Ayllón — Universidad Privada Domingo Savio


## Modo Educación Continua (sin cobro)

Este curso también puede usarse dentro de la página **Cursos Educación Continua** (https://portalformacontinuasin.vercel.app/). Cuando el participante entra desde esa página (dirección terminada en `?ec=1`), no ve el precio ni el pago: solo la pantalla de código de acceso. El código para los talleres es `EDUCON-APA7` (se cambia en `src/Gate.jsx`, lista `VALID_CODES`). Al completar el 100 % de las lecciones, aparece el botón «Volver y desbloquear el siguiente». La dirección de la página de Educación Continua se configura en `HUB_URL` de `src/ec.js`.
