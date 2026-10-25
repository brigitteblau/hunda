"use client";

import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, ImagePlus, Lock, PawPrint } from "lucide-react";
import type { DogInfoData } from "./types";
import { IconoTarjeta, Required, botonPrimario, inputClass, labelClass, tarjeta } from "./form-ui";

interface Paso1InfoPerroProps {
  data: DogInfoData;
  onChange: (data: DogInfoData) => void;
  onContinue: () => void;
}

// Sugerencias para el campo Raza (se puede escribir cualquier otra).
const RAZAS = [
  "Mestizo",
  "Golden Retriever",
  "Labrador Retriever",
  "Pastor Alemán",
  "Border Collie",
  "Caniche",
  "Bulldog Francés",
  "Boxer",
  "Rottweiler",
  "Beagle",
  "Dálmata",
  "Cocker Spaniel",
  "Siberian Husky",
  "West Highland White Terrier",
  "Schnauzer",
  "Dogo Argentino",
];

export default function Paso1InfoPerro({ data, onChange, onContinue }: Paso1InfoPerroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fotoError, setFotoError] = useState<string | null>(null);

  function update<K extends keyof DogInfoData>(key: K, value: DogInfoData[K]) {
    onChange({ ...data, [key]: value });
  }

  function handleFile(file: File | null | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFotoError("Elegí una imagen JPG o PNG.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFotoError("La foto pesa más de 5 MB.");
      return;
    }
    setFotoError(null);
    if (data.photoPreviewUrl) URL.revokeObjectURL(data.photoPreviewUrl);
    onChange({ ...data, photoFile: file, photoPreviewUrl: URL.createObjectURL(file) });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className={`${tarjeta} flex min-w-0 flex-1 flex-col gap-6 p-6 sm:p-8`}>
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <IconoTarjeta>
          <PawPrint className="h-5 w-5" />
        </IconoTarjeta>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-xl font-semibold text-white">Información del perro</h2>
          <p className="text-sm text-white/60">
            Estos datos nos ayudan a entender a tu compañero y a su prótesis.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[210px_1fr]">
        {/* Foto */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className="flex min-h-[250px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-mint/50 p-4 text-center"
        >
          {data.photoPreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- vista previa local (blob:)
            <img src={data.photoPreviewUrl} alt="Vista previa" className="h-24 w-24 rounded-2xl object-cover" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint/15 text-mint">
              <ImagePlus className="h-6 w-6" />
            </span>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-white">
              {data.photoFile ? "Foto cargada" : "Subí una foto"}
            </span>
            <span className="max-w-[170px] truncate text-xs text-white/50">
              {data.photoFile ? data.photoFile.name : "Arrastrala acá o elegila desde tu dispositivo"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full border border-white/25 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            {data.photoFile ? "Cambiar archivo" : "Elegir archivo"}
          </button>
          <span className={`text-[11px] ${fotoError ? "text-red-400" : "text-white/40"}`}>
            {fotoError ?? "JPG o PNG · máx. 5 MB"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {/* Datos */}
        <div className="grid content-start gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="dog-name" className={labelClass}>
              Nombre <Required />
            </label>
            <input
              id="dog-name"
              className={inputClass}
              placeholder="¿Cómo se llama?"
              value={data.dogName}
              onChange={(e) => update("dogName", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dog-breed" className={labelClass}>
              Raza
            </label>
            <div className="relative">
              <input
                id="dog-breed"
                list="razas-sugeridas"
                className={`${inputClass} pr-10`}
                placeholder="Elegí una raza"
                value={data.breed}
                onChange={(e) => update("breed", e.target.value)}
              />
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <datalist id="razas-sugeridas">
                {RAZAS.map((raza) => (
                  <option key={raza} value={raza} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dog-age" className={labelClass}>
              Edad <Required />
            </label>
            <div className="relative">
              <input
                id="dog-age"
                type="number"
                min={0}
                step="0.5"
                className={`${inputClass} pr-14`}
                placeholder="Ej.: 5"
                value={data.age}
                onChange={(e) => update("age", e.target.value)}
                required
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
                años
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dog-weight" className={labelClass}>
              Peso <Required />
            </label>
            <div className="relative">
              <input
                id="dog-weight"
                type="number"
                min={0}
                step="0.1"
                className={`${inputClass} pr-12`}
                placeholder="Ej.: 18"
                value={data.weightKg}
                onChange={(e) => update("weightKg", e.target.value)}
                required
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
                kg
              </span>
            </div>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className={`${labelClass} pb-2`}>Sexo</legend>
            <div className="grid grid-cols-2 gap-3">
              {(["macho", "hembra"] as const).map((option) => {
                const selected = data.sex === option;
                return (
                  <label
                    key={option}
                    className={`flex h-12 cursor-pointer items-center gap-2.5 rounded-xl border px-4 text-sm transition-colors ${
                      selected
                        ? "border-mint bg-mint/10 text-white"
                        : "border-white/12 bg-white/5 text-white/70 hover:border-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sex"
                      value={option}
                      checked={selected}
                      onChange={() => update("sex", option)}
                      className="h-4 w-4 accent-[#00e39a]"
                    />
                    {option === "macho" ? "Macho" : "Hembra"}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="dog-health" className={labelClass}>
              Estado de salud
            </label>
            <div className="relative">
              <select
                id="dog-health"
                className={`${inputClass} appearance-none pr-10`}
                value={data.healthStatus}
                onChange={(e) => update("healthStatus", e.target.value)}
              >
                <option value="" className="bg-[#0B0F0D]">
                  Elegí una opción
                </option>
                <option value="saludable" className="bg-[#0B0F0D]">
                  Saludable
                </option>
                <option value="en_tratamiento" className="bg-[#0B0F0D]">
                  En tratamiento
                </option>
                <option value="post_operatorio" className="bg-[#0B0F0D]">
                  Post operatorio
                </option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="dog-notes" className={labelClass}>
          Observaciones (opcional)
        </label>
        <textarea
          id="dog-notes"
          className={`${inputClass} min-h-[96px] resize-none`}
          placeholder="Ej.: perdió la pata hace 3 meses, usa arnés y es muy activo en los paseos..."
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 text-xs text-white/55">
          <Lock className="h-3.5 w-3.5" />
          Guardamos tu progreso automáticamente
        </span>
        <button type="submit" className={botonPrimario}>
          Continuar
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
