"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Download, MapPin, CheckCircle2 } from "lucide-react";
import type { GenerateResult } from "@/lib/prosthesis-api";

const StlViewer = dynamic(() => import("@/components/stl-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-white/35">
      Cargando visor 3D...
    </div>
  ),
});

const PrintLocationsMap = dynamic(() => import("@/components/print-locations-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-sm text-white/35">
      Cargando mapa...
    </div>
  ),
});

const FALLBACK_STL_URL = "/models/fallback-socket.stl";

interface ResultadoPasoProps {
  dogName: string;
  result: GenerateResult | null;
  usedFallback: boolean;
  errorMessage: string | null;
}

export default function ResultadoPaso({
  dogName,
  result,
  usedFallback,
}: ResultadoPasoProps) {
  const modelUrl = usedFallback || !result ? FALLBACK_STL_URL : result.download_url;
  const downloadUrl = usedFallback || !result ? FALLBACK_STL_URL : result.download_url;

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-8">
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, #41C086, transparent 70%)" }}
        />

        <div className="relative flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#41C086]">
            <CheckCircle2 size={18} />
            <h2 className="text-xl font-bold text-white">¡Prótesis generada!</h2>
          </div>
          <p className="text-white/45 text-sm">
            La prótesis para {dogName || "tu perro"} está lista para imprimir.
          </p>
        </div>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 h-95 rounded-2xl border border-white/8 bg-[#0B0F0D] overflow-hidden">
            <StlViewer url={modelUrl} className="h-full w-full" />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/35">
                Detalle del modelo
              </span>

              {!usedFallback && result ? (
                <>
                  <Row label="Generador" value={result.generator_used === "blender-gn-v1" ? "Blender (a medida)" : "Escalado desde base"} />
                  <Row label="Altura" value={`${result.socket_parameters.height_cm.toFixed(1)} cm`} />
                  <Row label="Radio proximal" value={`${result.socket_parameters.top_radius_cm.toFixed(1)} cm`} />
                  <Row label="Radio distal" value={`${result.socket_parameters.bottom_radius_cm.toFixed(1)} cm`} />
                </>
              ) : (
                <Row label="Estado" value="Listo para imprimir" />
              )}
            </div>

            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#41C086] hover:bg-white transition-colors text-[#0B0F0D] font-semibold px-6 py-3 text-sm"
            >
              <Download size={16} />
              Descargar STL
            </a>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/70 font-semibold px-6 py-3 text-sm"
            >
              Ir al dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/3 p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-[#41C086]" />
          <div>
            <h3 className="text-lg font-bold text-white">Dónde imprimirla</h3>
            <p className="text-sm text-white/45">
              Llevá el STL a alguno de estos puntos aliados para imprimir en 3D.
            </p>
          </div>
        </div>

        <PrintLocationsMap className="h-75 w-full" />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/45">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
