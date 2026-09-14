import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Sparkles, HeartPulse, Ruler, HeartHandshake, Mail } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  items: Faq[];
}

const categories: FaqCategory[] = [
  {
    title: "La plataforma",
    description: "Qué es hunda. y qué podés hacer con ella.",
    icon: Sparkles,
    items: [
      {
        question: "¿Qué es hunda.?",
        answer:
          "hunda. es una plataforma que busca facilitar el acceso a órtesis y prótesis personalizadas para perros. Permite cargar los datos del animal, generar un modelo 3D adaptado y encontrar dónde imprimirlo.",
      },
      {
        question: "¿Cómo puedo solicitar una evaluación?",
        answer:
          "Entrá a \"Nueva Prótesis\" desde el dashboard y cargá los datos de tu perro: fotos, medidas, peso, edad y tipo de lesión. Con eso generamos un modelo 3D personalizado en minutos.",
      },
      {
        question: "¿Cómo puedo comunicarme con hunda.?",
        answer:
          "Podés escribirnos con el formulario de esta misma página, o desde la sección de Contacto. Respondemos en un plazo de hasta 72 horas.",
      },
    ],
  },
  {
    title: "¿Es para mi perro?",
    description: "Antes de empezar, esto es lo que conviene saber.",
    icon: HeartPulse,
    items: [
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
        question: "¿Las prótesis reemplazan el tratamiento veterinario?",
        answer:
          "No. hunda. no reemplaza la atención ni el tratamiento veterinario — busca facilitar el acceso a soluciones de movilidad, pero la evaluación de un profesional sigue siendo fundamental.",
      },
    ],
  },
  {
    title: "Medidas y fabricación",
    description: "Cómo pasamos de tus datos a una pieza imprimible.",
    icon: Ruler,
    items: [
      {
        question: "¿Cómo toman las medidas?",
        answer:
          "Vos cargás las medidas del muñón (longitud y circunferencias) junto con el peso y otros datos del perro. Esas medidas ajustan los parámetros del modelo 3D antes de generarlo — te guiamos con un diagrama en cada paso.",
      },
      {
        question: "¿Las prótesis son personalizadas?",
        answer:
          "Sí. Usamos las medidas, el peso y las características de la lesión para adaptar el modelo a cada perro en particular.",
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
        question: "¿Qué pasa si la prótesis necesita un ajuste?",
        answer:
          "Podés revisar las medidas cargadas y volver a generar el modelo con los valores corregidos antes de imprimir una nueva versión.",
      },
    ],
  },
  {
    title: "Cuidado y adaptación",
    description: "Qué esperar una vez que tu perro empieza a usarla.",
    icon: HeartHandshake,
    items: [
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
    ],
  },
];

export default function HelpPage() {
  const fieldClass =
    "w-full h-11 bg-white/5 border border-white/10 px-3.5 text-sm text-white placeholder:text-white/30 outline-none rounded-lg focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/20 transition-colors";

  return (
    <div className="min-h-screen bg-[#0B0F0D]">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-24">
        <div className="flex flex-col gap-8 pb-20">
          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-tight text-white">
            Ayudarte es nuestra{" "}
            <span className="text-[#41C086]">prioridad.</span>
          </h1>

          <p className="text-[16px] leading-7 text-white/50 max-w-155">
            Agrupamos las preguntas más frecuentes por tema para que sea más
            fácil encontrar lo que buscás. Si no encontrás tu respuesta,
            escribinos con el formulario de acá abajo.
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full rounded-[28px] border border-white/8 bg-white/3 p-6 sm:p-12">
          <div className="flex flex-col gap-4 pb-14">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#41C086] flex items-center justify-center shrink-0">
                <IoChatbubbleEllipsesOutline className="w-5 h-5 text-[#0B0F0D]" />
              </div>
              <h2 className="text-[20px] font-semibold text-white">
                Envíanos un mensaje
              </h2>
            </div>
            <p className="text-[12px] text-white/40 ml-12">
              Trataremos de contestarte lo antes posible. Las respuestas
              tardan hasta 72 horas.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
              <div>
                <label className="block text-[14px] mb-3 text-white/60">Nombre</label>
                <input type="text" className={fieldClass} />
              </div>
              <div>
                <label className="block text-[14px] mb-3 text-white/60">
                  Correo electrónico
                </label>
                <input type="email" className={fieldClass} />
              </div>
            </div>

            <div>
              <label className="block text-[14px] mb-3 text-white/60">Asunto</label>
              <input type="text" className={fieldClass} />
            </div>

            <div>
              <label className="block text-[14px] mb-3 text-white/60">Mensaje</label>
              <textarea className={`${fieldClass} h-40 resize-none py-3`} />
            </div>

            <div className="flex justify-end">
              <button className="rounded-full bg-[#41C086] hover:bg-white transition-colors px-6 py-2.5 text-[13px] font-semibold text-[#0B0F0D]">
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-4 pb-16">
        <h2 className="text-[22px] font-bold text-white mb-2">Preguntas frecuentes</h2>
        <p className="text-sm text-white/45 mb-10">Organizadas por tema.</p>

        <div className="flex flex-col gap-14">
          {categories.map((category) => (
            <div key={category.title} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#41C086]/12 text-[#41C086]">
                  <category.icon size={18} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-white/40 mt-1 max-w-55">{category.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {category.items.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-white/8 bg-white/3 open:border-[#41C086]/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-medium text-white">
                      {faq.question}
                      <span className="shrink-0 text-white/40 transition-transform group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>

                    <div className="mx-6 mb-5 pt-4 border-t border-white/8">
                      <p className="text-[13.5px] leading-6 text-white/50">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-6 py-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/50">
            <Mail size={16} />
          </span>
          <p className="text-sm text-white/60">
            ¿No encontraste lo que buscabas?{" "}
            <a href="/contact" className="text-[#41C086] font-medium hover:text-white transition-colors">
              Escribinos directamente
            </a>{" "}
            y te ayudamos.
          </p>
        </div>
      </section>
    </div>
  );
}
