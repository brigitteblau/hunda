"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Wrench, Pencil, AlertTriangle } from "lucide-react";
import type { LimbData } from "./types";
import LegMeasurementDiagram from "@/components/leg-measurement-diagram";

interface Paso2MiembroAfectadoProps {
  data: LimbData;
  onChange: (data: LimbData) => void;
  onContinue: () => void;
  onBack: () => void;
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/20 transition-colors";

const fieldLabelClass = "text-xs font-semibold text-white/45 uppercase tracking-wide";

function Required() {
  return <span className="text-[#41C086]">*</span>;
}

function OptionButton({
  selected,
  onClick,
  icon,
  label,
  reverse = false,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  reverse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-medium transition-colors ${
        reverse ? "flex-row-reverse" : ""
      } ${
        selected
          ? "border-[#41C086] bg-[#41C086]/10 text-white"
          : "border-white/10 bg-white/5 text-white/50 hover:border-white/25"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default function Paso2MiembroAfectado({ data, onChange, onContinue, onBack }: Paso2MiembroAfectadoProps) {
  const [touchError, setTouchError] = useState(false);

  function update<K extends keyof LimbData>(key: K, value: LimbData[K]) {
    onChange({ ...data, [key]: value });
  }

  const distal = parseFloat(data.distalCircumferenceCm);
  const proximal = parseFloat(data.proximalCircumferenceCm);
  const measurementsInverted =
    !Number.isNaN(distal) && !Number.isNaN(proximal) && distal > proximal;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!data.side || !data.position) {
      setTouchError(true);
      return;
    }

    if (measurementsInverted) {
      setTouchError(true);
      return;
    }

    setTouchError(false);
    onContinue();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col gap-6 rounded-2xl border border-white/8 bg-white/3 p-8"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-white">Miembro afectado</h2>
        <p className="text-white/45 text-sm">Completá los datos técnicos para la generación de la prótesis</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className={fieldLabelClass}>
            Lado <Required />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <OptionButton
              selected={data.side === "izquierda"}
              onClick={() => update("side", "izquierda")}
              icon={<ArrowLeft size={16} />}
              label="Izquierda"
            />
            <OptionButton
              selected={data.side === "derecha"}
              onClick={() => update("side", "derecha")}
              icon={<ArrowRight size={16} />}
              label="Derecha"
              reverse
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={fieldLabelClass}>
            Tipo <Required />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <OptionButton
              selected={data.position === "delantera"}
              onClick={() => update("position", "delantera")}
              icon={<Wrench size={16} />}
              label="Delantera"
            />
            <OptionButton
              selected={data.position === "trasera"}
              onClick={() => update("position", "trasera")}
              icon={<Wrench size={16} />}
              label="Trasera"
            />
          </div>
        </div>
      </div>

      {touchError && (!data.side || !data.position) && (
        <p className="-mt-3 text-xs text-red-400">Elegí el lado y el tipo del miembro afectado.</p>
      )}

      <div className="flex flex-col md:flex-row gap-6 rounded-xl border border-white/8 bg-white/3 p-6">
        <div className="flex flex-col gap-4 md:w-44 shrink-0">
          <div className="flex items-center gap-2">
            <Pencil size={14} className="text-white/40" />
            <h3 className="text-sm font-semibold text-white">Medidas del muñón</h3>
          </div>
          <p className="text-xs text-white/40">
            Medí con una cinta métrica. El extremo <span className="text-white/70">proximal</span> es el
            más cercano al cuerpo del perro (más ancho); el <span className="text-white/70">distal</span> es
            la punta del muñón (más angosto).
          </p>
          <LegMeasurementDiagram />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 content-start">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-white/55">
              Longitud <Required />
            </label>
            <input
              type="number"
              min={0}
              step="0.1"
              className={inputClass}
              placeholder="Escribí acá..."
              value={data.stumpLengthCm}
              onChange={(e) => update("stumpLengthCm", e.target.value)}
              required
            />
            <p className="text-[11px] text-white/35">Largo total del muñón, de punta a punta.</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-white/55">
              Circunferencia proximal <Required />
            </label>
            <input
              type="number"
              min={0}
              step="0.1"
              className={inputClass}
              placeholder="Escribí acá..."
              value={data.proximalCircumferenceCm}
              onChange={(e) => update("proximalCircumferenceCm", e.target.value)}
              required
            />
            <p className="text-[11px] text-white/35">Contorno cerca del cuerpo (suele ser el valor más grande).</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-white/55">
              Circunferencia distal <Required />
            </label>
            <input
              type="number"
              min={0}
              step="0.1"
              className={`${inputClass} ${measurementsInverted ? "border-red-400/50 focus:border-red-400" : ""}`}
              placeholder="Escribí acá..."
              value={data.distalCircumferenceCm}
              onChange={(e) => update("distalCircumferenceCm", e.target.value)}
              required
            />
            <p className="text-[11px] text-white/35">Contorno en la punta del muñón (el valor más chico).</p>
          </div>

          {measurementsInverted && (
            <div className="sm:col-span-3 flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2.5 text-xs text-red-300">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>
                La circunferencia distal ({data.distalCircumferenceCm} cm) es mayor que la proximal (
                {data.proximalCircumferenceCm} cm). Revisá los valores: lo normal es que el extremo
                cercano al cuerpo (proximal) sea más ancho que la punta (distal).
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors text-white/70 font-semibold rounded-xl px-6 py-3 text-sm"
        >
          <ArrowLeft size={16} />
          Atrás
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#41C086] hover:bg-white transition-colors text-[#0B0F0D] font-semibold rounded-xl px-6 py-3 text-sm"
        >
          Continuar
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
