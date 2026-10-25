"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Ruler,
} from "lucide-react";
import type { LimbData } from "./types";
import {
  IconoTarjeta,
  Required,
  botonPrimario,
  botonSecundario,
  inputClass,
  labelClass,
  tarjeta,
} from "./form-ui";

interface Paso2MiembroAfectadoProps {
  data: LimbData;
  onChange: (data: LimbData) => void;
  onContinue: () => void;
  onBack: () => void;
  onVerGuia: () => void;
}

function OptionCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`relative flex h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border text-sm font-medium transition-colors ${
        selected
          ? "border-mint bg-mint/10 text-white"
          : "border-white/12 bg-white/5 text-white/70 hover:border-white/30"
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-mint text-[#0B0F0D]">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      )}
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          selected ? "bg-mint/20 text-mint" : "bg-white/10 text-white/70"
        }`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

function MedidaInput({
  id,
  label,
  hint,
  value,
  onChange,
  invalid = false,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label} <Required />
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          min={0}
          step="0.1"
          className={`${inputClass} pr-12 ${invalid ? "border-red-400/60 focus:border-red-400" : ""}`}
          placeholder="0,0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
          cm
        </span>
      </div>
      <p className="text-xs text-white/50">{hint}</p>
    </div>
  );
}

export default function Paso2MiembroAfectado({
  data,
  onChange,
  onContinue,
  onBack,
  onVerGuia,
}: Paso2MiembroAfectadoProps) {
  const [touchError, setTouchError] = useState(false);

  function update<K extends keyof LimbData>(key: K, value: LimbData[K]) {
    onChange({ ...data, [key]: value });
  }

  const distal = parseFloat(data.distalCircumferenceCm);
  const proximal = parseFloat(data.proximalCircumferenceCm);
  const measurementsInverted = !Number.isNaN(distal) && !Number.isNaN(proximal) && distal > proximal;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!data.side || !data.position || measurementsInverted) {
      setTouchError(true);
      return;
    }

    setTouchError(false);
    onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className={`${tarjeta} flex min-w-0 flex-1 flex-col gap-6 p-6 sm:p-8`}>
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <IconoTarjeta>
          <Ruler className="h-5 w-5" />
        </IconoTarjeta>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-xl font-semibold text-white">Miembro afectado</h2>
          <p className="text-sm text-white/60">
            Indicá qué pata necesita la prótesis y cargá las medidas del muñón.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Lado">
          <span className={labelClass}>
            ¿De qué lado? <Required />
          </span>
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              selected={data.side === "izquierda"}
              onClick={() => update("side", "izquierda")}
              icon={<ArrowLeft className="h-5 w-5" />}
              label="Izquierda"
            />
            <OptionCard
              selected={data.side === "derecha"}
              onClick={() => update("side", "derecha")}
              icon={<ArrowRight className="h-5 w-5" />}
              label="Derecha"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Pata">
          <span className={labelClass}>
            ¿Qué pata? <Required />
          </span>
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              selected={data.position === "delantera"}
              onClick={() => update("position", "delantera")}
              icon={<ArrowUp className="h-5 w-5" />}
              label="Delantera"
            />
            <OptionCard
              selected={data.position === "trasera"}
              onClick={() => update("position", "trasera")}
              icon={<ArrowDown className="h-5 w-5" />}
              label="Trasera"
            />
          </div>
        </div>
      </div>

      {touchError && (!data.side || !data.position) && (
        <p className="text-xs text-red-400">Elegí el lado y la pata del miembro afectado.</p>
      )}

      <div className="flex flex-col gap-5 rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-base font-semibold text-white">Medidas del muñón</h3>
            <p className="text-sm text-white/60">Ingresá los valores en centímetros</p>
          </div>
          <button
            type="button"
            onClick={onVerGuia}
            className="inline-flex items-center gap-2 text-sm font-medium text-mint transition-colors hover:text-white"
          >
            <Ruler className="h-4 w-4" />
            Ver guía de medición
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <MedidaInput
            id="limb-length"
            label="Longitud"
            hint="Largo total del miembro"
            value={data.stumpLengthCm}
            onChange={(v) => update("stumpLengthCm", v)}
          />
          <MedidaInput
            id="limb-distal"
            label="Circunferencia distal"
            hint="Parte inferior del muñón"
            value={data.distalCircumferenceCm}
            onChange={(v) => update("distalCircumferenceCm", v)}
            invalid={measurementsInverted}
          />
          <MedidaInput
            id="limb-proximal"
            label="Circunferencia proximal"
            hint="Parte superior del muñón"
            value={data.proximalCircumferenceCm}
            onChange={(v) => update("proximalCircumferenceCm", v)}
          />
        </div>

        {measurementsInverted && (
          <div className="flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-xs text-red-300">
            <AlertTriangle size={14} className="shrink-0 pt-0.5" />
            <span>
              La circunferencia distal ({data.distalCircumferenceCm} cm) es mayor que la proximal (
              {data.proximalCircumferenceCm} cm). Revisá los valores: lo normal es que el extremo cercano al
              cuerpo (proximal) sea más ancho que la punta (distal).
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onBack} className={botonSecundario}>
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
        <button type="submit" className={botonPrimario}>
          Revisar y continuar
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
