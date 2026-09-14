import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function HelpPage() {
  const faqs = [
    {
      question: "¿Qué es HUNDA?",
      answer:
        "HUNDA es una plataforma que busca facilitar el acceso a órtesis y prótesis personalizadas para perros. Permite cargar los datos del animal, seleccionar un modelo adecuado y generar una pieza adaptada que pueda ser fabricada mediante impresión 3D.",
    },
    {
      question: "¿Qué perros pueden usar una prótesis?",
      answer:
        "Las soluciones de HUNDA están pensadas principalmente para perros que tienen problemas de movilidad, lesiones o amputaciones en alguna de sus extremidades. En el MVP comenzamos con órtesis simples, como férulas, soportes y estabilizadores.",
    },
    {
      question: "¿Cómo sé si mi perro necesita una prótesis?",
      answer:
        "Lo recomendable es consultar primero con un veterinario. Un profesional puede evaluar la lesión o dificultad de movilidad y determinar qué tipo de solución puede necesitar el perro.",
    },
    {
      question: "¿Las prótesis son personalizadas?",
      answer:
        "Sí. HUNDA utiliza los datos del perro, como sus medidas, peso y características de la lesión, para adaptar el modelo base a sus necesidades. De esta forma, la pieza puede ajustarse mejor a cada animal.",
    },
    {
      question: "¿Cómo toman las medidas?",
      answer:
        "El usuario carga las medidas necesarias del perro junto con otros datos, como fotos, peso y edad. Estas medidas se utilizan para ajustar los parámetros del modelo 3D antes de generar el archivo para imprimir.",
    },
    {
      question: "¿Cuánto tarda la fabricación?",
      answer:
        "El tiempo puede variar dependiendo del modelo elegido, sus medidas y la disponibilidad de la persona o lugar encargado de imprimirlo. HUNDA permite realizar un seguimiento del pedido para conocer en qué etapa se encuentra.",
    },
    {
      question: "¿Las prótesis son resistentes?",
      answer:
        "Los modelos se seleccionan teniendo en cuenta el uso que tendrá la pieza y las características del perro. De todas formas, la resistencia final depende del diseño, los materiales y el proceso de impresión, por lo que debe ser evaluada para cada caso.",
    },
    {
      question: "¿Mi perro podrá correr y jugar?",
      answer:
        "Depende del tipo de lesión, de la solución utilizada y de la adaptación de cada perro. HUNDA busca mejorar su movilidad y calidad de vida, pero siempre se debe seguir la recomendación de un veterinario sobre las actividades que puede realizar.",
    },
    {
      question: "¿Necesita un período de adaptación?",
      answer:
        "Sí, es posible que el perro necesite un período para acostumbrarse a utilizar la órtesis o prótesis. El tiempo de adaptación puede variar según cada animal y el tipo de pieza.",
    },
    {
      question: "¿Cómo puedo solicitar una evaluación?",
      answer:
        "Podés comenzar cargando los datos de tu perro en HUNDA. La plataforma permite ingresar información como fotos, medidas, peso, edad y tipo de lesión para iniciar el proceso y determinar qué solución puede ser adecuada.",
    },
    {
      question: "¿Qué pasa si la prótesis necesita un ajuste?",
      answer:
        "Si la pieza no se adapta correctamente, sus medidas pueden revisarse y el modelo puede volver a ajustarse antes de generar una nueva versión. La idea de HUNDA es permitir modificar los parámetros del diseño según las necesidades de cada perro.",
    },
    {
      question: "¿Las prótesis reemplazan el tratamiento veterinario?",
      answer:
        "No. HUNDA no reemplaza la atención ni el tratamiento veterinario. La plataforma busca facilitar el acceso a soluciones de movilidad, pero la evaluación y recomendación de un profesional siguen siendo fundamentales.",
    },
    {
      question: "¿Cómo puedo comunicarme con HUNDA?",
      answer:
        "Podés comunicarte con HUNDA a través del formulario de contacto disponible en la plataforma. Allí podés ingresar tu nombre, correo electrónico, asunto y mensaje para realizar una consulta.",
    },
  ];

  const fieldClass =
    "w-full h-11 bg-white/5 border border-white/10 px-3.5 text-sm text-white placeholder:text-white/30 outline-none rounded-lg focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/20 transition-colors";

  return (
    <div className="min-h-screen bg-[#0B0F0D]">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-32">
        {/* Texto */}
        <div className="flex flex-col gap-8 pb-24">
          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-tight text-white">
            Ayudarte es nuestra{" "}
            <span className="text-[#41C086]">prioridad.</span>
          </h1>

          <p className="text-[16px] leading-7 text-white/50 max-w-155">
            Te dejamos una serie de preguntas frecuentes para poder
            ayudarte. En caso de no necesitar ayuda personalizada,
            contáctanos a través de las redes o de este formulario.
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
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-4 pb-32">
        <div className="flex items-center gap-3 pb-14">
          <div className="w-9 h-9 rounded-full bg-[#41C086] flex items-center justify-center shrink-0">
            <FaRegCircleQuestion className="w-5 h-5 text-[#0B0F0D]" />
          </div>
          <h2 className="text-[22px] font-bold text-white">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-[18px] border border-white/8 bg-white/3 open:border-[#41C086]/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 text-[15px] text-white">
                {faq.question}
                <span className="shrink-0 text-white/40 transition-transform group-open:rotate-180">
                  ⌄
                </span>
              </summary>

              <div className="mx-5 mb-6 pt-5 border-t border-white/8">
                <p className="text-[14px] leading-6 text-white/50">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
