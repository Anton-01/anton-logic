"""Genera el sitio estático de antonlogic.com.

Uso (desde la raíz del repositorio):
    python3 tools/site/build.py

Escribe las páginas en español en la raíz y las de inglés en /en/,
además de 404.html, sitemap.xml, robots.txt y site.webmanifest.
Los textos viven en este archivo como pares (español, inglés); los
textos legales viven en legal.json.
"""
import datetime
import html
import json
import os
import re
from urllib.parse import quote

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
LEGAL = json.load(open(os.path.join(HERE, 'legal.json'), encoding='utf-8'))

SITE = 'https://antonlogic.com'
EMAIL = 'contacto@antonlogic.com'
PHONE = '+524435288990'
PHONE_DISPLAY = '+52 443 528 8990'
WHATSAPP_TEXT = {'es': 'Hola Antonio, me gustaría hablar sobre un proyecto.',
                 'en': "Hi Antonio, I'd like to talk about a project."}
LOCALES = {'es': 'es-MX', 'en': 'en-US'}
OG_LOCALES = {'es': 'es_MX', 'en': 'en_US'}
TODAY = datetime.date.today()

LANG = 'es'  # idioma de la página en construcción


# --------------------------------------------------------------------------
# Utilidades
# --------------------------------------------------------------------------

def t(es, en):
    return es if LANG == 'es' else en


def tx(pair):
    return pair[0] if LANG == 'es' else pair[1]


def esc(value):
    return html.escape(value, quote=True)


def url_for(path, lang):
    """Ruta pública. path es la ruta en español: '/', '/services.html', '/#work'."""
    return path if lang == 'es' else '/en' + path


def u(path):
    return url_for(path, LANG)


def whatsapp():
    return 'https://wa.me/524435288990?text=' + quote(WHATSAPP_TEXT[LANG])


# --------------------------------------------------------------------------
# Contenido
# --------------------------------------------------------------------------

SERVICES = [
    {
        'id': 'consultoria', 'icon': 'compass', 'visual': 'roadmap', 'value': 'consulting',
        'title': ('Consultoría tecnológica', 'Technology consulting'),
        'line': ('Decide qué construir, con qué tecnología y en qué orden.',
                 'Decide what to build, with which technology, and in what order.'),
        'summary': ('Te ayudo a tomar decisiones técnicas con información completa, para invertir en lo que tu empresa realmente necesita.',
                    'I help you make technical decisions with complete information, so you invest in what your business actually needs.'),
        'desc': ('Te ayudo a tomar decisiones técnicas con información completa: qué construir, con qué tecnología y en qué orden. El objetivo es invertir en lo que tu empresa realmente necesita y evitar errores costosos.',
                 'I help you make technical decisions with complete information: what to build, with which technology, and in what order. The goal is to invest in what your business actually needs and avoid costly mistakes.'),
        'includes': [
            ('Diagnóstico tecnológico de sistemas y procesos', 'Technology assessment of systems and processes'),
            ('Hoja de ruta de digitalización por etapas', 'Step-by-step digitalization roadmap'),
            ('Selección de herramientas, tecnologías y proveedores', 'Selection of tools, technologies, and vendors'),
            ('Planificación y revisión técnica de proyectos de software', 'Planning and technical review of software projects'),
        ],
        'when': [
            ('Vas a iniciar un proyecto de software y necesitas definir alcance y arquitectura.', 'You are starting a software project and need to define scope and architecture.'),
            ('Tu equipo o proveedor actual necesita una segunda opinión técnica.', 'Your team or current vendor needs a technical second opinion.'),
            ('Quieres digitalizar procesos y no tienes claro por dónde empezar.', 'You want to digitalize processes and are not sure where to start.'),
        ],
    },
    {
        'id': 'desarrollo', 'icon': 'window', 'visual': 'app', 'value': 'development',
        'title': ('Desarrollo web y software a medida', 'Web and custom software development'),
        'line': ('Sitios, aplicaciones internas, APIs e integraciones.', 'Websites, internal applications, APIs, and integrations.'),
        'summary': ('Sitios corporativos, aplicaciones internas, APIs e integraciones construidas a partir de cómo opera tu empresa.',
                    'Corporate websites, internal applications, APIs, and integrations built around how your business operates.'),
        'desc': ('Desarrollo aplicaciones y sitios web adaptados a la forma en que opera tu empresa: desde un sitio corporativo hasta plataformas internas que automatizan procesos y conectan tus sistemas.',
                 'I build applications and websites tailored to the way your business operates: from a corporate website to internal platforms that automate processes and connect your systems.'),
        'includes': [
            ('Aplicaciones web a medida: CRM, paneles de control y reportes', 'Custom web applications: CRM, dashboards, and reporting'),
            ('Sitios corporativos y de comercio electrónico optimizados para SEO', 'Corporate and e-commerce websites optimized for SEO'),
            ('APIs REST y GraphQL con autenticación segura', 'REST and GraphQL APIs with secure authentication'),
            ('Integración con ERPs, CRMs, bases de datos y servicios de terceros', 'Integration with ERPs, CRMs, databases, and third-party services'),
        ],
        'when': [
            ('Tus procesos dependen de hojas de cálculo o tareas manuales.', 'Your processes depend on spreadsheets or manual tasks.'),
            ('Necesitas conectar sistemas que hoy no se comunican entre sí.', 'You need to connect systems that do not talk to each other today.'),
            ('Tu sitio web no refleja el nivel de tu empresa.', 'Your website does not reflect the standard of your business.'),
        ],
    },
    {
        'id': 'modernizacion', 'icon': 'layers', 'visual': 'migration', 'value': 'modernization',
        'title': ('Escalado y modernización de sistemas', 'Systems scaling and modernization'),
        'line': ('Sistemas legacy y actualización de Java sin detener la operación.',
                 'Legacy systems and Java upgrades without stopping operations.'),
        'summary': ('Modernizo sistemas heredados, con especial profundidad en proyectos Java, y los preparo para crecer sin detener la operación.',
                    'I modernize legacy systems, with particular depth in Java projects, and prepare them to grow without stopping operations.'),
        'desc': ('Modernizo sistemas heredados (legacy) y preparo tus aplicaciones para crecer, preservando la lógica de negocio y sin interrumpir la operación. Atiendo con especial profundidad proyectos Java y también trabajo con PHP, Visual Basic 6, Access y .NET.',
                 'I modernize legacy systems and prepare your applications to grow, preserving business logic without interrupting operations. I work in particular depth with Java projects, and also with PHP, Visual Basic 6, Access, and .NET.'),
        'includes': [
            ('Auditoría completa del sistema actual', 'Full audit of the current system'),
            ('Actualización de versiones de Java (de 6, 7 u 8 a 17, 21 o 25 LTS)', 'Java version upgrades (from 6, 7, or 8 to 17, 21, or 25 LTS)'),
            ('Migración de sistemas legacy y de datos, sin pérdida de información', 'Legacy system and data migration with no data loss'),
            ('Modernización del código base por etapas y optimización de rendimiento', 'Incremental codebase modernization and performance optimization'),
        ],
        'when': [
            ('Tu aplicación Java corre en una versión sin soporte o en un servidor de aplicaciones antiguo.', 'Your Java application runs on an unsupported version or an old application server.'),
            ('Tu sistema es difícil de mantener o el rendimiento se degrada conforme crece la operación.', 'Your system is hard to maintain or performance degrades as operations grow.'),
            ('Necesitas integrar un sistema antiguo con servicios actuales.', 'You need to integrate an older system with current services.'),
        ],
    },
    {
        'id': 'nube', 'icon': 'cloud', 'visual': 'cloud', 'value': 'cloud',
        'title': ('Administración de infraestructura en la nube', 'Cloud infrastructure management'),
        'line': ('Despliegue, monitoreo, respaldos y control de costos.', 'Deployment, monitoring, backups, and cost control.'),
        'summary': ('Diseño, despliegue y operación de la infraestructura donde corren tus aplicaciones, con foco en seguridad y costos.',
                    'Design, deployment, and operation of the infrastructure that runs your applications, focused on security and cost.'),
        'desc': ('Diseño, despliego y administro la infraestructura donde operan tus aplicaciones, con énfasis en seguridad, estabilidad y control de costos.',
                 'I design, deploy, and manage the infrastructure your applications run on, with an emphasis on security, stability, and cost control.'),
        'includes': [
            ('Despliegue en AWS, Google Cloud o Azure', 'Deployment on AWS, Google Cloud, or Azure'),
            ('Contenedores con Docker e integración y despliegue continuos (CI/CD)', 'Docker containers and continuous integration and delivery (CI/CD)'),
            ('Monitoreo, respaldos y plan de recuperación', 'Monitoring, backups, and recovery planning'),
            ('Seguridad, control de accesos y optimización de costos', 'Security, access control, and cost optimization'),
        ],
        'when': [
            ('Tus aplicaciones corren en servidores sin mantenimiento ni respaldos.', 'Your applications run on servers without maintenance or backups.'),
            ('Los despliegues son manuales y riesgosos.', 'Deployments are manual and risky.'),
            ('El costo de tu infraestructura crece sin un control claro.', 'Your infrastructure costs grow without clear control.'),
        ],
    },
]

