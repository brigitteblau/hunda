"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import {  FiDollarSign} from "react-icons/fi";
import { FaRuler, FaHeart } from "react-icons/fa";
import { ImTarget } from "react-icons/im";
import { IoCubeOutline } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";



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
    icon: FaRuler,
  },
  {
    num: "02",
    title: "Diseñá",
    desc: "Generamos una prótesis personalizada según sus necesidades.",
    icon: IoCubeOutline,
  },
  {
    num: "03",
    title: "Fabricá",
    desc: "Exportá el modelo listo para impresión 3D.",
    icon: MdLocalPrintshop,
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
    icon: IoSettingsOutline,
  },
  {
    title: "Precisa",
    sub: "Utilizamos modelos digitales preparados para impresión 3D.",
    icon: ImTarget,
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
<section className="relative min-h-[calc(100vh-60px)] flex items-center px-6 lg:px-16">
  <motion.div
    variants={stagger}
    initial="hidden"
    animate="visible"
    className="max-w-[760px] w-full flex flex-col gap-12"
  >
    {/* Título */}
    <motion.h1
      variants={fadeUp}
      className="text-[clamp(2.7rem,4.5vw,4.6rem)] leading-[1.02] tracking-[-0.05em] font-medium max-w-[760px]"
    >
      Tecnología para
      <br />
      devolver <span className="text-[#41C086]">movimiento.</span>
    </motion.h1>

    {/* Descripción */}
    <motion.p
      variants={fadeUp}
      className="max-w-[440px] text-[18px] leading-7 text-black/60"
    >
      Diseñá prótesis personalizadas a través de nuestra plataforma
      digital y fabricación 3D.
    </motion.p>

    {/* Botones */}
    <motion.div
      variants={fadeUp}
      className="flex flex-col sm:flex-row gap-4"
    >
      <button className="group w-full sm:w-auto bg-[#4F8F58] text-white rounded-full px-8 py-3 text-sm font-medium transition hover:bg-[#41C086]">
        Crear mi prótesis
        <span className="ml-2 inline-block transition group-hover:translate-x-1">
          →
        </span>
      </button>

      <button className="w-full sm:w-auto border border-black/15 rounded-full px-8 py-3 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white">
        Ver demo
      </button>
    </motion.div>

    {/* Beneficios */}
    <motion.div
      variants={fadeUp}
      className="flex flex-wrap items-center gap-x-8 gap-y-4"
    >
      {[
        { label: "Personalizadas", icon: FaHeart },
        { label: "Precisas", icon: ImTarget },
        { label: "Accesibles", icon: FiDollarSign },
      ].map((item) => (
        <span
          key={item.label}
          className="flex items-center gap-2 text-[15px] text-black/60"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F8F58]/15 text-[#4F8F58]">
            <item.icon size={15} />
          </span>

          {item.label}
        </span>
      ))}
    </motion.div>
  </motion.div>
</section>
      {/* COMO FUNCIONA */}
      <section className="px-5 sm:px-8 lg:px-16 py-28 sm:py-36 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pb-16"
>
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4">
            Cómo funciona
          </p>

          <h2 className="text-[clamp(2.1rem,3.6vw,3.2rem)] leading-tight tracking-[-0.04em] font-medium whitespace-nowrap">
            Un proceso simple en 3 pasos.
          </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {steps.map((step) => (
              <motion.article
                key={step.num}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group rounded-[1.6rem] bg-[#F7F6F1] border border-black/5 px-9 pt-10 pb-11 min-h-[300px] flex flex-col items-center text-center justify-between transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="w-full flex justify-center"></div>
                  <div className="w-16 h-16 rounded-[18px] bg-[#171717] flex items-center justify-center shadow-md mb-9 mx-auto">
                  <step.icon size={26} className="text-white" />
                  </div>
                  

                <span className="self-start text-[18px] leading-none font-semibold text-[#41C086]">
                  {step.num}
                </span>

                <h3 className="mt-5 text-[28px] leading-none tracking-[-0.02em] font-medium">
                  {step.title}
                </h3>

                <p className="mt-5 text-[16px] leading-6 text-black/60 max-w-[260px]">
                  {step.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PLATAFORMA */}
      <section className="px-5 sm:px-8 lg:px-16 py-28 sm:py-36 bg-[#F7F6F1]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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

            <h2 className="text-[clamp(2.1rem,5vw,4.8rem)] leading-none tracking-[-0.06em] font-medium pb-[40px]">
              <span className="whitespace-nowrap">Controlá todo desde</span>
              <br />
              <span className="whitespace-nowrap">un único lugar.</span>
            </h2>
            <div className="pt-[8px]">
              <p className="text-base sm:text-lg leading-8 text-black/60 max-w-lg pb-[48px]">
                Diseñá, guardá y hacé seguimiento de todas las prótesis desde tu
                dashboard personal.
              </p>
            </div>

            <div className="pt-[8px] pb-[64px]">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3 pb-[18px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#41C086]" />
                  <span className="text-sm sm:text-base text-black/70">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-[8px]">
              <button className="group w-full sm:w-auto bg-[#171717] text-white rounded-full px-7 py-3.5 text-sm font-medium transition hover:bg-[#41C086]">
                Ir a la plataforma
                <span className="ml-2 inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
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
                Foto del inventario
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
            className="text-center mb-16 pb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4">
              Fabricación 3D
            </p>

            <h2 className="text-[clamp(2.1rem,3.6vw,3.2rem)] leading-tight tracking-[-0.04em] font-medium whitespace-nowrap">
              Impresión 3D al servicio del bienestar.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {printingCards.map((card) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group rounded-[1.6rem] bg-[#F7F6F1] border border-black/5 px-9 pt-10 pb-11 min-h-[300px] flex flex-col items-center text-center justify-between transition hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="w-full flex justify-center">
                  <div className="h-12 w-12 rounded-2xl bg-[#171717] flex items-center justify-center">
                    <card.icon size={20} className="text-white" />
                  </div>
                </div>

                <h3 className="text-2xl tracking-[-0.04em] font-medium mb-6">
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
          className="text-center mb-16 pb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4">
            Nos acompañan
          </p>

          <h2 className="text-[clamp(2.1rem,3.6vw,3.2rem)] leading-tight tracking-[-0.04em] font-medium whitespace-nowrap">
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
            className="text-left mb-16 pb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4">
              Sobre nosotros
            </p>

            <h2 className="text-[clamp(2.1rem,3.6vw,3.2rem)] leading-tight tracking-[-0.04em] font-medium whitespace-nowrap pb-[40px]">
              Somos<span className="text-[#41C086]"> Benja, Brigitte y Maite</span>
            </h2>

            <div className="pt-[8px]">
            <p className="text-base leading-8 text-black/60 mb-6">
              Estudiantes de ORT TIC apasionados por la tecnología, el
              diseño y el bienestar animal.
            </p>
            </div>

            <div className="pt-[8px]">
              <p className="text-base leading-8 text-black/60 pb-[24px]">
                Estudiantes de ORT TIC apasionados por la tecnología, el diseño
                <br />
                y el bienestar animal.
              </p>
            </div>

            <div className="pt-[8px]">
            <button className="w-full sm:w-auto border border-[#41C086]/40 rounded-full px-7 py-3.5 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white">
              Conocé más sobre nosotros
            </button>
            </div>
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
            <div className="flex items-center gap-14">
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-[150px] h-auto"
              />
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

              <Link href="/login">
                <button className="w-full sm:w-auto min-w-[160px] bg-white text-black rounded-full px-8 py-3.5 text-sm font-medium whitespace-nowrap transition hover:bg-[#41C086]">
                  Crear cuenta
                </button>
              </Link>

              <span className="text-sm text-white/60 text-center sm:text-left">
                ¿Ya tenés cuenta?{" "}
                <Link href="/login" className="text-[#41C086] underline underline-offset-4 hover:text-white transition">
                  Iniciá sesión
                </Link>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
