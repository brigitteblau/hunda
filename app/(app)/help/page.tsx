"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, Mail, MapPin, Heart, Check } from "lucide-react";
import { Caveat } from "next/font/google";
import { FaRegCircleQuestion, FaWhatsapp, FaInstagram } from "react-icons/fa6";

// Fuente manuscrita para "Leemos cada mensaje". Cambiá Caveat por otra de Google Fonts si querés.
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

/* ------------------------------------------------------------------ */
/* Datos de contacto — editá acá si algo cambia                        */
/* ------------------------------------------------------------------ */
const CONTACT = {
  email: "betterbm26@gmail.com",
  whatsappLabel: "+54 9 11 7366 7824",
  whatsappHref: "https://wa.me/5491173667824",
  instagramLabel: "@hunda_ok",
  instagramHref: "https://instagram.com/hunda_ok",
  location: "ORT Belgrano, CABA",
};

const TOPICS = ["Consulta", "Quiero colaborar", "Auspiciar", "Prensa"] as const;

/* ------------------------------------------------------------------ */
/* FAQ — mismo orden que el diseño                                     */
/* ------------------------------------------------------------------ */
const faqs: { question: string; answer: string }[] = [
  {
    question: "¿Qué es HUNDA?",
    answer:
      "HUNDA es una plataforma que busca facilitar el acceso a órtesis y prótesis personalizadas para perros. Permite cargar los datos del animal, generar un modelo 3D adaptado y encontrar dónde imprimirlo.",
  },
  {
    question: "¿Qué perros pueden usar una prótesis?",
    answer:
      "Está pensado principalmente para perros con problemas de movilidad, lesiones o amputaciones en alguna extremidad. En este MVP empezamos con órtesis simples: férulas, soportes y estabilizadores.",
  },
  {
    question: "¿Cómo sé si mi perro necesita una prótesis?",
    answer:
      "Lo recomendable es consultar primero con un veterinario. Un profesional puede evaluar la lesión o la dificultad de movilidad y determinar qué tipo de solución conviene.",
  },
  {
    question: "¿Las prótesis son personalizadas?",
    answer:
      "Sí. Usamos las medidas, el peso y las características de la lesión para adaptar el modelo a cada perro en particular.",
  },
  {
    question: "¿Cómo toman las medidas?",
    answer:
      "Vos cargás las medidas del muñón (longitud y circunferencias) junto con el peso y otros datos del perro. Esas medidas ajustan los parámetros del modelo 3D antes de generarlo — te guiamos con un diagrama en cada paso.",
  },
  {
    question: "¿Cuánto tarda la fabricación?",
    answer:
      "Depende del modelo, sus medidas y la disponibilidad del punto de impresión que elijas. Podés hacer seguimiento del pedido desde tu dashboard.",
  },
  {
    question: "¿Las prótesis son resistentes?",
    answer:
      "El diseño se ajusta al uso y las características del perro, pero la resistencia final también depende del material y el proceso de impresión de cada punto aliado.",
  },
  {
    question: "¿Mi perro podrá correr y jugar?",
    answer:
      "Depende del tipo de lesión, la solución usada y la adaptación de cada perro. Seguí siempre la recomendación de un veterinario sobre qué actividades puede realizar.",
  },
  {
    question: "¿Necesita un período de adaptación?",
    answer:
      "Sí, es normal que el perro necesite un tiempo para acostumbrarse. Ese período varía según el animal y el tipo de pieza.",
  },
  {
    question: "¿Cómo puedo solicitar una evaluación?",
    answer:
      "Entrá a \"Nueva Prótesis\" desde el dashboard y cargá los datos de tu perro: fotos, medidas, peso, edad y tipo de lesión. Con eso generamos un modelo 3D personalizado en minutos.",
  },
  {
    question: "¿Qué pasa si la prótesis necesita un ajuste?",
    answer:
      "Podés revisar las medidas cargadas y volver a generar el modelo con los valores corregidos antes de imprimir una nueva versión.",
  },
  {
    question: "¿Las prótesis reemplazan el tratamiento veterinario?",
    answer:
      "No. HUNDA no reemplaza la atención ni el tratamiento veterinario — busca facilitar el acceso a soluciones de movilidad, pero la evaluación de un profesional sigue siendo fundamental.",
  },
  {
    question: "¿Cómo puedo comunicarme con HUNDA?",
    answer:
      "Podés escribirnos con el formulario de esta misma página o a nuestro email, WhatsApp e Instagram. Respondemos en un plazo de hasta 72 horas.",
  },
];

