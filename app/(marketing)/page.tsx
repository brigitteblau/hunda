"use client";

import LandingNavbar from "@/components/landingnavbar";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  MapPin,
} from "lucide-react";
import AnimatedLetters from "@/components/animated-letters";
import { FaRuler } from "react-icons/fa";
import { ImTarget } from "react-icons/im";
import { IoCubeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import BackToTop from "@/components/back-to-top";

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

const steps = [
  {
    num: "01",
    title: "Medí",
    desc: "Cargá las medidas necesarias en un formulario guiado, pensado para acompañarte paso a paso.",
    icon: FaRuler,
  },
  {
    num: "02",
    title: "Generá",
    desc: "La plataforma utiliza los datos cargados para adaptar un modelo 3D parametrizado al caso.",
    icon: IoCubeOutline,
  },
  {
    num: "03",
    title: "Imprimí",
    desc: "Obtené el archivo STL y encontrá un punto de impresión 3D para llevar el modelo al mundo físico.",
    icon: MdLocalPrintshop,
  },
];

const features = [
  "Generación de modelos 3D parametrizados",
  "Historial de casos por mascota",
  "Información organizada en un solo lugar",
  "Descarga directa en formato STL",
];

const values = [
  {
    title: "Personalizada",
    sub: "Cada caso parte de las medidas y características particulares de cada perro.",
    icon: IoSettingsOutline,
  },
  {
    title: "Precisa",
    sub: "Transformamos datos reales en parámetros para construir un modelo 3D adaptado.",
    icon: ImTarget,
  },
  {
    title: "Accesible",
    sub: "Usamos fabricación digital para explorar alternativas más simples y accesibles.",
    icon: FiDollarSign,
  },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F0D] font-sans text-white selection:bg-[#41C086] selection:text-[#07100B]">

      {/* NAV */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <LandingNavbar />
      </div>

      {/* =========================================================
          HERO — FOTO FULL SCREEN
      ========================================================= */}
      <section
        id="inicio"
        className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
      >
        {/* FOTO — OCUPA ABSOLUTAMENTE TODO, CON MOVIMIENTO LENTO */}
        <img
          src="/hero-dog.jpg"
          alt="Perro con prótesis Hunda"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* OSCURECIMIENTO GENERAL MUY SUAVE */}
        <div className="pointer-events-none absolute inset-0 bg-black/15" />

        {/* DEGRADADO IZQUIERDO PARA EL TEXTO */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07100B]/95 via-[#07100B]/65 via-45% to-transparent" />

        {/* DEGRADADO INFERIOR */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/85 via-transparent to-black/20" />

        {/* GLOW VERDE */}
        <div
          className="pointer-events-none absolute -left-40 top-[25%] h-[650px] w-[650px] rounded-full opacity-[0.10] blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, #41C086 0%, transparent 68%)",
          }}
        />

        {/* CONTENIDO SOBRE LA FOTO */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center px-6 pt-20 sm:px-10 lg:px-16 xl:px-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-[830px]"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="text-[clamp(3.6rem,7vw,7.2rem)] font-extrabold leading-[0.9] tracking-[-0.065em]"
            >
              Por una vida
              <br />
              animal{" "}
              <span className="text-[#41C086]">
                sin límites.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-8 max-w-[480px] text-[17px] leading-8 text-white/70 sm:text-[19px]"
            >
              Prótesis caninas personalizadas, diseñadas en 3D.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <Link
                href="/login"
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-full bg-[#41C086] px-9 text-sm font-semibold text-[#07100B] transition-all duration-300 hover:bg-white"
              >
                Crear un caso
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">
            Descubrí Hunda
          </span>
          <div className="h-[1px] w-12 bg-white/30" />
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="relative border-t border-white/[0.06] px-5 py-28 sm:px-8 sm:py-36 lg:px-16 lg:py-44">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07] blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, #41C086 0%, transparent 65%)",
          }}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#41C086]">
            Tecnología con propósito
          </p>

          <AnimatedLetters
            className="text-balance text-[clamp(2.3rem,5vw,4.8rem)] font-bold leading-[1.08] tracking-[-0.05em]"
            segments={[
              { text: "Cuando tecnología, diseño y amor por los animales" },
              { text: "trabajan juntos.", className: "text-white/35" },
            ]}
          />

          <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-8 text-white/50 sm:text-[18px]">
            Hunda conecta herramientas digitales, modelado 3D y fabricación
            para simplificar el proceso de creación de soluciones
            personalizadas para perros.
          </p>
        </motion.div>
      </section>

      {/* =========================================================
          CÓMO FUNCIONA
      ========================================================= */}
      <section
        id="como-funciona"
        className="scroll-mt-20 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 text-center sm:mb-20"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#41C086]">
              Cómo funciona
            </p>

            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.05em]">
              De las medidas
              <span className="block text-white/35">al modelo 3D.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
          >
            {steps.map((step) => (
              <motion.article
                key={step.num}
                variants={fadeUp}
                className="group relative min-h-[340px] bg-[#0D1210] p-9 transition hover:bg-[#101713]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.15em] text-[#41C086]">
                    {step.num}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 group-hover:text-[#41C086]">
                    <step.icon size={18} />
                  </div>
                </div>

                <div className="absolute bottom-9 left-9 right-9">
                  <h3 className="text-2xl font-bold tracking-[-0.03em]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-white/45">
                    {step.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          PLATAFORMA
      ========================================================= */}
      <section
        id="plataforma"
        className="border-t border-white/[0.06] px-5 py-28 sm:px-8 sm:py-36 lg:px-16 lg:py-40"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#41C086]">
              La plataforma
            </p>

            <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-bold leading-none tracking-[-0.05em]">
              Todo el proceso.
              <span className="block text-white/35">
                En un solo lugar.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-base leading-8 text-white/50">
              Creá casos, cargá información y mantené organizados los modelos
              de cada mascota desde un único espacio digital.
            </p>

            <div className="mt-9 flex flex-col gap-4">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#41C086]/10">
                    <Check size={12} className="text-[#41C086]" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="group mt-10 inline-flex min-h-[50px] items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#0B0F0D] hover:bg-[#41C086]"
            >
              Explorar la plataforma
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-hidden rounded-[30px] border border-white/10 bg-[#101713] p-2"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-white/20">
                Hunda platform
              </span>
            </div>

            <div
              className="flex aspect-[16/10] items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              <div className="text-center">
                <IoCubeOutline
                  size={38}
                  className="mx-auto mb-4 text-[#41C086]"
                />
                <p className="text-sm text-white/45">
                  Dashboard Hunda
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          VALORES
      ========================================================= */}
      <section
        id="impresion-3d"
        className="border-t border-white/[0.06] px-5 py-28 sm:px-8 lg:px-16 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#41C086]">
            Diseño + fabricación digital
          </p>

          <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.05em]">
            Tecnología pensada
            <span className="block text-white/35">
              alrededor de cada animal.
            </span>
          </h2>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {values.map((card) => (
              <article
                key={card.title}
                className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-9"
              >
                <div className="mb-16 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#41C086]/10 text-[#41C086]">
                  <card.icon size={20} />
                </div>

                <h3 className="text-[22px] font-bold">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  {card.sub}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SOBRE NOSOTROS
      ========================================================= */}
      <section className="border-t border-white/[0.06] px-5 py-28 sm:px-8 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="mb-6 flex items-center gap-2 text-[#41C086]">
              <MapPin size={15} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                Buenos Aires · Argentina
              </span>
            </div>

            <h2 className="text-[clamp(2.5rem,5vw,4.7rem)] font-bold leading-none tracking-[-0.05em]">
              Hunda nació de una
              <span className="block text-white/35">
                pregunta simple.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-[21px] font-medium leading-9 text-white/80">
              ¿Cómo podemos usar la tecnología que aprendemos para mejorar la
              vida de un animal?
            </p>

            <p className="mt-7 text-[15px] leading-7 text-white/45">
              Somos Benja, Brigitte y Maite, estudiantes de ORT TIC. Hunda
              nació como nuestro proyecto de fin de carrera, combinando
              tecnología, diseño, modelado 3D y bienestar animal.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="px-5 pb-12 sm:px-8 lg:px-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#41C086]/20 bg-[#101A14] px-7 py-20 sm:px-12 lg:px-16 lg:py-24">
          <div
            className="absolute -right-40 -top-40 h-[600px] w-[600px] opacity-[0.15] blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, #41C086, transparent 65%)",
            }}
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#41C086]">
                Hunda
              </p>

              <h2 className="text-[clamp(2.8rem,6vw,5.8rem)] font-extrabold leading-[0.92] tracking-[-0.06em]">
                Por una vida animal
                <span className="block text-[#41C086]">
                  sin límites.
                </span>
              </h2>
            </div>

            <Link
              href="/login"
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#41C086] px-8 text-sm font-semibold text-[#07100B] hover:bg-white"
            >
              Crear mi cuenta
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}