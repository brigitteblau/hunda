import LandingNavbar from "@/components/landingnavbar";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Blog — hunda.",
};

const posts = [
  {
    title: "Cómo tomamos las medidas de un muñón sin lastimar al perro",
    excerpt:
      "Una guía corta con los puntos clave para medir longitud y circunferencias antes de cargar el formulario en la plataforma.",
    tag: "Guía",
    date: "12 sep 2026",
  },
  {
    title: "De la medida al STL: así arma hunda. el modelo del socket",
    excerpt:
      "Un repaso de cómo el generador calcula radios, altura y espesor de pared a partir de las medidas del perro.",
    tag: "Producto",
    date: "3 sep 2026",
  },
  {
    title: "Elegir el punto de impresión correcto",
    excerpt:
      "Qué mirar en un makerspace o imprenta 3D antes de llevar el archivo: material, tolerancias y tiempos de entrega.",
    tag: "Comunidad",
    date: "28 ago 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="w-full min-h-screen bg-[#0B0F0D]">
      <LandingNavbar />

      <section className="px-5 sm:px-8 lg:px-16 pt-40 pb-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
            Blog
          </p>
          <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.04em] font-extrabold max-w-2xl text-white">
            Notas sobre prótesis, impresión 3D y bienestar animal.
          </h1>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group flex flex-col justify-between gap-8 rounded-[1.6rem] bg-white/3 border border-white/10 p-7 min-h-65 transition hover:-translate-y-1 hover:border-[#41C086]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#41C086]">
                    {post.tag}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-white/25 transition group-hover:text-white/70"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold tracking-[-0.02em] leading-snug text-white">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/50">{post.excerpt}</p>
                </div>

                <span className="text-xs text-white/35">{post.date}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
