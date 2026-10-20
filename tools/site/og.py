"""Genera las imágenes para redes sociales (Open Graph) y los íconos PNG.

Uso (desde la raíz del repositorio, con Google Chrome instalado):
    python3 tools/site/og.py

Renderiza plantillas HTML con Chrome sin interfaz y guarda los PNG en
assets/images/. Usa la paleta y la tipografía del sitio.
"""
import os
import shutil
import subprocess
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
IMAGES = os.path.join(ROOT, 'assets', 'images')
FAVICON = os.path.join(IMAGES, 'favicon', 'favicon.svg')

CHROME = next((c for c in [os.environ.get('CHROME', ''),
                           '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                           shutil.which('google-chrome') or '', shutil.which('chromium') or '']
               if c and os.path.exists(c)), None)

OG = '''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=block" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; }}
  html, body {{ width: 1200px; height: 630px; overflow: hidden; }}
  body {{ display: grid; grid-template-columns: 1fr 360px; background: #FFFFFF; color: #0B1526; font-family: 'Public Sans', sans-serif; -webkit-font-smoothing: antialiased; }}
  .copy {{ display: grid; grid-template-rows: auto 1fr auto; padding: 64px 64px 56px 72px; }}
  .brand {{ display: flex; align-items: center; gap: 16px; font-size: 28px; font-weight: 700; }}
  .brand img {{ width: 52px; height: 52px; }}
  main {{ align-self: center; display: grid; gap: 22px; }}
  .eyebrow {{ display: flex; align-items: center; gap: 14px; color: #1F5BD8; font-size: 20px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }}
  .eyebrow::before {{ content: ""; width: 36px; height: 4px; background: currentColor; }}
  h1 {{ font-size: 58px; line-height: 1.08; font-weight: 700; letter-spacing: -.015em; }}
  .url {{ color: #4A5568; font-size: 22px; font-weight: 600; }}
  aside {{ display: grid; align-content: center; gap: 14px; padding: 48px 40px; background: #0A2342; color: #FFFFFF; border-left: 8px solid #1F5BD8; }}
  aside p {{ display: grid; grid-template-columns: 36px 1fr; gap: 8px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.18); font-size: 20px; font-weight: 600; line-height: 1.3; }}
  aside b {{ color: #A9C8FF; font-size: 16px; padding-top: 3px; }}
</style></head><body>
  <section class="copy">
    <div class="brand"><img src="file://{favicon}" alt="">Anton Logic</div>
    <main><p class="eyebrow">{eyebrow}</p><h1>{title}</h1></main>
    <p class="url">antonlogic.com</p>
  </section>
  <aside>{items}</aside>
</body></html>'''

SERVICES = {
    'es': ['Consultoría tecnológica', 'Desarrollo web y software a medida', 'Modernización de sistemas y Java', 'Infraestructura en la nube'],
    'en': ['Technology consulting', 'Web and custom software', 'Systems and Java modernization', 'Cloud infrastructure'],
}

SPECS = [
    ('og-image.png', 'es', 'Antonio Ortiz · Consultor en tecnología', 'Decisiones técnicas claras y software que sostiene tu operación.'),
    ('og-image-en.png', 'en', 'Antonio Ortiz · Technology consultant', 'Clear technical decisions and software that keeps your business running.'),
    ('og-services.png', 'es', 'Servicios', 'Cuatro áreas de trabajo, un solo responsable.'),
    ('og-services-en.png', 'en', 'Services', 'Four practice areas, one point of accountability.'),
]

ICON = '''<!doctype html><html><head><meta charset="utf-8"><style>
  * {{ margin: 0; }} html, body {{ width: {size}px; height: {size}px; overflow: hidden; background: {bg}; }}
  img {{ display: block; width: {size}px; height: {size}px; }}
</style></head><body><img src="file://{favicon}" alt=""></body></html>'''

ICONS = [('favicon/apple-touch-icon.png', 180, '#0A2342'), ('favicon/favicon-48.png', 48, 'transparent'),
         ('favicon/icon-512.png', 512, '#0A2342')]


def render(doc, out, width, height):
    with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as f:
        f.write(doc)
        tmp = f.name
    try:
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
                        '--default-background-color=00000000', '--allow-file-access-from-files', '--virtual-time-budget=8000',
                        f'--window-size={width},{height}', f'--screenshot={out}', f'file://{tmp}'], check=True, capture_output=True)
        print('wrote', os.path.relpath(out, ROOT))
    finally:
        os.unlink(tmp)


def main():
    if not CHROME:
        raise SystemExit('No se encontró Google Chrome. Define la variable CHROME con su ruta.')
    for name, lang, eyebrow, title in SPECS:
        items = ''.join(f'<p><b>0{i + 1}</b>{s}</p>' for i, s in enumerate(SERVICES[lang]))
        render(OG.format(favicon=FAVICON, eyebrow=eyebrow, title=title, items=items), os.path.join(IMAGES, name), 1200, 630)
    for name, size, bg in ICONS:
        render(ICON.format(size=size, bg=bg, favicon=FAVICON), os.path.join(IMAGES, name), size, size)


if __name__ == '__main__':
    main()