JAVA = {
    'title': ('Java: actualización de versiones y proyectos legacy', 'Java: version upgrades and legacy projects'),
    'intro': ('Muchas operaciones críticas siguen corriendo sobre Java 6, 7 u 8 y servidores de aplicaciones antiguos. Los actualizo por etapas, con pruebas en cada paso, para que el sistema vuelva a tener soporte sin reescribirlo desde cero.',
              'Many critical operations still run on Java 6, 7, or 8 and old application servers. I upgrade them in stages, with tests at every step, so the system is supported again without a rewrite from scratch.'),
    'upgrades_title': ('Actualización de versiones', 'Version upgrades'),
    'upgrades': [
        ('Ruta por etapas entre versiones LTS: 8 → 11 → 17 → 21 → 25', 'Staged path across LTS versions: 8 → 11 → 17 → 21 → 25'),
        ('Reemplazo de APIs eliminadas o en desuso y migración de javax a jakarta', 'Replacement of removed or deprecated APIs and javax to jakarta migration'),
        ('Actualización de Spring Boot, Hibernate, Maven o Gradle y dependencias', 'Upgrades of Spring Boot, Hibernate, Maven or Gradle, and dependencies'),
        ('Pruebas de regresión antes y después de cada salto de versión', 'Regression tests before and after every version step'),
    ],
    'legacy_title': ('Proyectos legacy avanzados', 'Advanced legacy projects'),
    'legacy': [
        ('Aplicaciones Java EE (EJB, JSF, Struts, servlets) en WebLogic, WebSphere o JBoss', 'Java EE applications (EJB, JSF, Struts, servlets) on WebLogic, WebSphere, or JBoss'),
        ('Migración gradual a Spring Boot y servicios independientes, sin reescribir todo de golpe', 'Gradual migration to Spring Boot and independent services, without a big-bang rewrite'),
        ('Pruebas de caracterización para código sin pruebas ni documentación', 'Characterization tests for code with no tests or documentation'),
        ('Ajuste de la JVM (memoria y recolector de basura) y empaquetado en contenedores', 'JVM tuning (memory and garbage collection) and container packaging'),
    ],
}

STEPS = [
    (('Diagnóstico', 'Assessment'), ('Reviso tus sistemas, procesos y objetivos para entender el problema real antes de proponer una solución.', 'I review your systems, processes, and goals to understand the real problem before proposing a solution.')),
    (('Propuesta', 'Proposal'), ('Defino por escrito alcance, arquitectura, entregables y calendario, con un presupuesto claro.', 'I define scope, architecture, deliverables, and schedule in writing, with a clear budget.')),
    (('Ejecución', 'Delivery'), ('Desarrollo por etapas, con entregas que puedes revisar y comunicación directa conmigo en todo momento.', 'I work in stages, with deliverables you can review and direct communication with me throughout.')),
    (('Acompañamiento', 'Support'), ('Después de la entrega doy soporte, mantenimiento y documentación para que tu equipo opere con autonomía.', 'After delivery I provide support, maintenance, and documentation so your team can operate independently.')),
]

CASES = [
    {'name': 'Phaino.mx', 'url': 'https://phaino.mx/',
     'sector': ('Diseño de cocinas · Comercio electrónico', 'Kitchen design · E-commerce'),
     'problem': ('Vender en línea diseño arquitectónico de cocinas a medida, con un catálogo capaz de presentar cada propuesta con calidad visual.',
                 'Selling custom architectural kitchen design online, with a catalog able to present each proposal with visual quality.'),
     'solution': ('Plataforma de venta con catálogo interactivo, diseño personalizado de imágenes y una experiencia enfocada en la conversión.',
                  'A sales platform with an interactive catalog, custom image design, and an experience focused on conversion.'),
     'stack': ['HTML5', 'Vanilla JS', 'cPanel']},
    {'name': 'MaosaPrime', 'url': 'https://maosaprime.maosa.com.mx/',
     'sector': ('Energía · SaaS', 'Energy · SaaS'),
     'problem': ('Los usuarios necesitaban precios de combustibles específicos para su zona y terminal, no una lista general.',
                 'Users needed fuel prices specific to their zone and terminal, not a single general list.'),
     'solution': ('Plataforma web que personaliza precios por usuario, zona y terminal, con seguimiento de uso y sección de proveedores.',
                  'A web platform that personalizes prices by user, zone, and terminal, with usage tracking and a supplier section.'),
     'stack': ['Laravel', 'MariaDB', 'Redis', 'Docker', 'Nginx']},
    {'name': 'WorkHub Interface', 'url': None,
     'sector': ('SaaS · Panel empresarial', 'SaaS · Business dashboard'),
     'problem': ('Un panel empresarial SaaS con una base técnica capaz de procesar tareas en segundo plano y crecer con el producto.',
                 'An enterprise SaaS dashboard on a technical foundation able to process background jobs and grow with the product.'),
     'solution': ('Arquitectura fullstack: Astro y GraphQL en el frontend; Laravel con colas en Horizon y Redis, orquestado con Docker Compose.',
                  'A full-stack architecture: Astro and GraphQL on the frontend; Laravel with Horizon and Redis queues, orchestrated with Docker Compose.'),
     'stack': ['Astro', 'GraphQL', 'Laravel', 'PostgreSQL', 'Redis', 'Docker']},
]

FAQ = [
    (('Servicios', 'Services'), [
        (('¿Qué servicios ofreces?', 'What services do you offer?'),
         ('Ofrezco cuatro servicios: consultoría tecnológica, desarrollo web y software a medida, escalado y modernización de sistemas (incluida la migración de sistemas legacy y la actualización de Java) y administración de infraestructura en la nube.',
          'I offer four services: technology consulting, web and custom software development, systems scaling and modernization (including legacy migration and Java upgrades), and cloud infrastructure management.')),
        (('¿Qué es un sistema legacy y por qué debería modernizarlo?', 'What is a legacy system and why should I modernize it?'),
         ('Un sistema legacy es software obsoleto que aún opera en tu negocio. Modernizarlo reduce costos de mantenimiento, mejora el rendimiento, fortalece la seguridad y permite la integración con tecnologías actuales.',
          'A legacy system is outdated software that still runs part of your business. Modernizing it reduces maintenance costs, improves performance, strengthens security, and enables integration with current technologies.')),
        (('¿Puedes actualizar mi aplicación a una versión reciente de Java?', 'Can you upgrade my application to a recent Java version?'),
         ('Sí. Planeo la actualización por etapas entre versiones LTS (por ejemplo, de Java 8 a 17 o 21), actualizo frameworks y dependencias, reemplazo las APIs eliminadas y valido cada etapa con pruebas de regresión, sin detener la operación.',
          'Yes. I plan the upgrade in stages across LTS versions (for example, from Java 8 to 17 or 21), update frameworks and dependencies, replace removed APIs, and validate every stage with regression tests, without stopping operations.')),
        (('¿Trabajas con aplicaciones Java EE en servidores como WebLogic o WebSphere?', 'Do you work with Java EE applications on servers such as WebLogic or WebSphere?'),
         ('Sí. Puedo mantenerlas, estabilizarlas o migrarlas de forma gradual a Spring Boot y a contenedores, empezando por agregar pruebas al código existente para cambiarlo con seguridad.',
          'Yes. I can maintain them, stabilize them, or migrate them gradually to Spring Boot and containers, starting by adding tests to the existing code so it can be changed safely.')),
        (('¿Con qué tecnologías trabajas?', 'What technologies do you work with?'),
         ('Trabajo con Java y Spring Boot, Laravel, Node.js, Python, React, Vue.js, PostgreSQL, Docker y servicios en la nube como AWS, Google Cloud y Azure, entre otras. Elijo el stack según las necesidades de cada proyecto.',
          'I work with Java and Spring Boot, Laravel, Node.js, Python, React, Vue.js, PostgreSQL, Docker, and cloud services such as AWS, Google Cloud, and Azure, among others. I choose the stack based on each project’s needs.')),
    ]),
    (('Proceso', 'Process'), [
        (('¿Cuánto tiempo toma un proyecto?', 'How long does a project take?'),
         ('Depende de la complejidad. Un sitio web sencillo puede tomar de 1 a 2 semanas, mientras que una solución de software completa puede requerir de 2 a 6 meses. Entrego un calendario detallado como parte de la propuesta.',
          'It depends on complexity. A simple website may take 1 to 2 weeks, while a complete software solution may require 2 to 6 months. I provide a detailed schedule as part of the proposal.')),
        (('¿Cómo es el proceso de trabajo?', 'What does the process look like?'),
         ('Trabajo en cuatro etapas: diagnóstico, propuesta por escrito, ejecución por etapas con entregas revisables y acompañamiento después de la entrega.',
          'I work in four stages: assessment, a written proposal, staged delivery with reviewable deliverables, and support after delivery.')),
        (('¿Ofreces soporte después de la entrega?', 'Do you provide support after delivery?'),
         ('Sí. Incluyo una garantía de 30 días para corrección de errores después de la entrega y ofrezco planes de mantenimiento y soporte continuo.',
          'Yes. I include a 30-day warranty for bug fixes after delivery and offer ongoing maintenance and support plans.')),
    ]),
    (('Precios y pagos', 'Pricing and payment'), [
        (('¿Cuánto cuesta un proyecto?', 'How much does a project cost?'),
         ('Depende del alcance y la complejidad. Los proyectos van desde $20,000 MXN para trabajos sencillos hasta más de $1,000,000 MXN para soluciones empresariales. La llamada inicial no tiene costo.',
          'It depends on scope and complexity. Projects range from $1,000 USD for simple work to more than $50,000 USD for enterprise solutions. The initial call is free.')),
        (('¿Qué métodos de pago aceptas?', 'What payment methods do you accept?'),
         ('Acepto transferencias bancarias y tarjetas de crédito o débito. En proyectos grandes trabajo con pagos por hitos.',
          'I accept bank transfers and credit or debit cards. For larger projects I work with milestone-based payments.')),
    ]),
    (('Preguntas técnicas', 'Technical questions'), [
        (('¿Entregas el código fuente?', 'Do you hand over the source code?'),
         ('Sí. Al completar el proyecto y recibir el pago final, recibes la propiedad total del código fuente y de todos los activos del proyecto.',
          'Yes. When the project is complete and the final payment is received, you get full ownership of the source code and all project assets.')),
        (('¿Puedes integrarte con sistemas existentes?', 'Can you integrate with existing systems?'),
         ('Sí. Ya sea que necesites conectar bases de datos existentes, ERPs, CRMs o servicios de terceros, diseño integraciones que no interrumpan tu operación.',
          'Yes. Whether you need to connect existing databases, ERPs, CRMs, or third-party services, I design integrations that do not disrupt your operations.')),
    ]),
]


