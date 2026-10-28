"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LandingNavbar from "@/components/landingnavbar";
import AnimatedLetters from "@/components/animated-letters";
import BackToTop from "@/components/back-to-top";
import { useAuthModal } from "@/app/login/auth-modal-provider";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

// Props reutilizables: el elemento aparece con fade + subida al entrar en pantalla
const inView = {
  variants: fadeUp,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7 },
};

const features = [
  "Crear nuevas prótesis",
  "Gestionar diseños",
  "Historial y versiones",
  "Exportar modelos 3D",
];

export default function LandingPage() {
  const { openAuth } = useAuthModal();

  return (
    <main className="relative min-h-screen overflow-x-hidden  font-sans text-white selection:bg-[#41C086] selection:text-[#07100B]">
      {/* NAV (el de siempre: links, sesión, menú mobile) */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <LandingNavbar />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section id="inicio" className="relative h-171 overflow-hidden">
        {/* Foto con movimiento lento (kenburns) */}
        <img
          src="/landing/hero.jpg"
          alt="Perro con prótesis Hunda"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="relative z-10 mx-auto h-full max-w-360">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="absolute left-23.5 top-41.5"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-[15px] font-medium uppercase tracking-[0.34em] text-white/95"
            >
              Que ninguna huella se detenga
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="mt-1.5 font-display text-[55.5px] font-semibold leading-16 tracking-[-0.045em]"
            >
              Por una vida
              <br />
              animal <span className="text-leaf">sin límites.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-3.5 text-[19.5px] leading-6 text-white"
            >
              Diseñá prótesis personalizadas a través
              <br />
              de nuestra plataforma digital y fabricación 3D.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute left-22 top-120.5 flex gap-5.75"
          >
            <button
                type="button"
                onClick={() => openAuth("signup")}
                className="flex h-15 w-70.75 items-center justify-center rounded-full bg-mint text-[16px] font-medium text-[#0d2a20] transition-all duration-300 hover:bg-white"
              >
              Crear mi prótesis
            </button>
            <a
              href="#plataforma"
              className="flex h-15 w-60.75 items-center justify-center rounded-full border border-white/10 bg-[#3d4a2b]/55 text-[16px] text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-[#3d4a2b]/80 hover:text-white"
            >
              Ver demo
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute left-24.25 top-144 flex items-center gap-10 text-[15.5px] text-white"
          >
            <li className="flex items-center gap-2.5">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill="#1fbf7c" opacity=".35" />
                <path
                  d="M12 18s-5.5-3.4-5.5-7.1A3 3 0 0 1 12 9.2a3 3 0 0 1 5.5 1.7C17.5 14.6 12 18 12 18z"
                  fill="#22d88f"
                />
                <circle cx="9.5" cy="11.5" r=".9" fill="#0d2a20" />
                <circle cx="14.5" cy="11.5" r=".9" fill="#0d2a20" />
              </svg>
              Personalizadas
            </li>
            <li className="flex items-center gap-2.5">
              <svg
                className="h-6.5 w-6.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22d88f"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" fill="#22d88f" opacity=".4" />
                <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
              </svg>
              Precisas
            </li>
            <li className="flex items-center gap-2.5">
              <svg
                className="h-6.5 w-6.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22d88f"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14.8 9.2c-.4-1-1.5-1.7-2.8-1.7-1.6 0-2.8.9-2.8 2.2 0 3 5.6 1.5 5.6 4.5 0 1.3-1.2 2.3-2.8 2.3-1.4 0-2.5-.7-2.9-1.8M12 6v1.5M12 16.5V18" />
              </svg>
              Accesibles
            </li>
          </motion.ul>
        </div>
      </section>

      {/* =========================================================
          NUESTRA MISIÓN
      ========================================================= */}
      <section className="relative h-127.5 bg-[linear-gradient(90deg,#2d4741_0%,#334845_55%,#374647_100%)]">
        <div className="dots absolute inset-0" />
        <div className="relative mx-auto h-full max-w-360">
          <motion.img
            src="/landing/mision-art.png"
            alt=""
            {...inView}
            className="absolute left-0 top-7.5 w-190 select-none mask-[linear-gradient(to_left,transparent,black_3%),linear-gradient(to_bottom,transparent,black_4%,black_96%,transparent)] mask-intersect"
          />

          <motion.div {...inView} className="absolute left-199.25 top-27">
            <p className="text-[14px] font-medium uppercase text-white/95">
              Nuestra misión
            </p>
            <h2 className="mt-2.5 font-display text-[40px] font-semibold leading-12.75 tracking-[0.01em]">
              Tecnología
              <br />
              al servicio de <span className="text-leaf">su bienestar.</span>
            </h2>
            <p className="mt-1 text-[19.6px] leading-6 text-white">
              Creemos en un futuro donde todos los animales
              <br />
              tengan &nbsp;la oportunidad de moverse, explorar y
              <br />
              disfrutar sin limitaciones.
            </p>
            <a
              href="#nosotros"
              className="mt-8.75 -ml-1.5 flex h-15 w-78.75 items-center justify-center rounded-full bg-mint text-[14.5px] font-semibold text-[#0d2a20] shadow-[0_8px_26px_rgba(0,227,154,0.3)] transition-all duration-300 hover:bg-white"
            >
              Conocé más sobre hunda
            </a>
          </motion.div>

          <motion.img
            src="/landing/vidas.png"
            alt=""
            {...inView}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="absolute left-308.25 top-88.75 w-46 select-none mask-[linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent),linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)] mask-intersect"
          />
        </div>
      </section>

      {/* =========================================================
          LA PLATAFORMA
      ========================================================= */}
      <section
        id="plataforma"
        className="relative h-165 scroll-mt-20 border-t border-white/10 bg-[linear-gradient(180deg,#545b5d_0%,#625c67_45%,#5f5a64_75%,#57555d_100%)]"
      >
        <div className="dots absolute inset-0 opacity-70" />
        <div className="relative mx-auto h-full max-w-360">
          <motion.div {...inView} className="absolute left-23 top-16">
            <p className="ml-0.75 text-[14px] font-medium uppercase text-white/95">
              La plataforma
            </p>
            <h2 className="mt-1.5 font-display text-[39px] font-bold leading-11 tracking-[-0.06em]">
              Controlá todo
              <br />
              desde un <span className="text-leaf">único lugar.</span>
            </h2>
            <p className="mt-4.5 ml-0.5 text-[17.6px] leading-5.5">
              Diseñá, guardá y hacé seguimiento
              <br />
              de todas tus prótesis en tu dashboard
              <br />
              personal.
            </p>
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-11 ml-2 space-y-3.5 text-[17px]"
            >
              {features.map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUp}
                  className="flex h-6 items-center gap-2.5"
                >
                  <svg
                    className="h-5.5 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22d88f"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12h17M14 6l6 6-6 6" />
                  </svg>
                  {f}
                </motion.li>
              ))}
            </motion.ul>
            <button
                type="button"
                onClick={() => openAuth("login")}
                className="mt-10 -ml-1.5 flex h-15 w-70.75 items-center justify-center rounded-full bg-mint text-[15px] font-medium text-[#0d2a20] shadow-[0_8px_26px_rgba(0,227,154,0.35)] transition-all duration-300 hover:bg-white"
              >
              Ir a la plataforma
            </button>
          </motion.div>

          {/* Mockup del dashboard */}
          <motion.div
            {...inView}
            className="absolute left-129.75 top-15.5 h-136.75 w-206.5 overflow-hidden rounded-[10px] border border-white/35 bg-[linear-gradient(180deg,#5e4a5e_0%,#5a5260_45%,#4c5a57_78%,#3e5a50_100%)] shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          >
            <div className="dots absolute inset-0 opacity-50" />
            <div className="relative h-full font-display">
              <h3 className="absolute left-6.25 top-5.5 text-[20px] font-medium">
                Mis perros
              </h3>
              <p className="absolute left-6 top-13.75 text-[11px] font-medium text-white/90">
                Administrá a tus compañeros y sus prótesis
              </p>
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="absolute left-155.25 top-13.25 flex h-9 w-43.5 items-center justify-center rounded-xs bg-[#00f5a0] text-[11px] font-semibold text-[#0d2a20] shadow-[0_4px_14px_rgba(0,245,160,0.3)] transition-all duration-300 hover:bg-white"
              >
                + Agregar perro
              </button>

              {/* Milo */}
              <div className="absolute left-6.25 top-26.75 h-41.75 w-192.5 rounded-md bg-white/9">
                <img
                  src="/landing/milo.jpg"
                  alt="Milo"
                  className="absolute left-3 top-3.75 h-34.25 w-34 rounded-[5px] object-cover"
                />
                <p className="absolute left-43.25 top-5.75 text-[16px] font-medium">
                  Milo
                </p>
                <p className="absolute left-43 top-13.25 text-[11.5px] text-white/45">
                  Golden Retriever • 6 años
                </p>
                <div className="absolute left-43 top-20.25 h-px w-79.5 bg-white/60" />
                <span className="absolute left-43.5 top-24.5 h-7.5 w-7.5 rounded-full bg-[#d9d9d9]" />
                <p className="absolute left-53.75 top-25.25 text-[11px] font-semibold">
                  Prótesis delantera izquierda
                </p>
                <p className="absolute left-53.75 top-29.75 text-[11px] text-white/50">
                  Tipo: Adaptativa
                </p>
                <span className="absolute left-99.25 top-26 flex h-6.5 w-19.5 items-center justify-center rounded-[3px] border border-white/10 bg-[#2a1f1d] text-[9px] font-semibold text-[#f5b52a]">
                  En proceso
                </span>
                <button
                type="button"
                onClick={() => openAuth("login")}
                className="absolute left-166 top-18.5 flex items-center gap-5.5 text-[10.5px] font-semibold text-leaf"
              >
                  Ver perfil
                  <svg
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Luna */}
              <div className="absolute left-6.25 top-73.25 h-41.75 w-192.5 rounded-md bg-white/9">
                <img
                  src="/landing/luna.jpg"
                  alt="Luna"
                  className="absolute left-3 top-3.75 h-34.25 w-34 rounded-[5px] object-cover"
                />
                <p className="absolute left-43.25 top-5.75 text-[16px] font-medium">
                  Luna
                </p>
                <p className="absolute left-43 top-13.25 text-[11.5px] text-white/45">
                  West Highland White Terrier • &nbsp;4 años
                </p>
                <div className="absolute left-43 top-20.25 h-px w-79.5 bg-white/60" />
                <span className="absolute left-43.5 top-24.5 h-7.5 w-7.5 rounded-full bg-[#d9d9d9]" />
                <p className="absolute left-53.75 top-25.25 text-[11px] font-semibold">
                  Sin prótesis activa
                </p>
                <p className="absolute left-53.75 top-29.75 text-[11px] text-white/50">
                  Todo en orden
                </p>
                <button
                type="button"
                onClick={() => openAuth("login")}
                className="absolute left-166 top-18.5 flex items-center gap-5.5 text-[10.5px] font-semibold text-leaf"
              >
                  Ver perfil
                  <svg
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <p className="absolute inset-x-0 top-128.25 flex items-center justify-center gap-2 text-[11px] text-white/55">
                <svg
                  className="h-3.75 w-3.75"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17.5h.01"
                    strokeLinecap="round"
                  />
                </svg>
                ¿Tenés dudas sobre las prótesis de tu perro?
                <Link href="/contact" className="ml-3.5 font-semibold text-leaf">
                  Contactanos
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          HISTORIAS REALES
      ========================================================= */}
      <section className="relative h-122.5 border-t border-white/10 bg-[radial-gradient(ellipse_at_75%_15%,#4a3a4d_0%,transparent_55%),linear-gradient(160deg,#3b3a44_0%,#3a3844_40%,#393341_70%,#2f3b3b_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(20deg,rgba(55,80,75,0.55)_0%,transparent_45%)]" />
        <div className="dots absolute inset-0 opacity-80" />
        <div className="relative mx-auto h-full max-w-360">
          <motion.div {...inView} className="absolute left-25.25 top-30.5">
            <p className="text-[15px] font-medium uppercase tracking-[0.14em] text-white/95">
              Historias reales
            </p>
            <h2 className="mt-2 font-display text-[40.5px] font-semibold leading-11.5 tracking-tighter">
              Ellos ya están
              <br />
              viviendo <span className="text-leaf">sin límites.</span>
            </h2>
            <p className="mt-4.5 text-[17.5px] leading-5.75 tracking-[0.03em] text-white/95">
              Cada prótesis es una nueva oportunidad
              <br />
              para seguir explorando el mundo..
            </p>
            <Link
              href="/blog"
              className="mt-10 flex h-15 w-56.75 items-center justify-center rounded-full border border-leaf text-[16px] font-medium text-leaf transition-all duration-300 hover:bg-leaf hover:text-[#0d2a20]"
            >
              Ver más historias
            </Link>
          </motion.div>

          <motion.img
            src="/landing/historia-milo.jpg"
            alt="Milo en la playa"
            {...inView}
            className="absolute left-136.5 top-25.5 h-81.25 w-60.25 select-none rounded-[14px]"
          />
          <motion.img
            src="/landing/historia-luna.jpg"
            alt="Luna caminando"
            {...inView}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="absolute left-200.75 top-25.5 h-81.25 w-66.75 select-none rounded-[14px]"
          />
          <motion.img
            src="/landing/historia-rocky.jpg"
            alt="Rocky en el parque"
            {...inView}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="absolute left-271.5 top-25.5 h-81.25 w-66.5 select-none rounded-[14px]"
          />

          <button
            type="button"
            className="absolute left-123.5 top-58.75 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white/85 transition hover:bg-white/25 hover:text-white"
            aria-label="Anterior"
          >
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="absolute left-340.5 top-58.75 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white/85 transition hover:bg-white/25 hover:text-white"
            aria-label="Siguiente"
          >
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute left-228.25 top-110.25 flex items-center gap-0.75">
            <span className="h-3 w-5.75 rounded-full bg-mint" />
            <span className="h-3 w-3 rounded-full bg-mint" />
            <span className="h-3 w-3 rounded-full bg-mint" />
          </div>
        </div>
      </section>

      {/* =========================================================
          SOBRE NOSOTROS + CTA
      ========================================================= */}
      <section className="relative bg-[#2c443f]">
        <div className="dots absolute inset-0" />

        <div
          id="nosotros"
          className="relative h-126.25 scroll-mt-20 border-t border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0.02)_100%)]"
        >
          <div className="relative mx-auto h-full max-w-360">
            <motion.img
              src="/landing/equipo.png"
              alt="Benja, Brigitte y Maite con un perro con prótesis"
              {...inView}
              className="absolute left-192.5 top-2.75 w-130 select-none mask-[linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent),linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-16px),transparent)] mask-intersect"
            />

            <motion.div {...inView} className="absolute left-20 top-18.5">
              <p className="text-[16px] font-medium uppercase text-white/95">
                Sobre nosotros
              </p>
              <h2 className="mt-2 font-display text-[39.5px] font-bold leading-12 tracking-[-0.065em]">
                Somos <span className="text-leaf">Benja, Brigitte y Maite</span>
              </h2>
              <p className="mt-4.5 text-[17.8px] leading-5.5">
                Estudiantes de ORT TIC apasionados por la
                <br />
                tecnología, el diseño y el bienestar animal.
              </p>
              <p className="mt-6.25 text-[17.8px] leading-5.5">
                Nuestro objetivo es hacer más accesibles las
                <br />
                prótesis personalizadas para mejorar la calidad
                <br />
                de vida de los perros.
              </p>
              <div className="mt-12.5 ml-2.5 flex gap-5.5">
                <Link
                  href="/trabaja-con-nosotros"
                  className="flex h-15 w-70.75 items-center justify-center rounded-full bg-mint text-[16px] font-medium text-[#0d2a20] shadow-[0_10px_26px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white"
                >
                  Unite al equipo
                </Link>
                <Link
                  href="/sobre-nosotros"
                  className="flex h-15 w-66.25 items-center justify-center rounded-full border border-leaf text-[15.5px] font-medium text-leaf transition-all duration-300 hover:bg-leaf hover:text-[#0d2a20]"
                >
                  ¡Conocé más sobre nosotros!
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative h-110">
          <div className="relative mx-auto h-full max-w-360">
            <motion.div
              {...inView}
              className="absolute left-5.25 right-4.25 top-28.75 flex h-60 items-center justify-center gap-10 rounded-lg bg-white/8.5 px-8 lg:gap-24"
            >
              <div>
                <AnimatedLetters
                  className="font-display text-[55px] font-bold leading-15.5 tracking-[-0.06em]"
                  segments={[
                    { text: "¿Listo para" },
                    { text: "comenzar?", className: "text-leaf" },
                  ]}
                />
                <p className="mt-3 text-[20.3px] leading-6">
                  Creá tu cuenta gratis y empezá a diseñar
                  <br />
                  la prótesis que tu perro necesita.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-5">
              <button
                type="button"
                onClick={() => openAuth("signup")}
                className="flex h-13.75 w-66.5 items-center justify-center rounded-full bg-mint text-[16px] font-medium text-[#0d2a20] transition-all duration-300 hover:bg-white"
              >
                Crear cuenta
              </button>
              <p className="text-[15px] text-white/90">
                ¿Ya tenés cuenta?{" "}
                <button
                type="button"
                onClick={() => openAuth("login")}
                className="text-leaf underline underline-offset-2"
              >
                  Iniciá sesión
                </button>
              </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