/* ------------------------------------------------------------------ */
/* Acordeón animado (grid-rows 0fr → 1fr, sin dependencias)            */
/* ------------------------------------------------------------------ */
function FaqItem({
  id,
  question,
  answer,
  open,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-sm transition-colors duration-300 ${
        open
          ? "border-[#41C086]/35 bg-white/6"
          : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[13.5px] font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-[#41C086]/40 rounded-2xl"
      >
        <span className="flex items-center gap-3">
          <FaRegCircleQuestion
            className={`h-4 w-4 shrink-0 transition-colors duration-300 ${
              open ? "text-[#41C086]" : "text-white/35"
            }`}
          />
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ease-out ${
            open ? "rotate-180 text-[#41C086]" : ""
          }`}
        />
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mx-5 mb-5 border-t border-white/10 pt-4 text-[13px] leading-6 text-white/55">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */
export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("Consulta");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const fieldBase =
    "w-full border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-mint focus:ring-2 focus:ring-mint/20";
  const inputClass = `${fieldBase} h-11 rounded-full px-5`;
  const textareaClass = `${fieldBase} h-32 resize-none rounded-2xl px-5 py-4`;
  const labelClass = "mb-2 block text-[12px] text-white/75";

  // Todavía no hay endpoint propio: se abre el cliente de mail con el mensaje armado.
  // Cuando exista una API/route, reemplazar el cuerpo de esta función.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${topic}] Mensaje de ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const contactRows = [
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: FaWhatsapp, label: "WhatsApp", value: CONTACT.whatsappLabel, href: CONTACT.whatsappHref },
    { icon: FaInstagram, label: "Instagram", value: CONTACT.instagramLabel, href: CONTACT.instagramHref },
    { icon: MapPin, label: "Ubicación", value: CONTACT.location, href: undefined },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        {/* HERO */}
        <header className="mb-10">
          <h1 className="font-display text-[clamp(1.9rem,5vw,2.8rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
            Ayudarte es <span className="text-[#41C086]">nuestra prioridad.</span>
          </h1>
          <p className="mt-3 max-w-xl text-[13.5px] leading-6 text-white/55">
            Te dejamos una serie de preguntas frecuentes para poder ayudarte. Si
            creés de necesitar ayuda personalizada, contactanos a través de
            nuestro formulario.
          </p>
        </header>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#41C086]/15 text-[#41C086]">
              <FaRegCircleQuestion className="h-4 w-4" />
            </span>
            <h2 id="faq-title" className="text-lg font-semibold text-white">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                id={`faq-${i}`}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section
          aria-labelledby="contact-title"
          className="rounded-[28px] border border-white/10 bg-white/3 p-6 backdrop-blur-sm sm:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
            {/* Info */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                Contactanos
              </p>
              <h2
                id="contact-title"
                className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-none tracking-[-0.03em] text-[#41C086]"
              >
                Hablemos.
              </h2>
              <p className="mt-4 max-w-sm text-[13.5px] leading-6 text-white/55">
                ¿Tenés una consulta, querés colaborar o contarnos la historia de
                tu perro? Te respondemos en menos de 72 h.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {contactRows.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors group-hover:text-[#41C086]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block text-[10px] uppercase tracking-wider text-white/35">
                          {label}
                        </span>
                        <span className="block truncate text-[13px] text-white/80">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="group flex items-center gap-3"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="hp-name" className={labelClass}>
                    Nombre
                  </label>
                  <input
                    id="hp-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="hp-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="hp-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset className="mt-4">
                <legend className="mb-2 text-[12px] text-white/75">Motivo</legend>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const active = topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTopic(t)}
                        className={`rounded-full border px-4 py-2 text-[12px] transition-all duration-200 ${
                          active
                            ? "border-mint bg-mint/10 font-semibold text-mint"
                            : "border-white/20 bg-transparent text-white/80 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-4">
                <label htmlFor="hp-msg" className={labelClass}>
                  Mensaje
                </label>
                <textarea
                  id="hp-msg"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Contanos en qué te podemos ayudar..."
                  className={textareaClass}
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span
                  className={`${script.className} flex items-center gap-2 text-[19px] leading-none text-mint`}
                >
                  <Heart className="h-4 w-4 shrink-0" />
                  Leemos cada mensaje
                </span>

                <button
                  type="submit"
                  className="group flex shrink-0 items-center gap-2.5 rounded-full bg-mint px-7 py-3.5 text-[13px] font-semibold text-[#0B0F0D] transition-colors hover:bg-white"
                >
                  {sent ? (
                    <>
                      Enviado <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