# --------------------------------------------------------------------------
# Íconos, banderas y diagramas
# --------------------------------------------------------------------------

ICONS = {
    'compass': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
    'window': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 13h5M8 16h8"/></svg>',
    'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    'cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 9.5 4.25 4.25 0 0 0 7 18z"/></svg>',
}

CHEV = '<svg class="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg>'

LOGO = ('<svg class="logo" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="2" fill="#0A2342"/>'
        '<path d="M9 29L14.5 11.5Q15.2 10 16.5 10T18.5 11.5L24 29M11.2 23H21.8" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
        '<path d="M27.5 10V29H33" fill="none" stroke="#6EA0FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>')

# Bandera de México: franjas verde, blanca y roja con el escudo simplificado
FLAG_MX = ('<svg class="flag" viewBox="0 0 24 16" aria-hidden="true">'
           '<rect width="8" height="16" fill="#006847"/><rect x="8" width="8" height="16" fill="#FFFFFF"/><rect x="16" width="8" height="16" fill="#CE1126"/>'
           '<ellipse cx="12" cy="8.4" rx="2.1" ry="1.9" fill="#8C5A2B"/><path d="M10 10.2q2 1.3 4 0" fill="none" stroke="#006847" stroke-width=".9" stroke-linecap="round"/></svg>')

# Bandera de EE. UU.: 13 franjas y cantón con estrellas simplificadas
FLAG_US = ('<svg class="flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#FFFFFF"/>'
           + ''.join(f'<rect y="{i * 16 / 13 * 2:.3f}" width="24" height="{16 / 13:.3f}" fill="#B22234"/>' for i in range(7))
           + '<rect width="10.4" height="8.62" fill="#3C3B6E"/>'
           + ''.join(f'<circle cx="{1.4 + c * 2.1 + (0.9 if r % 2 else 0):.2f}" cy="{1.2 + r * 1.55:.2f}" r=".42" fill="#FFFFFF"/>'
                     for r in range(5) for c in range(4 if r % 2 else 5))
           + '</svg>')

SVG_STYLE = ('<style>.v-bg{fill:var(--v-bg)}.v-card{fill:var(--v-card);stroke:var(--v-card-line);stroke-width:1.5}'
             '.v-line{stroke:var(--v-line);stroke-width:2;fill:none}.v-dash{stroke:var(--v-line);stroke-width:2;fill:none;stroke-dasharray:6 6}'
             '.v-t{fill:var(--v-text);font:700 16px var(--font-body)}.v-s{fill:var(--v-muted);font:600 12px var(--font-body);letter-spacing:.06em}'
             '.v-acc{fill:var(--v-accent)}.v-acc-t{fill:var(--v-accent-text);font:700 16px var(--font-body)}'
             '.v-acc-line{stroke:var(--v-accent);stroke-width:2.5;fill:none}.v-bar{fill:var(--v-card-line)}</style>')


def svg(view, inner, label):
    return (f'<svg class="visual" viewBox="{view}" role="img" aria-label="{esc(label)}" '
            f'xmlns="http://www.w3.org/2000/svg">{SVG_STYLE}{inner}</svg>')


def box(x, y, w, h, title, sub=None, accent=False):
    if accent:
        return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" class="v-acc"/>'
                f'<text x="{x + 16}" y="{y + h / 2 + 6}" class="v-acc-t">{esc(title)}</text>')
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" class="v-card"/>'
    if sub:
        return out + (f'<text x="{x + 16}" y="{y + 24}" class="v-s">{esc(sub)}</text>'
                      f'<text x="{x + 16}" y="{y + 47}" class="v-t">{esc(title)}</text>')
    return out + f'<text x="{x + 16}" y="{y + h / 2 + 6}" class="v-t">{esc(title)}</text>'


