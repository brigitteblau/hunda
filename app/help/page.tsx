import { FaRegCircleQuestion } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
export default function HelpPage() {
  const faqs = [
    "¿Qué es HUNDA?",
    "¿Qué perros pueden usar una prótesis?",
    "¿Cómo sé si mi perro necesita una prótesis?",
    "¿Las prótesis son personalizadas?",
    "¿Cómo toman las medidas?",
    "¿Cuánto tarda la fabricación?",
    "¿Las prótesis son resistentes?",
    "¿Mi perro podrá correr y jugar?",
    "¿Necesita un período de adaptación?",
    "¿Cómo puedo solicitar una evaluación?",
    "¿Qué pasa si la prótesis necesita un ajuste?",
    "¿Las prótesis reemplazan el tratamiento veterinario?",
    "¿Cómo puedo comunicarme con HUNDA?",
  ];

  return (
    <main className="min-h-screen bg-[#B8B0B0]">
            {/* NAVBAR */}
      <header className="w-full h-[72px] flex items-center justify-between px-10">
        {/* Izquierda */}
        <div className="flex flex-col">
          <h1 className="text-white text-[34px] font-extrabold leading-none tracking-tight lowercase">
            hunda
          </h1>

          <button
  type="button"
  className="mt-1 w-fit rounded-full bg-[#FF4B4B] px-4 py-[2px] text-[11px] font-semibold text-white"
>
  volver
</button>
</div>

        {/* Derecha */}
  <div className="flex items-center gap-5">
  

    <FaRegCircleQuestion className="w-5 h-5" />

    <CiBellOn className="w-5 h-5" />

    <div className="text-right leading-none">
      <p className="text-[13px] text-black">
        nombre de usuario
      </p>

      <p className="text-[9px] text-[#5A5A5A]">
        Profile Setting
      </p>
    </div>

    
    <FaCircleUser className="w-8 h-8" />
  </div>
</header>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-16 pt-24 pb-24">
        <div className="flex justify-between items-center gap-24">
          {/* Texto */}
          <div className="max-w-[500px]">
            <h1 className="text-[64px] font-light leading-[72px] text-black">
              Ayudarte es nuestra prioridad
            </h1>

            <p className="mt-16 text-[16px] leading-7 text-[#4A4A4A] max-w-[400px]">
              Te dejamos una serie de preguntas frecuentes para poder ayudarte.
              En caso de no necesitar ayuda personalizada, contáctanos a través
              de las redes o de este formulario.
            </p>
          </div>

          {/* Formulario */}
          <div className="w-[460px] bg-[#D9D9D9] rounded-[28px] p-8">
            <div className="mb-6">
              <label className="block text-[18px] mb-2">Nombre</label>

              <input
                type="text"
                className="w-full h-11 bg-white border border-[#BEBEBE] px-3 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[18px] mb-2">Mail</label>

              <input
                type="email"
                className="w-full h-11 bg-white border border-[#BEBEBE] px-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-[18px] mb-2">Motivo</label>

              <div className="relative">
                <textarea
                  className="w-full h-60 bg-white border border-[#BEBEBE] resize-none p-3 outline-none"
                />

                <button
                  className="absolute bottom-4 right-4 w-16 h-8 rounded-full bg-[#46D95F]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-16 pb-24">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-[18px] border border-[#8D8D8D] bg-[#D9D9D9]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-[15px]">
                {faq}

                <span className="text-xl transition-transform group-open:rotate-180">
                  ⌄
                </span>
              </summary>

              {index === 3 && (
                <div className="px-6 pb-5 text-[14px] leading-6 text-[#444]">
                  Sí. Cada prótesis se fabrica a medida para adaptarse a las
                  características de cada perro y brindarle mayor comodidad.
                </div>
              )}
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}