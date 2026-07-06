"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const steps = [
  {
    num: "01",
    title: "Medí",
    desc: "Ingresá las medidas y características de tu perro desde un formulario simple.",
  },
  {
    num: "02",
    title: "Diseñá",
    desc: "Generamos una prótesis personalizada según sus necesidades.",
  },
  {
    num: "03",
    title: "Fabricá",
    desc: "Exportá el modelo listo para impresión 3D.",
  },
];

const features = [
  "Crear nuevas prótesis",
  "Gestionar diseños",
  "Guardar historial",
  "Exportar modelos 3D",
];

const printingCards = [
  {
    title: "Personalizada",
    sub: "Cada prótesis se adapta a la anatomía y necesidad del perro.",
  },
  {
    title: "Precisa",
    sub: "Utilizamos modelos digitales preparados para impresión 3D.",
  },
  {
    title: "Accesible",
    sub: "Buscamos reducir costos para llegar a más mascotas.",
  },
];

export default function LandingPage() {
  return (
    <main className="w-full min-h-screen bg-[#F7F6F1] text-[#171717] font-sans overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-60px)] px-5 sm:px-8 lg:px-16 py-20 flex items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto lg:mx-0 w-full"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1] tracking-[-0.05em] font-medium max-w-3xl"
          >
            Tecnología para devolver{" "}
            <span className="text-[#41C086]">movimiento.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base sm:text-lg leading-8 text-black/60"
          >
            Diseñá prótesis personalizadas a través de nuestra plataforma
            digital y fabricación 3D.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <button className="group w-full sm:w-auto bg-[#4F8F58] text-white rounded-full px-7 py-3.5 text-sm font-medium transition hover:bg-[#41C086]">
              Crear mi prótesis
              <span className="ml-2 inline-block transition group-hover:translate-x-1">
                →
              </span>
            </button>

            <button className="w-full sm:w-auto border border-black/15 rounded-full px-7 py-3.5 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white">
              Ver demo
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            {[
              { label: "Personalizadas", icon: "♥" },
              { label: "Precisas", icon: "◎" },
              { label: "Accesibles", icon: "$" },
            ].map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2.5 text-sm text-black/60"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F8F58]/15 text-[#4F8F58] text-base">
                  {item.icon}
                </span>
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* PROCESO */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/40 mb-4">
              Cómo funciona
            </p>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-[-0.05em] font-medium">
              Un proceso simple en 3 pasos.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {steps.map((step) => (
              <motion.article
                key={step.num}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group rounded-[1.8rem] bg-[#F7F6F1] border border-black/5 p-6 sm:p-7 min-h-[220px] sm:min-h-[280px] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/35">{step.num}</span>
                  <div className="h-11 w-11 rounded-2xl bg-white border border-black/5 flex items-center justify-center transition group-hover:scale-105">
                    <span className="text-lg">✦</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl tracking-[-0.04em] font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-black/55">
                    {step.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PLATAFORMA */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 bg-[#F7F6F1]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/40 mb-4">
              La plataforma
            </p>

            <h2 className="text-[clamp(2.1rem,5vw,4.8rem)] leading-none tracking-[-0.06em] font-medium max-w-xl">
              Controlá todo desde un único lugar.
            </h2>

            <p className="mt-7 text-base sm:text-lg leading-8 text-black/60 max-w-lg">
              Diseñá, guardá y hacé seguimiento de todas las prótesis desde tu
              dashboard personal.
            </p>

            <div className="mt-9 space-y-4">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#41C086]" />
                  <span className="text-sm sm:text-base text-black/70">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-10 group w-full sm:w-auto bg-[#171717] text-white rounded-full px-7 py-3.5 text-sm font-medium transition hover:bg-[#41C086]">
              Ir a la plataforma
              <span className="ml-2 inline-block transition group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-white border border-black/5 shadow-sm p-4 sm:p-5"
          >
            <div className="rounded-[1.5rem] bg-[#E8E4DC] aspect-[16/11] p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-3 w-3 rounded-full bg-black/20" />
                <span className="h-3 w-3 rounded-full bg-black/20" />
                <span className="h-3 w-3 rounded-full bg-black/20" />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="h-20 rounded-2xl bg-white/70" />
                <div className="h-20 rounded-2xl bg-white/70" />
                <div className="h-20 rounded-2xl bg-white/70" />
              </div>

              <div className="space-y-3">
                <div className="h-12 rounded-2xl bg-white/70" />
                <div className="h-12 rounded-2xl bg-white/50" />
                <div className="h-12 rounded-2xl bg-white/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPRESIÓN 3D */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/40 mb-4">
              Fabricación 3D
            </p>

            <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-[-0.06em] font-medium">
              Impresión 3D al servicio del bienestar.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {printingCards.map((card) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="rounded-[1.8rem] bg-[#F7F6F1] border border-black/5 p-6 sm:p-7 min-h-[200px] sm:min-h-[230px]"
              >
                <div className="h-12 w-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center mb-10">
                  <span>◎</span>
                </div>

                <h3 className="text-2xl tracking-[-0.04em] font-medium mb-3">
                  {card.title}
                </h3>

                <p className="text-sm leading-6 text-black/55">{card.sub}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#F7F6F1]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-black/40 mb-4">
            Nos acompañan
          </p>

          <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] leading-tight tracking-[-0.05em] font-medium max-w-3xl mx-auto mb-10">
            Gracias a quienes confían en nuestro proyecto.
          </h2>

          <div className="rounded-[2rem] bg-white border border-black/5 px-8 py-10 shadow-sm">
            <img
              src="/images/logo ort.png"
              alt="Logo ORT"
              className="w-full max-w-2xl mx-auto h-auto opacity-80"
            />
          </div>
        </motion.div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-black/40 mb-4">
                Sobre nosotros
              </p>

              <h2 className="text-[clamp(2.2rem,5vw,4.8rem)] leading-none tracking-[-0.06em] font-medium mb-7">
                Somos estudiantes creando soluciones reales.
              </h2>

              <p className="text-base leading-8 text-black/60 mb-5">
                Somos estudiantes de ORT TIC apasionados por la tecnología, el
                diseño y el bienestar animal.
              </p>

              <p className="text-base leading-8 text-black/60 mb-9">
                Nuestro objetivo es hacer más accesibles las prótesis
                personalizadas para mejorar la calidad de vida de las mascotas.
              </p>

              <button className="w-full sm:w-auto border border-black/15 rounded-full px-7 py-3.5 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white">
                Conocé más →
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] bg-[#E8E4DC] aspect-[16/10] flex items-center justify-center"
            >
              <p className="text-black/35 text-sm uppercase tracking-[0.2em]">
                Foto del equipo
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-[2rem] bg-[#171717] text-white px-6 sm:px-10 py-9 sm:py-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between"
          >
            <div>
              <h3 className="text-[clamp(2rem,4vw,4rem)] leading-none tracking-[-0.06em] font-medium">
                ¿Listo para comenzar?
              </h3>

              <p className="mt-4 max-w-xl text-sm sm:text-base leading-7 text-white/60">
                Creá tu cuenta gratis y empezá a diseñar la prótesis que tu
                perro necesita.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <button className="w-full sm:w-auto bg-white text-black rounded-full px-8 py-3.5 text-sm font-medium transition hover:bg-[#DCE8D6]">
                Registrate →
              </button>

              <button className="text-sm text-white/60 underline underline-offset-4 hover:text-white transition text-center sm:text-left">
                Ya tengo cuenta
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}