def visual(kind):
    if kind == 'system':
        inner = '<rect width="560" height="440" class="v-bg"/>'
        inner += '<path class="v-line" d="M140 100 V160 H280 M420 100 V160 H280 M280 160 V214"/>'
        inner += '<path class="v-line" d="M280 266 V318 M115 318 H445 M115 318 V344 M280 318 V344 M445 318 V344"/>'
        cur = t('SISTEMA ACTUAL', 'CURRENT SYSTEM')
        inner += box(40, 44, 200, 58, 'ERP', cur) + box(320, 44, 200, 58, 'CRM', cur)
        inner += box(160, 214, 240, 52, t('API de integración', 'Integration API'), accent=True)
        cloud = t('NUBE', 'CLOUD')
        inner += box(40, 344, 150, 58, t('Datos', 'Data'), cloud) + box(205, 344, 150, 58, 'App web' if LANG == 'es' else 'Web app', cloud) + box(370, 344, 150, 58, t('Reportes', 'Reports'), cloud)
        return svg('0 0 560 440', inner, t('Diagrama: sistemas actuales conectados a servicios en la nube mediante una API de integración',
                                           'Diagram: current systems connected to cloud services through an integration API'))
    if kind == 'roadmap':
        inner = '<rect width="560" height="400" class="v-bg"/><path class="v-line" d="M70 200 H490"/>'
        stages = [t('Diagnóstico', 'Assessment'), t('Hoja de ruta', 'Roadmap'), t('Ejecución', 'Delivery'), t('Operación', 'Operations')]
        for i, name in enumerate(stages):
            x = 70 + i * 140
            inner += f'<circle cx="{x}" cy="200" r="14" class="{"v-acc" if i == 1 else "v-card"}"/>'
            top = i % 2 == 0
            y = 104 if top else 252
            inner += f'<path class="v-dash" d="M{x} {186 if top else 214} V{y + 62 if top else y}"/>'
            inner += box(x - 66, y, 132, 62, name, f'{t("ETAPA", "STAGE")} 0{i + 1}')
        inner += f'<text x="40" y="56" class="v-s">{t("PLAN DE TECNOLOGÍA", "TECHNOLOGY PLAN")}</text>'
        return svg('0 0 560 400', inner, t('Diagrama: hoja de ruta en cuatro etapas, del diagnóstico a la operación',
                                           'Diagram: four-stage roadmap from assessment to operations'))
    if kind == 'app':
        inner = '<rect width="560" height="400" class="v-bg"/><rect x="40" y="40" width="480" height="320" rx="6" class="v-card"/>'
        inner += '<path class="v-line" d="M40 84 H520"/>' + ''.join(f'<circle cx="{64 + i * 18}" cy="62" r="5" class="v-bar"/>' for i in range(3))
        inner += '<rect x="40" y="84" width="128" height="276" class="v-bar" opacity=".45"/>'
        for i, name in enumerate([t('Clientes', 'Clients'), t('Pedidos', 'Orders'), t('Reportes', 'Reports'), t('Ajustes', 'Settings')]):
            inner += f'<text x="60" y="{124 + i * 36}" class="{"v-t" if i == 0 else "v-s"}">{name}</text>'
        inner += f'<rect x="188" y="108" width="308" height="46" rx="4" class="v-acc"/><text x="204" y="137" class="v-acc-t">{t("Nuevo registro", "New record")}</text>'
        inner += ''.join(f'<rect x="188" y="{174 + i * 44}" width="308" height="32" rx="3" class="v-bar" opacity=".7"/>' for i in range(4))
        return svg('0 0 560 400', inner, t('Ilustración: aplicación web a medida con menú lateral y lista de registros',
                                           'Illustration: custom web application with a side menu and a list of records'))
    if kind == 'migration':
        inner = '<rect width="560" height="400" class="v-bg"/>'
        inner += f'<text x="30" y="56" class="v-s">{t("ANTES", "BEFORE")}</text><text x="320" y="56" class="v-s">{t("DESPUÉS", "AFTER")}</text>'
        for i, name in enumerate(['Java 8 · Java EE', 'Visual Basic 6', 'PHP 5']):
            inner += box(30, 76 + i * 92, 200, 64, name, 'LEGACY')
        inner += '<path class="v-dash" d="M230 108 H250 V292 H230 M230 200 H250"/>'
        inner += '<path class="v-acc-line" d="M250 200 H306 M292 186 L306 200 L292 214"/>'
        inner += box(320, 76, 210, 64, 'Java 21 · Spring Boot', accent=True)
        inner += box(320, 168, 210, 64, t('API moderna', 'Modern API'), t('ACTUAL', 'CURRENT'))
        inner += box(320, 260, 210, 64, t('Contenedores', 'Containers'), t('ACTUAL', 'CURRENT'))
        return svg('0 0 560 400', inner, t('Diagrama: Java 8 con Java EE, Visual Basic 6 y PHP 5 migrados a Java 21 con Spring Boot, una API moderna y contenedores',
                                           'Diagram: Java 8 with Java EE, Visual Basic 6, and PHP 5 migrated to Java 21 with Spring Boot, a modern API, and containers'))
    if kind == 'cloud':
        inner = '<rect width="560" height="400" class="v-bg"/><rect x="40" y="70" width="480" height="230" rx="8" class="v-dash"/>'
        inner += f'<text x="60" y="100" class="v-s">{t("REGIÓN EN LA NUBE", "CLOUD REGION")}</text>'
        for i, name in enumerate(['App', 'API', 'Workers']):
            inner += box(64 + i * 148, 120, 132, 60, name, t('CONTENEDOR', 'CONTAINER'))
        inner += box(64, 202, 428, 54, t('Base de datos con respaldo diario', 'Database with daily backups'), accent=True)
        inner += '<path class="v-line" d="M130 300 V330 M280 300 V330 M430 300 V330"/>'
        inner += box(64, 330, 132, 46, t('Monitoreo', 'Monitoring')) + box(212, 330, 136, 46, 'CI/CD') + box(364, 330, 132, 46, t('Seguridad', 'Security'))
        return svg('0 0 560 400', inner, t('Diagrama: infraestructura en la nube con contenedores, base de datos, monitoreo, CI/CD y seguridad',
                                           'Diagram: cloud infrastructure with containers, a database, monitoring, CI/CD, and security'))
    if kind == 'profile':
        inner = '<rect width="560" height="400" class="v-bg"/><rect x="40" y="40" width="200" height="200" rx="4" class="v-card"/>'
        inner += '<text x="140" y="164" text-anchor="middle" class="v-t" style="font-size:76px;font-weight:700">AO</text>'
        rows = [(t('UBICACIÓN', 'LOCATION'), 'Morelia, Michoacán'), (t('IDIOMAS', 'LANGUAGES'), t('Español e inglés', 'Spanish and English')),
                (t('MODALIDAD', 'ENGAGEMENT'), t('Remota', 'Remote')), (t('TRATO', 'WORKING WITH ME'), t('Directo, sin intermediarios', 'Direct, no intermediaries'))]
        for i, (k, val) in enumerate(rows):
            inner += f'<text x="272" y="{66 + i * 56}" class="v-s">{k}</text><text x="272" y="{89 + i * 56}" class="v-t">{val}</text>'
        inner += '<path class="v-line" d="M40 280 H520"/>'
        x = 40
        for name in ['Java', 'Spring Boot', 'Laravel', 'PostgreSQL', 'Docker']:
            w = len(name) * 9 + 30
            inner += f'<rect x="{x}" y="306" width="{w}" height="36" rx="2" class="v-card"/><text x="{x + 15}" y="329" class="v-t" style="font-size:14px">{name}</text>'
            x += w + 10
        return svg('0 0 560 400', inner, t('Ficha de Antonio Ortiz: Morelia, español e inglés, trabajo remoto y trato directo',
                                           'Antonio Ortiz profile: Morelia, Spanish and English, remote work, and direct contact'))
    raise ValueError(kind)


def check(items, muted=False):
    cls = ' class="muted"' if muted else ''
    return '<ul class="check-list" role="list">' + ''.join(f'<li{cls}>{tx(i)}</li>' for i in items) + '</ul>'


# --------------------------------------------------------------------------
# Head, encabezado y pie
# --------------------------------------------------------------------------

def person_graph():
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'WebSite', '@id': f'{SITE}/#website', 'url': SITE + '/', 'name': 'Anton Logic',
             'alternateName': 'Antonio Ortiz', 'inLanguage': ['es-MX', 'en-US'], 'publisher': {'@id': f'{SITE}/#business'}},
            {'@type': 'Person', '@id': f'{SITE}/#person', 'name': 'Antonio Ortiz',
             'jobTitle': t('Consultor independiente en tecnología', 'Independent technology consultant'),
             'url': SITE + u('/') + '#about', 'worksFor': {'@id': f'{SITE}/#business'}, 'knowsLanguage': ['es', 'en'],
             'knowsAbout': ['Technology consulting', 'Custom software development', 'Legacy system modernization',
                            'Java version upgrades', 'Java EE', 'Spring Boot', 'Cloud infrastructure', 'Laravel', 'PostgreSQL', 'Docker'],
             'address': {'@type': 'PostalAddress', 'addressLocality': 'Morelia', 'addressRegion': 'Michoacán', 'addressCountry': 'MX'}},
            {'@type': 'ProfessionalService', '@id': f'{SITE}/#business', 'name': 'Anton Logic',
             'description': t('Consultoría tecnológica, desarrollo web y software a medida, escalado y modernización de sistemas (incluida la actualización de Java) e infraestructura en la nube.',
                              'Technology consulting, web and custom software development, systems scaling and modernization (including Java upgrades), and cloud infrastructure.'),
             'url': SITE + '/', 'logo': f'{SITE}/assets/images/favicon/icon-512.png', 'image': f'{SITE}/assets/images/og-image.png',
             'email': EMAIL, 'telephone': PHONE, 'priceRange': '$$', 'founder': {'@id': f'{SITE}/#person'},
             'address': {'@type': 'PostalAddress', 'addressLocality': 'Morelia', 'addressRegion': 'Michoacán', 'addressCountry': 'MX'},
             'areaServed': [{'@type': 'Country', 'name': 'Mexico'}, {'@type': 'Country', 'name': 'United States'}],
             'availableLanguage': ['es', 'en'],
             'sameAs': ['https://facebook.com/antonlogic', 'https://instagram.com/antonlogic', 'https://linkedin.com/company/antonlogic'],
             'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': t('Servicios', 'Services'), 'itemListElement': [
                 {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': tx(s['title']), 'description': tx(s['desc']),
                                                     'url': SITE + u('/services.html') + '#' + s['id']}} for s in SERVICES]}},
        ],
    }


def breadcrumb(name, path):
    crumbs = (f'<ol class="breadcrumb" role="list"><li><a href="{u("/")}">{t("Inicio", "Home")}</a></li>'
              f'<li aria-current="page">{tx(name)}</li></ol>')
    data = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': t('Inicio', 'Home'), 'item': SITE + u('/')},
        {'@type': 'ListItem', 'position': 2, 'name': tx(name), 'item': SITE + u(path)}]}
    return crumbs, data


