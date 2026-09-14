"use client";
import LandingNavbar from "@/components/landingnavbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { FaRuler, FaHeart } from "react-icons/fa";
import { ImTarget } from "react-icons/im";
import { IoCubeOutline } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import HeroDogPhoto from "@/components/hero-dog-photo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const steps = [
  {
    num: "01",
    title: "Medí",
    desc: "Cargá las medidas del muñón de tu perro en un formulario guiado, paso a paso.",
    icon: FaRuler,
  },
  {
    num: "02",
    title: "Generá",
    desc: "Nuestro motor calcula la geometría del socket y arma el modelo 3D al instante.",
    icon: IoCubeOutline,
  },
  {
    num: "03",
    title: "Imprimí",
    desc: "Descargá el STL y llevalo a uno de los puntos de impresión 3D aliados.",
    icon: MdLocalPrintshop,
  },
];

const features = [
  "Generación automática del modelo 3D",
  "Historial de casos por mascota",
  "Mapa de puntos de impresión aliados",
  "Descarga directa en formato STL",
];

const printingCards = [
  {
    title: "Personalizada",
    sub: "Cada prótesis se adapta a la anatomía y necesidad puntual del perro.",
    icon: IoSettingsOutline,
  },
  {
    title: "Precisa",
    sub: "El modelo se calcula a partir de medidas reales, listo para imprimir.",
    icon: ImTarget,
  },
  {
    title: "Accesible",
    sub: "Buscamos bajar el costo de una prótesis a fracción de lo tradicional.",
    icon: FiDollarSign,
  },
];

export default function LandingPage() {
  return (
    <main className="w-full min-h-screen bg-[#0B0F0D] text-white font-sans overflow-hidden">
      <LandingNavbar />

      {/* Inicio */}
      <section
        id="inicio"
        className="relative min-h-[calc(100vh-64px)] flex items-center px-6 lg:px-16 pt-24 pb-16"
      >
        <div
          className="pointer-events-none absolute top-1/2 left-1/4 h-[560px] w-175 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-[120px]"
          style={{ background: "radial-gradient(circle, #41C086, transparent 70%)" }}
        />

        <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center w-full max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-10"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-xs text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#41C086]" />
              Hecho en Uruguay, para perros de todo el mundo
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[1.02] tracking-[-0.04em] font-extrabold"
            >
              Tecnología para devolver
              <br />
              <span className="text-[#41C086]">movimiento.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-115 text-[17px] leading-7 text-white/55"
            >
              Diseñá prótesis caninas personalizadas desde un formulario simple,
              generá el modelo 3D al instante y encontrá dónde imprimirlo.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#41C086] text-[#0B0F0D] px-7 py-3.5 text-sm font-semibold transition hover:bg-white"
              >
                Crear mi prótesis
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </Link>

              <a
                href="#como-funciona"
                className="flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Ver cómo funciona
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
              {[
                { label: "Personalizadas", icon: FaHeart },
                { label: "Precisas", icon: ImTarget },
                { label: "Accesibles", icon: FiDollarSign },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-[14px] text-white/50">
                  <item.icon size={13} className="text-[#41C086]" />
                  {item.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <HeroDogPhoto />
          </motion.div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="px-5 sm:px-8 lg:px-16 py-28 sm:py-36 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
              Cómo funciona
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-[-0.03em] font-extrabold max-w-lg">
              Un proceso simple, en tres pasos.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3"
          >
            {steps.map((step, i) => (
              <motion.article
                key={step.num}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className={`flex flex-col gap-6 py-8 md:py-2 px-0 md:px-8 border-t md:border-t-0 md:border-l border-white/10 ${
                  i === 0 ? "md:border-l-0 md:pl-0" : ""
                }`}
              >
                <span className="text-sm font-mono text-[#41C086]">{step.num}</span>
                <step.icon size={22} className="text-white/70" />
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.01em]">{step.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-6 text-white/50 max-w-[240px]">
                    {step.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PLATAFORMA */}
      <section id="plataforma" className="px-5 sm:px-8 lg:px-16 py-28 sm:py-36 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/35 mb-4">
              La plataforma
            </p>

            <h2 className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.05] tracking-[-0.04em] font-extrabold pb-10">
              Controlá todo desde un único lugar.
            </h2>

            <p className="text-base sm:text-lg leading-8 text-white/55 max-w-lg pb-10">
              Diseñá, guardá y hacé seguimiento de todas las prótesis desde tu
              dashboard personal.
            </p>

            <div className="flex flex-col gap-3.5 pb-12">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#41C086]/15">
                    <Check size={11} className="text-[#41C086]" />
                  </span>
                  <span className="text-sm sm:text-base text-white/70">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F0D] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#41C086]"
            >
              Ir a la plataforma
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-white/3 border border-white/10 p-4 sm:p-5"
          >
            <div
              className="rounded-[1.5rem] aspect-[16/11] flex items-center justify-center p-5 sm:p-7"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                backgroundColor: "#0d130f",
              }}
            >
              <p className="text-sm text-white/25 text-center">Preview del dashboard</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPRESIÓN 3D */}
      <section id="impresion-3d" className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
              Fabricación 3D
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-[-0.03em] font-extrabold max-w-lg">
              Impresión 3D al servicio del bienestar.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {printingCards.map((card) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group rounded-[1.6rem] border border-white/10 bg-white/3 px-8 pt-9 pb-10 flex flex-col gap-6 transition hover:border-[#41C086]/40"
              >
                <card.icon size={22} className="text-[#41C086]" />
                <div>
                  <h3 className="text-xl tracking-[-0.02em] font-bold mb-2">{card.title}</h3>
                  <p className="text-sm leading-6 text-white/50">{card.sub}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-20 max-w-2xl"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
              Sobre nosotros
            </p>

            <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-tight tracking-[-0.03em] font-extrabold pb-8">
              Somos <span className="text-[#41C086]">Benja, Brigitte y Maite.</span>
            </h2>

            <p className="text-base leading-8 text-white/55 pb-8">
              Estudiantes de ORT TIC apasionados por la tecnología, el diseño
              y el bienestar animal. hunda. nació como proyecto de fin de
              carrera con la idea de acercar la impresión 3D a algo que
              realmente cambia la vida de un perro.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-[#41C086]/50 hover:text-white"
            >
              Conocé más sobre nosotros
            </a>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/3 px-6 sm:px-10 py-10 sm:py-12 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-[100px]"
              style={{ background: "radial-gradient(circle, #41C086, transparent 70%)" }}
            />

            <div className="relative">
              <h3 className="text-[clamp(1.9rem,3.6vw,3.2rem)] leading-none tracking-[-0.04em] font-extrabold">
                ¿Listo para <span className="text-[#41C086]">comenzar?</span>
              </h3>

              <p className="mt-4 max-w-xl text-sm sm:text-base leading-7 text-white/55">
                Creá tu cuenta gratis y empezá a diseñar la prótesis que tu
                perro necesita.
              </p>
            </div>

            <div className="relative flex flex-col gap-4 items-center sm:items-start shrink-0">
              <Link
                href="/login"
                className="w-full sm:w-auto min-w-[160px] flex items-center justify-center bg-[#41C086] text-[#0B0F0D] rounded-full px-8 py-3.5 text-sm font-semibold whitespace-nowrap transition hover:bg-white"
              >
                Crear cuenta
              </Link>

              <span className="text-sm text-white/45 whitespace-nowrap">
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
