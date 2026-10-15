"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TriangleAlert, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { generateProsthesis } from "@/lib/prosthesis-api";
import type { Perro } from "./perro-data";

// ─── Acciones contra Supabase / API ────────────────────────────────────────

export function usePerroActions() {
  const router = useRouter();

  async function update(id: string, values: { nombre: string; raza: string | null; pesoKg: number | null }) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("perros")
      .update({ nombre: values.nombre, raza: values.raza, peso_kg: values.pesoKg })
      .eq("id", id);
    if (error) throw new Error(error.message);
    router.refresh();
  }

  async function remove(id: string) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("perros").delete().eq("id", id);
    if (error) throw new Error(error.message);
    router.refresh();
  }

  /** Vuelve a pedir el STL al back con la request ya guardada (sin re-cargar medidas). */
  async function retryProsthesis(perro: Perro) {
    if (!perro.requestId) throw new Error("Este perro no tiene medidas guardadas en el servidor.");
    const generated = await generateProsthesis(perro.requestId);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("perros")
      .update({ protesis_generada: true, protesis_download_url: generated.download_url })
      .eq("id", perro.id);
    if (error) throw new Error(error.message);
    router.refresh();
  }

  return { update, remove, retryProsthesis };
}

// ─── Modal base ────────────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12161a] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/5 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#41C086]/60";

// ─── Editar ────────────────────────────────────────────────────────────────

export function EditPerroDialog({ perro, onClose }: { perro: Perro; onClose: () => void }) {
  const { update } = usePerroActions();
  const [nombre, setNombre] = useState(perro.nombre);
  const [raza, setRaza] = useState(perro.raza ?? "");
  const [peso, setPeso] = useState(perro.pesoKg?.toString() ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pesoNum = peso.trim() === "" ? null : Number(peso.replace(",", "."));
    if (!nombre.trim()) return setError("El nombre no puede quedar vacío.");
    if (pesoNum !== null && (!Number.isFinite(pesoNum) || pesoNum <= 0 || pesoNum > 120)) {
      return setError("Poné un peso válido en kg.");
    }

    setSaving(true);
    setError(null);
    try {
      await update(perro.id, { nombre: nombre.trim(), raza: raza.trim() || null, pesoKg: pesoNum });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
      setSaving(false);
    }
  }

  return (
    <Modal title={`Editar a ${perro.nombre}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-white/50">Nombre</span>
          <input autoFocus className={inputClass} value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-white/50">Raza</span>
          <input
            className={inputClass}
            value={raza}
            placeholder="Sin especificar"
            onChange={(e) => setRaza(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-white/50">Peso (kg)</span>
          <input
            className={inputClass}
            inputMode="decimal"
            value={peso}
            placeholder="Ej: 18"
            onChange={(e) => setPeso(e.target.value)}
          />
        </label>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#41C086] px-4 py-2.5 text-sm font-semibold text-[#0B0F0D] transition hover:bg-white disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Eliminar ──────────────────────────────────────────────────────────────

export function DeletePerroDialog({
  perro,
  onClose,
  onDeleted,
}: {
  perro: Perro;
  onClose: () => void;
  onDeleted?: () => void;
}) {
  const { remove } = usePerroActions();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      await remove(perro.id);
      onClose();
      onDeleted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar.");
      setDeleting(false);
    }
  }

  return (
    <Modal title="Eliminar perro" onClose={onClose}>
      <div className="flex gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100/85">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-red-300" />
        <p>
          ¿Seguro que querés eliminar a <strong>{perro.nombre}</strong>? Se borra de tu lista junto con
          el acceso a su prótesis. No se puede deshacer.
        </p>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
        >
          {deleting && <Loader2 size={14} className="animate-spin" />}
          Eliminar
        </button>
      </div>
    </Modal>
  );
}
