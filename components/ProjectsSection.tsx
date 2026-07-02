import Image from "next/image";
import { siteData } from "@/lib/siteData";

export default function ProjectsSection() {
  const { section_title, projects } = siteData.projects_teaser;

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
          Portafolio
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          {section_title}
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-navy">
              <Image
                src={project.image}
                alt={`Vista previa de ${project.name}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {project.type}
              </span>
              <h3 className="mt-3 text-xl font-bold text-navy">
                {project.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack.split(", ").map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