def head(page):
    path = page['path']
    canonical = SITE + u(path)
    title, desc = tx(page['title']), tx(page['desc'])
    og = f"{SITE}/assets/images/{page.get('og', 'og-image')}{'' if LANG == 'es' else '-en'}.png"
    og_alt = t('Antonio Ortiz, consultor independiente en tecnología', 'Antonio Ortiz, independent technology consultant')
    other = 'en' if LANG == 'es' else 'es'
    alternates = ''
    if page.get('alternates', True):
        alternates = (f'\n    <link rel="alternate" hreflang="es-MX" href="{SITE}{url_for(path, "es")}">'
                      f'\n    <link rel="alternate" hreflang="en-US" href="{SITE}{url_for(path, "en")}">'
                      f'\n    <link rel="alternate" hreflang="x-default" href="{SITE}{url_for(path, "es")}">')
    jsonld = ''.join(f'\n    <script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>' for b in page.get('jsonld', []))
    turnstile = '\n    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' if page.get('form') else ''
    return f'''<!DOCTYPE html>
<html lang="{LOCALES[LANG]}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{esc(title)}</title>
    <meta name="description" content="{esc(desc)}">
    <meta name="author" content="Antonio Ortiz">
    <meta name="robots" content="{page.get('robots', 'index, follow, max-image-preview:large, max-snippet:-1')}">
    <link rel="canonical" href="{canonical}">{alternates}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Anton Logic">
    <meta property="og:url" content="{canonical}">
    <meta property="og:title" content="{esc(title)}">
    <meta property="og:description" content="{esc(desc)}">
    <meta property="og:image" content="{og}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="{esc(og_alt)}">
    <meta property="og:locale" content="{OG_LOCALES[LANG]}">
    <meta property="og:locale:alternate" content="{OG_LOCALES[other]}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{esc(title)}">
    <meta name="twitter:description" content="{esc(desc)}">
    <meta name="twitter:image" content="{og}">
    <meta name="theme-color" content="#FFFFFF">
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="48x48" href="/assets/images/favicon/favicon-48.png">
    <link rel="apple-touch-icon" href="/assets/images/favicon/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/styles.css">
    <script>
        document.documentElement.classList.add('js');
        // Respeta el idioma elegido explícitamente por el visitante (nunca el del navegador)
        (function () {{
            try {{
                var pref = localStorage.getItem('antonlogic-lang-v2');
                var current = document.documentElement.lang.slice(0, 2);
                var alt = pref && pref !== current && document.querySelector('link[rel="alternate"][hreflang^="' + pref + '"]');
                if (alt) location.replace(new URL(alt.href).pathname + location.hash);
            }} catch (e) {{}}
        }})();
    </script>{turnstile}{jsonld}
</head>
'''


NAV = [('approach', ('Enfoque', 'Approach'), '/#approach'), ('work', ('Casos', 'Work'), '/#work'),
       ('about', ('Sobre mí', 'About'), '/#about'), ('faq', ('Preguntas', 'FAQ'), '/faq.html')]


def local(href, current):
    # En la portada, los anclajes son locales para no recargar la página
    return href[1:] if current == 'home' and href.startswith('/#') else u(href)


def lang_select(path):
    names = {'es': 'Español (México)', 'en': 'English (US)'}
    flags = {'es': FLAG_MX, 'en': FLAG_US}
    items = ''.join(
        f'<li><a href="{url_for(path, code)}" hreflang="{LOCALES[code]}" lang="{LOCALES[code]}" data-lang="{code}"'
        f'{" aria-current=\"true\"" if code == LANG else ""}>{flags[code]}<span>{names[code]}</span></a></li>'
        for code in ('es', 'en'))
    label = t('Idioma', 'Language')
    return f'''<div class="lang-select" data-lang-select>
                <button class="lang-button" type="button" aria-expanded="false" aria-controls="lang-menu" aria-label="{label}: {names[LANG]}">{flags[LANG]}<span class="lang-code">{LANG.upper()}</span>{CHEV}</button>
                <ul class="lang-menu" id="lang-menu" role="list" aria-label="{label}">{items}</ul>
            </div>'''


def header(current, path):
    mega_items = '\n'.join(
        f'''                        <li><a href="{u('/services.html')}#{s['id']}"><span class="mega-icon">{ICONS[s['icon']]}</span><span><strong>{tx(s['title'])}</strong><span class="desc">{tx(s['line'])}</span></span></a></li>'''
        for s in SERVICES)
    links = '\n'.join(
        f'''                <li><a class="nav-link" href="{local(href, current)}"{' aria-current="page"' if key == current else ''}>{tx(label)}</a></li>'''
        for key, label, href in NAV)
    contact = u('/contact.html')
    cur_serv = ' aria-current="page"' if current == 'services' else ''
    return f'''<body>
    <a class="skip-link" href="#main">{t('Saltar al contenido', 'Skip to content')}</a>
    <header class="site-header" id="site-header">
        <div class="container header-inner">
            <a class="brand-mark" href="{u('/')}" aria-label="{t('Anton Logic, inicio', 'Anton Logic, home')}">{LOGO}<span translate="no">Anton Logic</span></a>
            <nav class="main-nav" aria-label="{t('Principal', 'Main')}">
                <ul class="nav-list" id="nav-list" role="list">
                <li class="has-mega">
                    <button class="nav-link" id="mega-btn" type="button" aria-expanded="false" aria-controls="mega-servicios"{cur_serv}>{t('Servicios', 'Services')} {CHEV}</button>
                    <div class="mega" id="mega-servicios" hidden>
                        <div class="container mega-inner">
                            <div class="mega-intro">
                                <p class="mega-title">{t('Servicios', 'Services')}</p>
                                <p>{t('Cuatro áreas de trabajo con un solo responsable, de la decisión técnica a la operación diaria.', 'Four practice areas with a single point of accountability, from technical decisions to day-to-day operations.')}</p>
                                <a class="text-link" href="{u('/services.html')}">{t('Ver todos los servicios', 'View all services')}</a>
                            </div>
                            <ul class="mega-list" role="list">
{mega_items}
                            </ul>
                            <div class="mega-foot"><span>{t('¿No sabes cuál necesitas? En la primera llamada lo definimos juntos.', 'Not sure which one you need? We will work it out on the first call.')}</span><a class="text-link" href="{contact}">{t('Agenda una llamada', 'Book a call')}</a></div>
                        </div>
                    </div>
                </li>
{links}
                <li class="nav-cta"><a class="btn btn-primary" href="{contact}">{t('Agenda una llamada', 'Book a call')}</a></li>
                </ul>
            </nav>
            <div class="header-actions">
            {lang_select(path)}
                <a class="btn btn-primary btn-sm header-cta" href="{contact}">{t('Agenda una llamada', 'Book a call')}</a>
                <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-list">{t('Menú', 'Menu')}</button>
            </div>
        </div>
    </header>
'''


def cta_band():
    return f'''
        <section class="cta-outer" aria-labelledby="cta-title">
            <div class="cta-band-wrap bg-deep on-dark section">
                <div class="container cta-band">
                    <div>
                        <h2 class="h2" id="cta-title">{t('Hablemos de tu próximo proyecto.', "Let's talk about your next project.")}</h2>
                        <p>{t('Cuéntame qué necesitas resolver. Leo personalmente cada mensaje y respondo en menos de 24 horas para coordinar una llamada inicial sin costo.', 'Tell me what you need to solve. I read every message personally and reply within 24 hours to arrange an initial call at no cost.')}</p>
                    </div>
                    <a class="btn btn-primary" href="{u('/contact.html')}">{t('Agenda una llamada', 'Book a call')}</a>
                </div>
            </div>
        </section>
'''


def footer(current):
    serv = ''.join(f'<li><a href="{u("/services.html")}#{s["id"]}">{tx(s["title"])}</a></li>' for s in SERVICES)
    return f'''
    <footer class="site-footer on-dark">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a class="brand-mark" href="{u('/')}">{LOGO}<span translate="no">Anton Logic</span></a>
                    <p>{t('Antonio Ortiz, consultor independiente en tecnología. Consultoría, software a medida, modernización de sistemas e infraestructura en la nube.', 'Antonio Ortiz, independent technology consultant. Consulting, custom software, systems modernization, and cloud infrastructure.')}</p>
                    <a class="btn btn-primary btn-sm footer-cta" href="{u('/contact.html')}">{t('Agenda una llamada', 'Book a call')}</a>
                </div>
                <nav aria-label="{t('Servicios', 'Services')}"><h2 class="footer-title">{t('Servicios', 'Services')}</h2><ul class="footer-links" role="list">{serv}</ul></nav>
                <nav aria-label="{t('Sitio', 'Site')}"><h2 class="footer-title">{t('Sitio', 'Site')}</h2><ul class="footer-links" role="list">
                    <li><a href="{local('/#approach', current)}">{t('Enfoque', 'Approach')}</a></li>
                    <li><a href="{local('/#work', current)}">{t('Casos', 'Work')}</a></li>
                    <li><a href="{local('/#about', current)}">{t('Sobre mí', 'About')}</a></li>
                    <li><a href="{u('/faq.html')}">{t('Preguntas frecuentes', 'FAQ')}</a></li>
                    <li><a href="{u('/contact.html')}">{t('Contacto', 'Contact')}</a></li></ul></nav>
                <nav aria-label="Legal"><h2 class="footer-title">Legal</h2><ul class="footer-links" role="list">
                    <li><a href="{u('/privacy.html')}">{t('Política de privacidad', 'Privacy policy')}</a></li>
                    <li><a href="{u('/terms.html')}">{t('Términos de servicio', 'Terms of service')}</a></li></ul></nav>
                <div><h2 class="footer-title">{t('Contacto', 'Contact')}</h2><ul class="footer-links" role="list">
                    <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
                    <li><a href="tel:{PHONE}">{PHONE_DISPLAY}</a></li>
                    <li><a href="{whatsapp()}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                    <li><a href="https://facebook.com/antonlogic" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><span>Morelia, Michoacán, {t('México', 'Mexico')}</span></li></ul></div>
            </div>
            <div class="footer-bottom">
                <p>© {TODAY.year} Antonio Ortiz · Anton Logic. {t('Todos los derechos reservados.', 'All rights reserved.')}</p>
                <p>{t('Hecho en Morelia, México.', 'Made in Morelia, Mexico.')}</p>
            </div>
        </div>
    </footer>
    <script src="/assets/js/script.js"></script>
</body>
</html>
'''


