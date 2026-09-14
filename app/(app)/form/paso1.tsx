"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import type { DogInfoData, DogSize } from "./types";

interface Paso1InfoPerroProps {
  data: DogInfoData;
  onChange: (data: DogInfoData) => void;
  onContinue: () => void;
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/20 transition-colors";

const fieldLabelClass = "text-xs font-semibold text-white/45 uppercase tracking-wide";

const sizeOptions: { value: DogSize; label: string }[] = [
  { value: "pequeño", label: "Pequeño" },
  { value: "mediano", label: "Mediano" },
  { value: "grande", label: "Grande" },
  { value: "muy grande", label: "Muy grande" },
];

function Required() {
  return <span className="text-[#41C086]">*</span>;
}

export default function Paso1InfoPerro({ data, onChange, onContinue }: Paso1InfoPerroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sizeError, setSizeError] = useState(false);

  function update<K extends keyof DogInfoData>(key: K, value: DogInfoData[K]) {
    onChange({ ...data, [key]: value });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onChange({ ...data, photoFile: file, photoPreviewUrl: previewUrl });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!data.size) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    onContinue();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col gap-6 rounded-2xl border border-white/8 bg-white/3 p-8"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-white">Información del perro</h2>
        <p className="text-white/45 text-sm">Completá los datos básicos de tu paciente</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className={fieldLabelClass}>Foto del perro (opcional)</label>
        <div className="border border-dashed border-white/15 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2">
          {data.photoPreviewUrl ? (
            <img src={data.photoPreviewUrl} alt="Vista previa" className="h-24 w-24 rounded-lg object-cover" />
          ) : (
            <Upload className="text-white/30" size={28} />
          )}
          <p className="text-xs text-white/40">
            {data.photoFile ? data.photoFile.name : "Seleccioná una imagen, PNG, JPG o WEBP"}
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-lg font-medium text-white/70"
          >
            Seleccionar archivo
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className={fieldLabelClass}>
            Nombre del perro <Required />
          </label>
          <input
            className={inputClass}
            placeholder="Escribí acá..."
            value={data.dogName}
            onChange={(e) => update("dogName", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={fieldLabelClass}>Raza</label>
          <input
            className={inputClass}
            placeholder="Escribí acá..."
            value={data.breed}
            onChange={(e) => update("breed", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className={fieldLabelClass}>Edad</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            placeholder="Años"
            value={data.age}
            onChange={(e) => update("age", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={fieldLabelClass}>
            Peso <Required />
          </label>
          <input
            type="number"
            min={0}
            step="0.1"
            className={inputClass}
            placeholder="kg"
            value={data.weightKg}
            onChange={(e) => update("weightKg", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={fieldLabelClass}>
          Tamaño <Required />
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sizeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                update("size", option.value);
                setSizeError(false);
              }}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                data.size === option.value
                  ? "border-[#41C086] bg-[#41C086]/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/25"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {sizeError && (
          <p className="text-xs text-red-400">Elegí un tamaño para continuar.</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className={fieldLabelClass}>
          Sexo <Required />
        </label>
        <div className="flex gap-6">
          {(["macho", "hembra"] as const).map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value={option}
                checked={data.sex === option}
                onChange={() => update("sex", option)}
                required
                className="accent-[#41C086]"
              />
              {option === "macho" ? "Macho" : "Hembra"}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={fieldLabelClass}>Estado de salud</label>
        <select
          className={inputClass}
          value={data.healthStatus}
          onChange={(e) => update("healthStatus", e.target.value)}
        >
          <option value="" className="bg-[#0B0F0D]">Seleccionar...</option>
          <option value="saludable" className="bg-[#0B0F0D]">Saludable</option>
          <option value="en_tratamiento" className="bg-[#0B0F0D]">En tratamiento</option>
          <option value="post_operatorio" className="bg-[#0B0F0D]">Post operatorio</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className={fieldLabelClass}>Observaciones (opcional)</label>
        <textarea
          className={`${inputClass} min-h-[90px] resize-none`}
          placeholder="Notas útiles para la generación de la prótesis..."
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#41C086] hover:bg-white transition-colors text-[#0B0F0D] font-semibold rounded-xl px-6 py-3 text-sm"
        >
          Continuar
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
