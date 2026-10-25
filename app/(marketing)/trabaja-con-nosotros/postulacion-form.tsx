"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { abrirMail } from "@/components/marketing/mailto";

const MATERIALES = ["PLA", "PETG", "TPU", "ABS"] as const;
const TIPOS = ["Universidad", "Veterinaria", "Taller / maker", "Particular", "Otro"] as const;

const campo =
  "h-11 w-full rounded-xl border border-white/12 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint focus:ring-2 focus:ring-mint/20";
const etiqueta = "text-xs font-medium text-white/80";

export default function PostulacionForm() {
  const [materiales, setMateriales] = useState<string[]>([]);
  const [acepta, setAcepta] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function alternar(material: string) {
    setMateriales((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");

    abrirMail(`Postulación de espacio: ${v("espacio")}`, [
      ["Nombre del espacio", v("espacio")],
      ["Tipo de espacio", v("tipo")],
      ["Responsable", v("responsable")],
      ["Email", v("email")],
      ["Teléfono", v("telefono")],
      ["Barrio o localidad", v("barrio")],
      ["Impresora 3D", v("impresora")],
      ["Materiales", materiales.join(", ")],
      ["Qué quiere sumar", v("mensaje")],
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
          <label htmlFor="espacio" className={etiqueta}>
            Nombre del espacio
          </label>
          <input id="espacio" name="espacio" required className={campo} placeholder="Ej.: Taller Maker Belgrano" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tipo" className={etiqueta}>
            Tipo de espacio
          </label>
          <div className="relative">
            <select id="tipo" name="tipo" required defaultValue="" className={`${campo} appearance-none pr-10`}>
              <option value="" disabled className="bg-[#0B0F0D]">
                Elegí una opción
              </option>
              {TIPOS.map((t) => (
                <option key={t} value={t} className="bg-[#0B0F0D]">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="responsable" className={etiqueta}>
            Responsable
          </label>
          <input id="responsable" name="responsable" required className={campo} placeholder="Nombre y apellido" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={etiqueta}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={campo} placeholder="tu@email.com" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="telefono" className={etiqueta}>
            Teléfono
          </label>
          <input id="telefono" name="telefono" type="tel" className={campo} placeholder="+54 9 11 ..." />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="barrio" className={etiqueta}>
            Barrio o localidad
          </label>
          <input id="barrio" name="barrio" className={campo} placeholder="Ej.: Belgrano, CABA" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="impresora" className={etiqueta}>
          Impresora 3D
        </label>
        <input id="impresora" name="impresora" className={campo} placeholder="Marca y modelo" />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={`${etiqueta} pb-1`}>Materiales que tenés</legend>
        <div className="flex flex-wrap gap-2">
          {MATERIALES.map((m) => {
            const activo = materiales.includes(m);
            return (
              <button
                key={m}
                type="button"
                aria-pressed={activo}
                onClick={() => alternar(m)}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-xs font-medium transition-colors ${
                  activo
                    ? "border-mint bg-mint/15 text-mint"
                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                }`}
              >
                {activo && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                {m}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="mensaje" className={etiqueta}>
          Contanos qué querés sumarte
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          className={`${campo} h-28 resize-none py-3`}
          placeholder="Ej.: tenemos dos impresoras en el laboratorio y queremos ayudar."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2.5 text-xs text-white/75">
          <input
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
            required
            className="h-4 w-4 accent-[#00e39a]"
          />
          <span>
            Acepto los{" "}
            <Link href="/terminos" className="text-mint underline underline-offset-2">
              términos y condiciones
            </Link>
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-mint px-7 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white"
        >
          Enviar postulación
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {enviado && (
        <p className="rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-xs text-white/85" role="status">
          Se abrió tu correo con la postulación lista. Enviá ese mail para completarla; si no se abrió, escribinos a
          betterbm26@gmail.com.
        </p>
      )}
    </form>
  );
}