def render(page, current, body):
    # La 404 no tiene equivalente por idioma: el selector lleva a cada inicio
    lang_path = page.get('lang_path', page['path'])
    return head(page) + header(current, lang_path) + f'    <main id="main">\n{body}\n    </main>\n' + footer(current)


def page_hero(eyebrow, title, lead, crumbs):
    return f'''
        <section class="page-hero on-dark" aria-labelledby="page-title">
            <div class="container">
                {crumbs}
                <p class="eyebrow" style="margin-top:32px">{eyebrow}</p>
                <h1 class="h1" id="page-title">{title}</h1>
                <p class="lead">{lead}</p>
            </div>
        </section>'''


# --------------------------------------------------------------------------
# Páginas
# --------------------------------------------------------------------------

def home():
    page = {'path': '/',
            'title': ('Antonio Ortiz · Consultoría tecnológica y software a medida', 'Antonio Ortiz · Technology Consulting & Custom Software'),
            'desc': ('Consultor independiente en tecnología: consultoría, software a medida, modernización de sistemas legacy y Java, e infraestructura en la nube.',
                     'Independent technology consultant: consulting, custom software, legacy and Java modernization, and cloud infrastructure for businesses in Mexico and the US.'),
            'jsonld': [person_graph()]}

    cards = '\n'.join(f'''                    <li class="service-card">
                        <span class="mega-icon">{ICONS[s['icon']]}</span>
                        <h3>{tx(s['title'])}</h3>
                        <p>{tx(s['summary'])}</p>
                        <a class="text-link" href="{u('/services.html')}#{s['id']}" aria-label="{t('Conocer más sobre', 'Learn more about')} {tx(s['title']).lower()}">{t('Conocer más', 'Learn more')}</a>
                    </li>''' for s in SERVICES)

    m, c = SERVICES[2], SERVICES[3]
    steps = '\n'.join(f'''                    <li class="step"><span class="step-num">0{i + 1}</span><h3>{tx(title)}</h3><p>{tx(text)}</p></li>'''
                      for i, (title, text) in enumerate(STEPS))

    def case(cs):
        link = (f'<a class="text-link" href="{cs["url"]}" target="_blank" rel="noopener" aria-label="{t("Visitar", "Visit")} {cs["name"]} ({t("se abre en una pestaña nueva", "opens in a new tab")})">{t("Visitar sitio", "Visit site")}</a>'
                if cs['url'] else f'<span class="muted" style="font-size:14px">{t("Proyecto privado", "Private project")}</span>')
        tags = ''.join(f'<li>{x}</li>' for x in cs['stack'])
        return f'''                    <li class="case-card">
                        <p class="sector">{tx(cs['sector'])}</p>
                        <h3 translate="no">{cs['name']}</h3>
                        <dl><div><dt>{t('Problema', 'Challenge')}</dt><dd>{tx(cs['problem'])}</dd></div><div><dt>{t('Solución', 'Solution')}</dt><dd>{tx(cs['solution'])}</dd></div></dl>
                        <div class="case-foot"><ul class="tags" role="list" translate="no">{tags}</ul>{link}</div>
                    </li>'''

    body = f'''
        <section class="hero section bg-white" aria-labelledby="hero-title">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">{t('Antonio Ortiz · Consultor independiente en tecnología', 'Antonio Ortiz · Independent technology consultant')}</p>
                    <h1 class="h1" id="hero-title">{t('Decisiones técnicas claras y software que sostiene tu operación.', 'Clear technical decisions and software that keeps your business running.')}</h1>
                    <p class="lead">{t('Ayudo a empresas a definir su estrategia tecnológica, construir software a medida, modernizar los sistemas que ya tienen y operar su infraestructura en la nube. Trabajas directamente conmigo, del diagnóstico al soporte.', 'I help businesses define their technology strategy, build custom software, modernize the systems they already have, and run their cloud infrastructure. You work directly with me, from assessment to support.')}</p>
                    <div class="hero-actions"><a class="btn btn-primary" href="{u('/contact.html')}">{t('Agenda una llamada', 'Book a call')}</a><a class="btn btn-ghost" href="{u('/services.html')}">{t('Ver servicios', 'View services')}</a></div>
                </div>
                <div class="hero-visual">{visual('system')}</div>
            </div>
        </section>

        <section class="section bg-surface" id="services" aria-labelledby="services-title">
            <div class="container">
                <div class="section-head">
                    <p class="eyebrow">{t('Servicios', 'Services')}</p>
                    <h2 class="h2" id="services-title">{t('De la decisión técnica a la operación diaria.', 'From technical decisions to day-to-day operations.')}</h2>
                    <p class="lead">{t('Cuatro áreas de trabajo con un solo responsable. Puedes contratarlas por separado o combinarlas según lo que necesite tu empresa.', 'Four practice areas with a single point of accountability. You can engage them separately or combine them based on what your business needs.')}</p>
                </div>
                <ul class="service-cards" role="list">
{cards}
                </ul>
            </div>
        </section>

        <section class="section bg-white" aria-labelledby="f1-title">
            <div class="container split">
                <div class="split-copy">
                    <p class="eyebrow">{t('Modernización y Java', 'Modernization and Java')}</p>
                    <h2 class="h2" id="f1-title">{t('Moderniza tu sistema sin detener la operación.', 'Modernize your system without stopping operations.')}</h2>
                    <p class="lead">{tx(m['desc'])}</p>
                    {check([m['includes'][1], JAVA['legacy'][1], m['includes'][2]])}
                    <a class="text-link" href="{u('/services.html')}#java">{t('Actualización de Java y proyectos legacy', 'Java upgrades and legacy projects')}</a>
                </div>
                <div class="split-visual">{visual('migration')}</div>
            </div>
        </section>

        <section class="section bg-brand on-dark" aria-labelledby="f2-title">
            <div class="container split reverse">
                <div class="split-copy">
                    <p class="eyebrow">{t('Infraestructura en la nube', 'Cloud infrastructure')}</p>
                    <h2 class="h2" id="f2-title">{t('Infraestructura estable, segura y con costos bajo control.', 'Stable, secure infrastructure with costs under control.')}</h2>
                    <p class="lead">{tx(c['desc'])}</p>
                    {check(c['includes'][1:4])}
                    <a class="text-link" href="{u('/services.html')}#nube">{t('Ver el servicio completo', 'See the full service')}</a>
                </div>
                <div class="split-visual">{visual('cloud')}</div>
            </div>
        </section>

        <section class="section bg-surface approach" id="approach" aria-labelledby="approach-title">
            <div class="container">
                <div class="section-head">
                    <p class="eyebrow">{t('Enfoque', 'Approach')}</p>
                    <h2 class="h2" id="approach-title">{t('Cómo trabajo', 'How I work')}</h2>
                    <p class="lead">{t('Un proceso simple y documentado, para que en cada etapa sepas qué se está haciendo, por qué y qué sigue.', 'A simple, documented process, so at every stage you know what is being done, why, and what comes next.')}</p>
                </div>
                <ol class="steps" role="list">
{steps}
                </ol>
            </div>
        </section>

        <section class="section bg-white" id="work" aria-labelledby="work-title">
            <div class="container">
                <div class="section-head">
                    <p class="eyebrow">{t('Casos', 'Work')}</p>
                    <h2 class="h2" id="work-title">{t('Proyectos recientes', 'Recent projects')}</h2>
                    <p class="lead">{t('Una selección de proyectos que diseñé y desarrollé para clientes en distintas industrias.', 'A selection of projects I designed and built for clients across different industries.')}</p>
                </div>
                <ul class="case-cards" role="list">
{chr(10).join(case(cs) for cs in CASES)}
                </ul>
            </div>
        </section>

        <section class="section bg-brand on-dark" id="about" aria-labelledby="about-title">
            <div class="container split">
                <div class="split-copy">
                    <p class="eyebrow">{t('Sobre mí', 'About')}</p>
                    <h2 class="h2" id="about-title">Antonio Ortiz</h2>
                    <p class="lead">{t('Soy consultor independiente en tecnología. Trabajo con empresas que necesitan software que funcione en producción: sistemas que sostienen su operación diaria, integraciones entre plataformas y aplicaciones que deben crecer sin rehacerse.', 'I am an independent technology consultant. I work with businesses that need software that holds up in production: systems that support their daily operations, integrations between platforms, and applications that must grow without being rebuilt.')}</p>
                    <p class="muted">{t('No soy una agencia. Me involucro personalmente en cada proyecto, desde el diagnóstico hasta el soporte posterior a la entrega, y trabajo de forma remota con clientes de México y del extranjero.', 'I am not an agency. I am personally involved in every project, from assessment to post-delivery support, and I work remotely with clients in Mexico and abroad.')}</p>
                </div>
                <div class="split-visual">{visual('profile')}</div>
            </div>
        </section>
{cta_band()}'''
    return render(page, 'home', body)


