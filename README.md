# Anton Logic

Sitio web de **Antonio Ortiz**, consultor independiente en tecnología: [antonlogic.com](https://antonlogic.com).

Servicios:

1. Consultoría tecnológica
2. Desarrollo web y software a medida
3. Escalado y modernización de sistemas, incluidas la migración de sistemas legacy, la actualización de versiones de Java y el manejo avanzado de proyectos legacy en Java
4. Administración de infraestructura en la nube

Es un sitio estático (HTML, CSS y JavaScript sin frameworks), bilingüe (español de México e inglés de EE. UU.) y generado con un script de Python sin dependencias.

## Estructura

```
anton-logic/
├── index.html, services.html, faq.html,      # Páginas en español (generadas)
│   contact.html, privacy.html, terms.html
├── en/                                       # Mismas páginas en inglés (generadas)
├── 404.html                                  # Página de error bilingüe, sin indexar (generada)
├── sitemap.xml, robots.txt, site.webmanifest # (generados)
├── assets/
│   ├── css/styles.css                        # Sistema visual completo: tokens, componentes y rasgos
│   ├── js/script.js                          # Mega-menú, menú móvil, idioma, anclas antiguas y formulario
│   └── images/
│       ├── og-*.png                          # Imágenes para redes sociales (generadas)
│       └── favicon/                          # favicon.svg + PNG derivados (generados)
└── tools/site/
    ├── build.py                              # Generador de páginas, sitemap, robots y manifest
    ├── legal.json                            # Texto de la política de privacidad y los términos (ES/EN)
    └── og.py                                 # Generador de imágenes Open Graph e íconos PNG
```

## Editar el contenido

Los archivos HTML **se generan**. No los edites a mano: los cambios se perderían en la siguiente generación.

1. Edita los textos en `tools/site/build.py`. Cada texto es un par `('español', 'inglés')`. Los servicios (`SERVICES`), el bloque de Java (`JAVA`), los pasos del enfoque (`STEPS`), los casos (`CASES`) y las preguntas frecuentes (`FAQ`) están en listas al inicio del archivo.
2. Para la política de privacidad y los términos, edita `tools/site/legal.json` (HTML simple: `h2`, `h3`, `p`, `ul`, `li`, `strong`, `a`).
3. Regenera el sitio:

```bash
python3 tools/site/build.py
```

Si cambias el titular, los servicios o el logotipo, regenera también las imágenes para redes sociales y los íconos (requiere Google Chrome):

```bash
python3 tools/site/og.py
```

## Desarrollo local

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`. Usa un servidor local: las rutas son absolutas (`/assets/...`, `/en/`) y no funcionan abriendo el archivo directamente.

## Idiomas

- Español en `/` (idioma por defecto) e inglés en `/en/`. Cada página tiene su URL, `canonical` y enlaces `hreflang` (`es-MX`, `en-US` y `x-default`).
- El selector de idioma del encabezado muestra la bandera de México (español) o de EE. UU. (inglés) y lleva a la página equivalente en el otro idioma, conservando la sección.
- La elección se guarda en `localStorage` (`antonlogic-lang-v2`) y se respeta en visitas siguientes. Nunca se redirige según el idioma del navegador, para que los buscadores indexen ambas versiones.

## Diseño

Sistema "Institucional": blanco dominante, bloques azul marino, un acento azul, retícula rígida y esquinas rectas. Los tokens están al inicio de `assets/css/styles.css`.

| Token | Valor | Uso |
|-------|-------|-----|
| `--brand` | `#0A2342` | Bloques oscuros, encabezados de página, logotipo |
| `--brand-deep` | `#071A33` | Banda de cierre y pie de página |
| `--accent` | `#1F5BD8` | Botones, enlaces, detalles y foco |
| `--surface` | `#F1F4F8` | Secciones claras alternas |
| `--text` / `--muted` | `#0B1526` / `#4A5568` | Texto principal y secundario |

- Tipografía: Public Sans 400, 600 y 700 (Google Fonts).
- Contenedor de 1200 px y secciones de 72 a 112 px de alto de relleno.
- Secciones de dos columnas con un diagrama de un lado, alternando el lado y el fondo.
- Mega-menú de Servicios con título y una línea de descripción por servicio.
- Movimiento: solo transiciones de color y borde de 150 ms en hover y foco, desactivadas con `prefers-reduced-motion`.
- Sin cifras de logros, testimonios, logos de clientes ni emojis.

## Accesibilidad

- Contraste WCAG AA verificado en todas las páginas, en ambos idiomas.
- Enlace para saltar al contenido, foco visible y objetivos táctiles de al menos 44 px.
- Mega-menú, menú móvil y selector de idioma operables con teclado (Escape cierra y devuelve el foco; flechas en el selector de idioma).
- Formulario con etiquetas, errores junto a cada campo (`aria-invalid`, `aria-describedby`) y estado en `aria-live`.

## SEO

- Títulos y descripciones únicos por página e idioma.
- Datos estructurados JSON-LD: `WebSite`, `Person`, `ProfessionalService` con catálogo de servicios, `ItemList`, `FAQPage` y `BreadcrumbList`.
- `sitemap.xml` con alternativas por idioma, `robots.txt` e imágenes Open Graph por idioma.
- Las anclas del sitio anterior (`/#contact`, `/#portfolio`, `services.html#servicio-sistemas-legacy`, etc.) se redirigen a la sección o página equivalente (`LEGACY_ANCHORS` en `script.js`).

## Formulario de contacto

- Está en `contact.html`; todos los botones "Agenda una llamada" llevan ahí.
- Se envía a [Web3Forms](https://web3forms.com). La clave pública está en `build.py`.
- Antispam: Cloudflare Turnstile invisible, campo trampa (honeypot), un envío cada 30 segundos y filtro de patrones de spam.
- El asunto del correo indica si el mensaje llegó desde la versión en inglés.

## Despliegue

Publica la raíz del repositorio en cualquier hosting estático. Configura `404.html` como página de error si el hosting no la detecta automáticamente.

## Contacto

- Web: [antonlogic.com](https://antonlogic.com)
- Email: contacto@antonlogic.com
- Teléfono: +52 443 528 8990
- Morelia, Michoacán, México
