"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import type { DogInfoData } from "./types";

interface Paso1InfoPerroProps {
  data: DogInfoData;
  onChange: (data: DogInfoData) => void;
  onContinue: () => void;
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-emerald-400/60 transition-colors";

export default function Paso1InfoPerro({ data, onChange, onContinue }: Paso1InfoPerroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    onContinue();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
    >
      <h2 className="text-xl font-bold text-white mb-1">Información del perro</h2>
      <p className="text-white/40 text-sm mb-6">Completá los datos básicos de tu paciente</p>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
          Foto del perro (opcional)
        </label>
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
            className="mt-1 text-xs bg-white/10 hover:bg-white/15 transition-colors px-4 py-2 rounded-lg font-medium"
          >
            Seleccionar archivo
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
            Nombre del perro
          </label>
          <input
            className={inputClass}
            placeholder="Escribí acá..."
            value={data.dogName}
            onChange={(e) => update("dogName", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Raza</label>
          <input
            className={inputClass}
            placeholder="Escribí acá..."
            value={data.breed}
            onChange={(e) => update("breed", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Edad</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            placeholder="Años"
            value={data.age}
            onChange={(e) => update("age", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Peso</label>
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

      <div className="mb-4">
        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Sexo</label>
        <div className="flex gap-6">
          {(["macho", "hembra"] as const).map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value={option}
                checked={data.sex === option}
                onChange={() => update("sex", option)}
                className="accent-emerald-400"
              />
              {option === "macho" ? "Macho" : "Hembra"}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
          Estado de salud
        </label>
        <select
          className={inputClass}
          value={data.healthStatus}
          onChange={(e) => update("healthStatus", e.target.value)}
        >
          <option value="">Seleccionar...</option>
          <option value="saludable">Saludable</option>
          <option value="en_tratamiento">En tratamiento</option>
          <option value="post_operatorio">Post operatorio</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
          Observaciones (opcional)
        </label>
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
          className="flex items-center gap-2 bg-white hover:bg-white/90 transition-colors text-black font-semibold rounded-xl px-6 py-3 text-sm"
        >
          Continuar
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}