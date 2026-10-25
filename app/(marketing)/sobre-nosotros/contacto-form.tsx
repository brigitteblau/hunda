"use client";

import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { abrirMail } from "@/components/marketing/mailto";
import { script } from "@/components/marketing/ui";

const MOTIVOS = ["Consulta", "Quiero colaborar", "Auspiciar", "Prensa"] as const;

const campo =
  "h-11 w-full rounded-xl border border-white/12 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint focus:ring-2 focus:ring-mint/20";
const etiqueta = "text-xs font-medium text-white/80";

export default function ContactoForm() {
  const [motivo, setMotivo] = useState<string>(MOTIVOS[0]);
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");

    abrirMail(`Hunda · ${motivo}`, [
      ["Nombre", v("nombre")],
      ["Email", v("email")],
      ["Motivo", motivo],
      ["Mensaje", v("mensaje")],
    ]);
    setEnviado(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className={etiqueta}>
            Nombre
          </label>
          <input id="nombre" name="nombre" required className={campo} placeholder="Tu nombre" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={etiqueta}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={campo} placeholder="tu@email.com" />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={`${etiqueta} pb-1`}>Motivo</legend>
        <div className="flex flex-wrap gap-2">
          {MOTIVOS.map((m) => {
            const activo = motivo === m;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={activo}
                onClick={() => setMotivo(m)}
                className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-medium transition-colors ${
                  activo
                    ? "border-mint bg-mint/15 text-mint"
                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="mensaje" className={etiqueta}>
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          className={`${campo} h-32 resize-none py-3`}
          placeholder="Contanos en qué te podemos ayudar..."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className={`${script.className} flex items-center gap-2 text-lg text-mint`}>
          <Heart className="h-4 w-4" />
          leemos cada mensaje
        </span>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-mint px-7 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white"
        >
          Enviar mensaje
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {enviado && (
        <p className="rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-xs text-white/85" role="status">
          Se abrió tu correo con el mensaje listo. Enviá ese mail para completarlo; si no se abrió, escribinos a
          betterbm26@gmail.com.
        </p>
      )}
    </form>
  );
}