def services_page():
    crumbs, crumb_data = breadcrumb(('Servicios', 'Services'), '/services.html')
    page = {'path': '/services.html', 'og': 'og-services',
            'title': ('Servicios de consultoría y desarrollo · Antonio Ortiz', 'Technology Consulting & Software Services · Antonio Ortiz'),
            'desc': ('Consultoría tecnológica, software a medida, modernización de sistemas legacy, actualización de versiones de Java e infraestructura en la nube.',
                     'Technology consulting, custom software, legacy system modernization, Java version upgrades, and cloud infrastructure management.'),
            'jsonld': [crumb_data, {'@context': 'https://schema.org', '@type': 'ItemList', 'name': t('Servicios', 'Services'), 'itemListElement': [
                {'@type': 'ListItem', 'position': i + 1, 'item': {'@type': 'Service', 'name': tx(s['title']), 'description': tx(s['desc']),
                 'url': SITE + u('/services.html') + '#' + s['id'], 'areaServed': ['MX', 'US'], 'provider': {'@id': f'{SITE}/#business'}}}
                for i, s in enumerate(SERVICES)]}]}

    index = ''.join(f'<li><a href="#{s["id"]}"><span class="mega-icon">{ICONS[s["icon"]]}</span>{tx(s["title"])}</a></li>' for s in SERVICES)
    backgrounds = ['bg-white', 'bg-surface', 'bg-white', 'bg-brand on-dark']
    sections = []
    for i, s in enumerate(SERVICES):
        java = ''
        if s['id'] == 'modernizacion':
            java = f'''
                    <div class="java-block" id="java">
                        <h3 class="h3">{tx(JAVA['title'])}</h3>
                        <p>{tx(JAVA['intro'])}</p>
                        <div class="detail-cols">
                            <div><h4 class="detail-label">{tx(JAVA['upgrades_title'])}</h4>{check(JAVA['upgrades'])}</div>
                            <div><h4 class="detail-label">{tx(JAVA['legacy_title'])}</h4>{check(JAVA['legacy'])}</div>
                        </div>
                    </div>'''
        sections.append(f'''
        <section class="section {backgrounds[i]}" id="{s['id']}" aria-labelledby="{s['id']}-title">
            <div class="container split split-detail{' reverse' if i % 2 else ''}">
                <div class="split-copy">
                    <p class="eyebrow">{t('Servicio', 'Service')} 0{i + 1}</p>
                    <h2 class="h2" id="{s['id']}-title">{tx(s['title'])}</h2>
                    <p class="lead">{tx(s['desc'])}</p>
                    <div class="detail-cols">
                        <div><h3 class="detail-label">{t('Qué incluye', 'What it includes')}</h3>{check(s['includes'])}</div>
                        <div><h3 class="detail-label">{t('Cuándo tiene sentido', 'When it makes sense')}</h3>{check(s['when'], muted=True)}</div>
                    </div>{java}
                    <a class="btn btn-primary split-cta" href="{u('/contact.html')}">{t('Hablemos de tu proyecto', "Let's discuss your project")}</a>
                </div>
                <div class="split-visual">{visual(s['visual'])}</div>
            </div>
        </section>''')

    body = page_hero(t('Servicios', 'Services'), t('Cuatro áreas de trabajo, un solo responsable.', 'Four practice areas, one point of accountability.'),
                     t('Puedes contratarlas por separado o combinarlas según lo que necesite tu empresa. En todas trabajas directamente conmigo.', 'You can engage them separately or combine them based on what your business needs. In all of them you work directly with me.'), crumbs)
    body += f'''
        <section class="section bg-surface service-index-wrap" aria-label="{t('Índice de servicios', 'Services index')}">
            <div class="container"><ul class="service-index" role="list">{index}</ul></div>
        </section>'''
    body += ''.join(sections) + cta_band()
    return render(page, 'services', body)


def faq_page():
    crumbs, crumb_data = breadcrumb(('Preguntas frecuentes', 'FAQ'), '/faq.html')
    page = {'path': '/faq.html',
            'title': ('Preguntas frecuentes sobre proyectos · Antonio Ortiz', 'FAQ: Consulting, Software & Java · Antonio Ortiz'),
            'desc': ('Plazos, precios, proceso de trabajo, sistemas legacy, actualización de Java y propiedad del código: respuestas directas antes de iniciar un proyecto.',
                     'Timelines, pricing, working process, legacy systems, Java upgrades, and code ownership: straight answers before starting a project.'),
            'jsonld': [crumb_data, {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
                {'@type': 'Question', 'name': tx(q), 'acceptedAnswer': {'@type': 'Answer', 'text': tx(a)}}
                for _, items in FAQ for q, a in items]}]}
    side = ''.join(f'<li><a href="#group-{i}">{tx(g)}</a></li>' for i, (g, _) in enumerate(FAQ))
    groups = ''
    for i, (g, items) in enumerate(FAQ):
        rows = ''.join(f'<details class="faq-item"><summary>{tx(q)}</summary><p>{tx(a)}</p></details>' for q, a in items)
        groups += f'<section class="faq-group" id="group-{i}" aria-labelledby="group-{i}-title"><h2 id="group-{i}-title">{tx(g)}</h2>{rows}</section>'
    body = page_hero(t('Preguntas frecuentes', 'FAQ'), t('Respuestas directas antes de empezar.', 'Straight answers before we start.'),
                     t('Plazos, precios, proceso de trabajo y aspectos técnicos. Si tu pregunta no está aquí, escríbeme.', 'Timelines, pricing, working process, and technical topics. If your question is not here, get in touch.'), crumbs)
    body += f'''
        <section class="section bg-surface">
            <div class="container faq-layout">
                <nav aria-label="{t('Categorías', 'Categories')}"><ul class="side-nav" role="list">{side}</ul></nav>
                <div>{groups}</div>
            </div>
        </section>''' + cta_band()
    return render(page, 'faq', body)


