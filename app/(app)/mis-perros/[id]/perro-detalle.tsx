"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Box, Download, Loader2, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { DeletePerroDialog, EditPerroDialog, usePerroActions } from "../perro-actions";
import { fileNameFor, type Perro } from "../perro-data";
import { EstadoBadge, PerroAvatar } from "../perro-card";

const StlViewer = dynamic(() => import("@/components/stl-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-white/35">
      Cargando visor 3D...
    </div>
  ),
});

const fechaFmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric" });

export default function PerroDetalle({ perro }: { perro: Perro }) {
  const router = useRouter();
  const { retryProsthesis } = usePerroActions();
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  async function handleRetry() {
    setRetrying(true);
    setRetryError(null);
    try {
      await retryProsthesis(perro);
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : "No se pudo generar.");
    } finally {
      setRetrying(false);
    }
  }

  const tieneModelo = perro.protesisGenerada && !!perro.downloadUrl;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-12">
      <Link
        href="/mis-perros"
        className="flex w-fit items-center gap-1.5 text-sm text-white/45 transition hover:text-white"
      >
        <ArrowLeft size={15} />
        Mis perros
      </Link>

      {/* Encabezado */}
      <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <PerroAvatar perro={perro} size="lg" />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl">{perro.nombre}</h1>
            <EstadoBadge perro={perro} />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDialog("edit")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            <Pencil size={15} />
            Editar
          </button>
          <button
            type="button"
            onClick={() => setDialog("delete")}
            className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-400/20"
          >
            <Trash2 size={15} />
            Eliminar
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Datos */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/3 p-6 lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/35">Datos</span>
          <Row label="Raza" value={perro.raza || "Sin especificar"} />
          <Row label="Peso" value={perro.pesoKg ? `${perro.pesoKg} kg` : "Sin especificar"} />
          <Row label="Registrado" value={fechaFmt.format(new Date(perro.createdAt))} />
          <button
            type="button"
            onClick={() => setDialog("edit")}
            className="mt-2 flex w-fit items-center gap-1.5 text-sm font-medium text-[#41C086] transition hover:text-white"
          >
            <Pencil size={13} />
            Modificar datos
          </button>
        </div>

        {/* Prótesis */}
        <div id="protesis" className="flex scroll-mt-6 flex-col gap-4 rounded-2xl border border-white/8 bg-white/3 p-6 lg:col-span-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/35">Prótesis</span>

          {tieneModelo ? (
            <>
              <div className="h-95 overflow-hidden rounded-2xl border border-white/8 bg-[#0B0F0D]">
                <StlViewer source={{ type: "url", url: perro.downloadUrl! }} className="h-full w-full" />
              </div>
              <a
                href={perro.downloadUrl!}
                download={fileNameFor(perro)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#41C086] px-6 py-3 text-sm font-semibold text-[#0B0F0D] transition hover:bg-white"
              >
                <Download size={16} />
                Descargar STL
              </a>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/10 py-14 text-center">
              <Box className="h-10 w-10 text-white/20" />
              <div className="flex flex-col gap-1 px-6">
                <span className="text-sm font-medium text-white/70">
                  {perro.nombre} todavía no tiene prótesis
                </span>
                <span className="text-xs text-white/35">
                  {perro.requestId
                    ? "Sus medidas ya están guardadas: podés volver a intentar la generación."
                    : "Cargá sus medidas para diseñar la prótesis."}
                </span>
              </div>

              {perro.requestId ? (
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={retrying}
                  className="flex items-center gap-2 rounded-full bg-[#41C086] px-5 py-2.5 text-sm font-semibold text-[#0B0F0D] transition hover:bg-white disabled:opacity-60"
                >
                  {retrying ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
                  {retrying ? "Generando..." : "Reintentar prótesis"}
                </button>
              ) : (
                <Link
                  href="/form"
                  className="flex items-center gap-2 rounded-full bg-[#41C086] px-5 py-2.5 text-sm font-semibold text-[#0B0F0D] transition hover:bg-white"
                >
                  <Box size={15} />
                  Crear prótesis
                </Link>
              )}
              {retryError && <p className="max-w-sm px-6 text-xs text-red-300">{retryError}</p>}
            </div>
          )}
        </div>
      </div>

      {dialog === "edit" && <EditPerroDialog perro={perro} onClose={() => setDialog(null)} />}
      {dialog === "delete" && (
        <DeletePerroDialog
          perro={perro}
          onClose={() => setDialog(null)}
          onDeleted={() => router.push("/mis-perros")}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-white/45">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}
