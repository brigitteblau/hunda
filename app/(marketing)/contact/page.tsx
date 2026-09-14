import LandingNavbar from "@/components/landingnavbar";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contacto — hunda.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-[#0B0F0D]">
      <LandingNavbar />

      <section className="px-5 sm:px-8 lg:px-16 pt-40 pb-28">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
              Contacto
            </p>
            <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.04em] font-extrabold text-white">
              Hablemos de tu <span className="text-[#41C086]">próximo caso.</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-white/55 max-w-md">
              Escribinos si sos veterinario, dueño de una mascota o un punto de
              impresión 3D que quiere sumarse a la red de hunda.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              <a
                href="mailto:betterbm26@gmail.com"
                className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-[#41C086] transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Mail size={16} />
                </span>
                betterbm26@gmail.com
              </a>

              <a
                href="tel:+5491173667824"
                className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-[#41C086] transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Phone size={16} />
                </span>
                +54 9 11 7366 7824
              </a>

              <div className="flex items-center gap-3 text-sm font-medium text-white/70">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <MapPin size={16} />
                </span>
                Montevideo, Uruguay
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-4 rounded-4xl border border-white/10 bg-white/3 p-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Nombre
              </label>
              <input
                className="h-11 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/30"
                placeholder="Tu nombre"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Email
              </label>
              <input
                type="email"
                className="h-11 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/30"
                placeholder="tu@email.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Mensaje
              </label>
              <textarea
                className="min-h-30 resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/30"
                placeholder="Contanos en qué te podemos ayudar..."
              />
            </div>

            <button
              type="submit"
              className="mt-2 h-11 rounded-full bg-[#41C086] text-sm font-semibold text-[#0B0F0D] transition hover:bg-white"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