def contact_page():
    crumbs, crumb_data = breadcrumb(('Contacto', 'Contact'), '/contact.html')
    page = {'path': '/contact.html', 'form': True,
            'title': ('Contacto · Agenda una llamada con Antonio Ortiz', 'Contact · Book a call with Antonio Ortiz'),
            'desc': ('Cuéntame sobre tu proyecto de software, modernización o infraestructura. Respondo en menos de 24 horas para coordinar una llamada inicial sin costo.',
                     'Tell me about your software, modernization, or infrastructure project. I reply within 24 hours to arrange a free initial call.'),
            'jsonld': [crumb_data]}
    service_opts = ''.join(f'<option value="{s["value"]}">{tx(s["title"])}</option>' for s in SERVICES)
    budgets = [('small', '$20,000 – $100,000 MXN', '$1,000 – $5,000 USD'), ('medium', '$100,000 – $300,000 MXN', '$5,000 – $15,000 USD'),
               ('large', '$300,000 – $1,000,000 MXN', '$15,000 – $50,000 USD'), ('enterprise', 'Más de $1,000,000 MXN', 'More than $50,000 USD')]
    budget_opts = ''.join(f'<option value="{v}">{t(es, en)}</option>' for v, es, en in budgets)
    subject = t('Nuevo mensaje de contacto - Anton Logic', 'New contact message (EN) - Anton Logic')
    body = page_hero(t('Contacto', 'Contact'), t('Agenda una llamada.', 'Book a call.'),
                     t('Cuéntame sobre tu proyecto o el problema que necesitas resolver. Leo personalmente cada mensaje y respondo en menos de 24 horas para coordinar una llamada inicial sin costo.',
                       'Tell me about your project or the problem you need to solve. I read every message personally and reply within 24 hours to arrange an initial call at no cost.'), crumbs)
    body += f'''
        <section class="section bg-surface" aria-labelledby="form-title">
            <div class="container contact-layout">
                <div class="contact-info">
                    <h2 class="h3">{t('Otras formas de contacto', 'Other ways to reach me')}</h2>
                    <dl>
                        <div><dt>Email</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
                        <div><dt>{t('Teléfono', 'Phone')}</dt><dd><a href="tel:{PHONE}">{PHONE_DISPLAY}</a></dd></div>
                        <div><dt>WhatsApp</dt><dd><a href="{whatsapp()}" target="_blank" rel="noopener noreferrer">{t('Enviar mensaje', 'Send a message')}</a></dd></div>
                        <div><dt>{t('Ubicación', 'Location')}</dt><dd>Morelia, Michoacán, {t('México', 'Mexico')}</dd></div>
                    </dl>
                </div>
                <form class="form-card" id="contact-form" action="https://api.web3forms.com/submit" method="POST" aria-labelledby="form-title">
                    <h2 class="visually-hidden" id="form-title">{t('Formulario de contacto', 'Contact form')}</h2>
                    <div class="form-meta">
                        <div class="honeypot" aria-hidden="true"><label for="botcheck">{t('No llenar', 'Do not fill')}</label><input type="text" id="botcheck" name="botcheck" tabindex="-1" autocomplete="off"></div>
                        <input type="hidden" name="access_key" value="4aaebafc-a71a-4564-b389-d1d7e6ef853b">
                        <input type="hidden" name="subject" value="{esc(subject)}">
                        <input type="hidden" name="from_name" value="Anton Logic Website">
                        <div id="turnstile-widget" data-sitekey="0x4AAAAAACiJfSLnqGKRMtIa" data-size="invisible" data-theme="light"></div>
                        <input type="hidden" name="cf-turnstile-response" id="turnstile-token">
                    </div>
                    <div class="field"><label for="name">{t('Nombre completo', 'Full name')}</label><input id="name" name="name" autocomplete="name" required minlength="2" maxlength="100" aria-describedby="name-error" placeholder="{t('Ana García…', 'Jane Smith…')}"><p class="field-error" id="name-error"></p></div>
                    <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" spellcheck="false" inputmode="email" required aria-describedby="email-error" placeholder="{t('nombre@empresa.com…', 'name@company.com…')}"><p class="field-error" id="email-error"></p></div>
                    <div class="field"><label for="service">{t('Servicio de interés', 'Service of interest')}</label><select id="service" name="service" required aria-describedby="service-error"><option value="">{t('Selecciona un servicio', 'Select a service')}</option>{service_opts}<option value="other">{t('Otro', 'Other')}</option></select><p class="field-error" id="service-error"></p></div>
                    <div class="field"><label for="budget">{t('Presupuesto estimado', 'Estimated budget')} <span class="opt">{t('(opcional)', '(optional)')}</span></label><select id="budget" name="budget"><option value="">{t('Selecciona un rango', 'Select a range')}</option>{budget_opts}</select></div>
                    <div class="field full"><label for="message">{t('Cuéntame sobre tu proyecto', 'Tell me about your project')}</label><textarea id="message" name="message" required aria-describedby="message-error" placeholder="{t('Describe brevemente tu necesidad…', 'Briefly describe what you need…')}"></textarea><p class="field-error" id="message-error"></p></div>
                    <div class="form-actions"><button class="btn btn-primary" type="submit">{t('Enviar mensaje', 'Send message')}</button><p class="form-status" role="status" aria-live="polite"></p><p class="form-note">{t('Al enviar este formulario aceptas la', 'By submitting this form you accept the')} <a href="{u('/privacy.html')}">{t('Política de privacidad', 'Privacy policy')}</a>.</p></div>
                </form>
            </div>
        </section>'''
    return render(page, 'contact', body)


def legal_page(key, title, desc, updated):
    path = f'/{key}.html'
    crumbs, crumb_data = breadcrumb(title, path)
    page = {'path': path, 'title': (f'{title[0]} · Anton Logic', f'{title[1]} · Anton Logic'), 'desc': desc, 'jsonld': [crumb_data]}
    content = LEGAL[f'{key}-{LANG}']
    toc = ''.join(f'<li><a href="#{i}">{txt}</a></li>' for i, txt in re.findall(r'<h2 id="([\w-]+)">(.*?)</h2>', content))
    body = page_hero('Legal', tx(title), tx(updated), crumbs)
    body += f'''
        <section class="section bg-white">
            <div class="container legal-layout">
                <nav aria-label="{t('En este documento', 'In this document')}"><ul class="side-nav" role="list">{toc}</ul></nav>
                <div class="prose">
{content}
                </div>
            </div>
        </section>'''
    return render(page, key, body)


def privacy():
    return legal_page('privacy', ('Política de privacidad', 'Privacy policy'),
                      ('Qué datos personales se recopilan en antonlogic.com, para qué se usan, cómo se protegen y cómo ejercer tus derechos ARCO.',
                       'What personal data antonlogic.com collects, how it is used and protected, and how to exercise your data rights.'),
                      ('Última actualización: febrero de 2026', 'Last updated: February 2026'))


def terms():
    return legal_page('terms', ('Términos de servicio', 'Terms of service'),
                      ('Condiciones de uso del sitio y de contratación de servicios de consultoría y desarrollo de software de Anton Logic.',
                       'Terms for using the site and engaging Anton Logic technology consulting and software development services.'),
                      ('Última actualización: febrero de 2025', 'Last updated: February 2025'))


def not_found():
    page = {'path': '/404.html', 'lang_path': '/', 'robots': 'noindex, follow', 'alternates': False,
            'title': ('Página no encontrada · Anton Logic', 'Page not found · Anton Logic'),
            'desc': ('La página que buscas no existe o cambió de dirección.', 'The page you are looking for does not exist or has moved.')}
    body = f'''
        <section class="section bg-white not-found" aria-labelledby="nf-title">
            <div class="container">
                <div class="hero-copy">
                    <p class="eyebrow">Error 404</p>
                    <h1 class="h1" id="nf-title">Esta página no existe.</h1>
                    <p class="lead">Es posible que la dirección haya cambiado. Puedes volver al inicio o revisar los servicios.</p>
                    <div class="hero-actions"><a class="btn btn-primary" href="/">Ir al inicio</a><a class="btn btn-ghost" href="/services.html">Ver servicios</a></div>
                    <p class="muted" lang="en-US">This page does not exist. <a href="/en/">Go to the English site</a>.</p>
                </div>
            </div>
        </section>'''
    return render(page, '', body)


# --------------------------------------------------------------------------
# Sitemap, robots y manifest
# --------------------------------------------------------------------------

SITEMAP = [('/', '1.0', 'monthly'), ('/services.html', '0.9', 'monthly'), ('/contact.html', '0.7', 'yearly'),
           ('/faq.html', '0.6', 'monthly'), ('/privacy.html', '0.2', 'yearly'), ('/terms.html', '0.2', 'yearly')]


def sitemap():
    entries = []
    for path, priority, freq in SITEMAP:
        alts = '\n'.join(f'        <xhtml:link rel="alternate" hreflang="{h}" href="{SITE}{url_for(path, lang)}"/>'
                         for h, lang in (('es-MX', 'es'), ('en-US', 'en'), ('x-default', 'es')))
        for lang in ('es', 'en'):
            entries.append(f'''    <url>
        <loc>{SITE}{url_for(path, lang)}</loc>
        <lastmod>{TODAY.isoformat()}</lastmod>
        <changefreq>{freq}</changefreq>
        <priority>{priority}</priority>
{alts}
    </url>''')
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
            'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + '\n'.join(entries) + '\n</urlset>\n')


ROBOTS = f'User-agent: *\nAllow: /\nDisallow: /tools/\n\nSitemap: {SITE}/sitemap.xml\n'

MANIFEST = {'name': 'Anton Logic · Antonio Ortiz', 'short_name': 'Anton Logic', 'start_url': '/', 'display': 'browser',
            'background_color': '#FFFFFF', 'theme_color': '#FFFFFF',
            'icons': [{'src': '/assets/images/favicon/favicon.svg', 'sizes': 'any', 'type': 'image/svg+xml'},
                      {'src': '/assets/images/favicon/apple-touch-icon.png', 'sizes': '180x180', 'type': 'image/png'},
                      {'src': '/assets/images/favicon/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}]}


def write(rel, content):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('wrote', rel)


def main():
    global LANG
    pages = {'index.html': home, 'services.html': services_page, 'faq.html': faq_page,
             'contact.html': contact_page, 'privacy.html': privacy, 'terms.html': terms}
    for lang, prefix in (('es', ''), ('en', 'en/')):
        LANG = lang
        for name, fn in pages.items():
            write(prefix + name, fn())
    LANG = 'es'
    write('404.html', not_found())
    write('sitemap.xml', sitemap())
    write('robots.txt', ROBOTS)
    write('site.webmanifest', json.dumps(MANIFEST, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()
