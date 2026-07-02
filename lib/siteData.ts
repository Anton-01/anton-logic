export const siteData = {
  meta_data: {
    title:
      "Anton Logic | Desarrollo de Software a Medida y Modernización de Sistemas",
    description:
      "Expertos en desarrollo de software Cloud, modernización de sistemas legacy y diseño web de alto rendimiento. Soluciones digitales para empresas.",
  },
  navigation: [
    { label: "Inicio", href: "#home" },
    { label: "Servicios", href: "#services" },
    { label: "Proyectos", href: "#projects" },
    { label: "Nosotros", href: "#about" },
    { label: "Contacto", href: "#contact" },
  ],
  hero_section: {
    headline: "Transformamos ideas en soluciones digitales",
    subheadline:
      "Desarrollo de software a medida y arquitecturas escalables para empresas que buscan crecer sin cuellos de botella técnicos.",
    primary_cta: "Iniciar Proyecto",
  },
  services_section: {
    section_title: "Nuestros Servicios",
    section_subtitle:
      "Soluciones digitales completas diseñadas para optimizar tu operación y escalar tu negocio.",
    items: [
      {
        id: "custom-software",
        name: "Software a Medida",
        description:
          "Aplicaciones 100% personalizadas con infraestructura Cloud para automatizar y escalar tu operación.",
        icon_hint: "cloud-code",
      },
      {
        id: "legacy-systems",
        name: "Sistemas Legacy",
        description:
          "Modernizamos sistemas heredados sin perder datos ni interrumpir tus procesos operativos.",
        icon_hint: "database-refresh",
      },
      {
        id: "web-development",
        name: "Desarrollo Web SEO",
        description:
          "Sitios web rápidos, modernos y optimizados estructuralmente para conversión y motores de búsqueda.",
        icon_hint: "layout-fluid",
      },
      {
        id: "api-backend",
        name: "APIs & Backend",
        description:
          "Arquitecturas robustas, APIs RESTful y microservicios con 99.9% de disponibilidad.",
        icon_hint: "server-network",
      },
    ],
  },
  about_section: {
    section_title: "¿Por qué elegir Anton Logic?",
    points: [
      {
        title: "Calidad Premium",
        description: "Código limpio y mejores prácticas de arquitectura.",
      },
      {
        title: "Entrega Rápida",
        description: "Metodologías ágiles enfocadas en resultados.",
      },
      {
        title: "Soporte Continuo",
        description: "Acompañamiento post-lanzamiento técnico.",
      },
    ],
  },
  projects_teaser: {
    section_title: "Proyectos Destacados",
    projects: [
      {
        name: "MaosaPrime",
        type: "SaaS Energía",
        tech_stack: "Laravel, Docker, Redis",
        image: "/projects/maosa-preview.png",
      },
      {
        name: "WorkHub Interface",
        type: "SaaS Panel Empresarial",
        tech_stack: "Astro, GraphQL, PostgreSQL",
        image: "/projects/workhub-preview.jpeg",
      },
    ],
  },
  contact_section: {
    section_title: "¿Listo para comenzar tu proyecto?",
    contact_info: {
      phone: "+52 443 528 8990",
      location: "Morelia, Michoacán, MX",
    },
    form_fields: [
      "Nombre",
      "Email",
      "Servicio de interés",
      "Presupuesto estimado",
      "Cuéntanos sobre tu proyecto",
    ],
  },
} as const;

export type Service = (typeof siteData.services_section.items)[number];
export type Project = (typeof siteData.projects_teaser.projects)[number];
