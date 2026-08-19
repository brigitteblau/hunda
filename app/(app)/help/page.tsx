import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import UserNav from "@/components/usernav";

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

  return (
    <div className="min-h-screen bg-[#B8B0B0]">
      {/* NAVBAR */}
      <header className="w-full h-[88px] flex items-center justify-end px-12">
        <UserNav />
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-16 pt-16 pb-32">
        {/* Texto */}
        <div className="flex flex-col gap-8 pb-24">
          <h1 className="text-[40px] font-light leading-tight text-black whitespace-nowrap">
            Ayudarte es nuestra{" "}
            <span className="text-[#41C086]">prioridad</span>
          </h1>

          <p className="text-[16px] leading-7 text-[#4A4A4A] max-w-[620px]">
            Te dejamos una serie de preguntas frecuentes para poder
            ayudarte. En caso de no necesitar ayuda personalizada,
            contáctanos a través de las redes o de este formulario.
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full bg-[#D9D9D9] rounded-[28px] p-12">
          <div className="flex flex-col gap-4 pb-14">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#41C086] flex items-center justify-center shrink-0">
                <IoChatbubbleEllipsesOutline className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[20px] font-semibold text-black">
                Envíanos un mensaje
              </h2>
            </div>
            <p className="text-[12px] text-[#5A5A5A] ml-12">
              Trataremos de contestarte lo antes posible. Las respuestas
              tardan hasta 72 horas.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className="block text-[14px] mb-3">Nombre</label>
                <input
                  type="text"
                  className="w-full h-11 bg-white border border-[#BEBEBE] px-3 outline-none rounded"
                />
              </div>
              <div>
                <label className="block text-[14px] mb-3">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full h-11 bg-white border border-[#BEBEBE] px-3 outline-none rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] mb-3">Asunto</label>
              <input
                type="text"
                className="w-full h-11 bg-white border border-[#BEBEBE] px-3 outline-none rounded"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-3">Mensaje</label>
              <textarea className="w-full h-40 bg-white border border-[#BEBEBE] resize-none p-3 outline-none rounded" />
            </div>

            <div className="flex justify-end">
              <button className="rounded-full bg-[#46D95F] px-6 py-2 text-[13px] font-semibold text-white">
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-16 pt-4 pb-32">
        <div className="flex items-center gap-3 pb-14">
          <div className="w-9 h-9 rounded-full bg-[#41C086] flex items-center justify-center shrink-0">
            <FaRegCircleQuestion className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-[22px] font-semibold text-black">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="flex flex-col gap-7">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-[18px] border border-[#8D8D8D] bg-[#D9D9D9]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-5 text-[15px]">
                {faq.question}
                <span className="text-xl transition-transform group-open:rotate-180">
                  ⌄
                </span>
              </summary>

              <div className="mx-7 mb-6 pt-5 border-t border-[#BEBEBE]">
                <p className="text-[14px] leading-6 text-[#444]">
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
