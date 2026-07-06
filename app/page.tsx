"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { FiHeart, FiTarget, FiDollarSign, FiSliders, FiCrosshair } from "react-icons/fi";
import { FaRulerCombined, FaCube, FaPrint } from "react-icons/fa";

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
    icon: FaRulerCombined,
  },
  {
    num: "02",
    title: "Diseñá",
    desc: "Generamos una prótesis personalizada según sus necesidades.",
    icon: FaCube,
  },
  {
    num: "03",
    title: "Fabricá",
    desc: "Exportá el modelo listo para impresión 3D.",
    icon: FaPrint,
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
    icon: FiSliders,
  },
  {
    title: "Precisa",
    sub: "Utilizamos modelos digitales preparados para impresión 3D.",
    icon: FiCrosshair,
  },
  {
    title: "Accesible",
    sub: "Buscamos reducir costos para llegar a más mascotas.",
    icon: FiDollarSign,
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
            Tecnología para{" "}
            devolver <span className="text-[#41C086]">movimiento.</span>
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
              { label: "Personalizadas", icon: FiHeart },
              { label: "Precisas", icon: FiTarget },
              { label: "Accesibles", icon: FiDollarSign },
            ].map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2.5 text-sm text-black/60"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F8F58]/15 text-[#4F8F58] text-base">
                  <item.icon size={16} />
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
            className="max-w-2xl mx-auto mb-12 text-center"
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
                <div className="flex justify-center mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-[#171717] flex items-center justify-center transition group-hover:scale-105">
                    <step.icon size={24} className="text-white" />
                  </div>
                </div>

                <div>
                  <span className="text-sm text-[#41C086] font-medium">
                    {step.num}
                  </span>
                  <h3 className="text-3xl tracking-[-0.04em] font-medium mt-2 mb-3">
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
            <div className="rounded-[1.5rem] bg-[#E8E4DC] aspect-[16/11] flex items-center justify-center p-5 sm:p-7">
              <p className="text-sm text-black/40 text-center">
                Foto del inventario (cuando lo termine)
              </p>
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
            className="max-w-3xl mb-12"
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
                <div className="h-12 w-12 rounded-2xl bg-[#171717] flex items-center justify-center mb-10">
                  <card.icon size={20} className="text-white" />
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
        </motion.div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/40 mb-4">
              Sobre nosotros
            </p>

            <h2 className="text-[clamp(2.2rem,5vw,4.8rem)] leading-none tracking-[-0.06em] font-medium mb-7">
              Somos Benja, <span className="text-[#41C086]">Brigitte y Mayte</span>
            </h2>

            <p className="text-base leading-8 text-black/60 mb-5">
              Estudiantes de ORT TIC apasionados por la tecnología, el
              diseño y el bienestar animal.
            </p>

            <p className="text-base leading-8 text-black/60 mb-9">
              Nuestro objetivo es hacer más accesibles las prótesis
              personalizadas para mejorar la calidad de vida de los perros.
            </p>

            <button className="w-full sm:w-auto border border-[#41C086]/40 rounded-full px-7 py-3.5 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white">
              Conocé más sobre nosotros
            </button>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-[2rem] bg-[#171717] text-white px-6 sm:px-10 py-9 sm:py-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex h-14 w-14 shrink-0 rounded-2xl bg-white items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                  <path
                    d="M4 5 L9 19 L12 10 L15 19 L20 5"
                    stroke="#171717"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-[clamp(2rem,4vw,4rem)] leading-none tracking-[-0.06em] font-medium">
                  ¿Listo para <span className="text-[#41C086]">comenzar?</span>
                </h3>

                <p className="mt-4 max-w-xl text-sm sm:text-base leading-7 text-white/60">
                  Creá tu cuenta gratis y empezá a diseñar la prótesis que tu
                  perro necesita.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <button className="w-full sm:w-auto bg-white text-black rounded-full px-8 py-3.5 text-sm font-medium transition hover:bg-[#41C086]">
                Crear cuenta
              </button>

              <span className="text-sm text-white/60 text-center sm:text-left">
                ¿Ya tenés cuenta?{" "}
                <button className="text-[#41C086] underline underline-offset-4 hover:text-white transition">
                  Iniciá sesión
                </button>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
