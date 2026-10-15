"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { Download, MapPin, CheckCircle2, TriangleAlert } from "lucide-react";
import type { GenerateResult, SocketParameters } from "@/lib/prosthesis-api";
import type { ModelSource } from "@/components/stl-viewer";

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
  socketParams: SocketParameters | null;
  usedFallback: boolean;
  errorMessage: string | null;
}

function slug(text: string) {
  return (
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "perro"
  );
}

async function downloadParametricStl(params: SocketParameters, fileName: string) {
  const [{ buildSocketGeometry }, THREE, { STLExporter }] = await Promise.all([
    import("@/lib/socket-geometry"),
    import("three"),
    import("three/examples/jsm/exporters/STLExporter.js"),
  ]);
  const geometry = buildSocketGeometry(params);
  // Los slicers esperan Z hacia arriba
  geometry.rotateX(Math.PI / 2);
  const mesh = new THREE.Mesh(geometry);
  const data = new STLExporter().parse(mesh, { binary: true });
  geometry.dispose();

  const url = URL.createObjectURL(new Blob([data], { type: "model/stl" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ResultadoPaso({
  dogName,
  result,
  socketParams,
  usedFallback,
  errorMessage,
}: ResultadoPasoProps) {
  const realStl = !usedFallback && result ? result.download_url : null;
  const params = result?.socket_parameters ?? socketParams;
  const fileName = `protesis-${slug(dogName)}.stl`;

  const source = useMemo<ModelSource>(() => {
    if (realStl) return { type: "url", url: realStl };
    if (params) return { type: "params", params };
    return { type: "url", url: FALLBACK_STL_URL };
  }, [realStl, params]);

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

        {usedFallback && (
          <div className="relative mt-5 flex gap-3 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100/85">
            <TriangleAlert size={17} className="mt-0.5 shrink-0 text-amber-300" />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">
                {params
                  ? "El servidor no pudo generar el STL final, así que armamos la pieza con tus medidas."
                  : "No pudimos conectar con el servidor: este es un modelo de muestra."}
              </span>
              {errorMessage && <span className="text-xs text-amber-100/50">Detalle: {errorMessage}</span>}
            </div>
          </div>
        )}

        <div className="relative mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 h-95 rounded-2xl border border-white/8 bg-[#0B0F0D] overflow-hidden">
            <StlViewer source={source} className="h-full w-full" />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/35">
                Detalle del modelo
              </span>

              <Row
                label="Generador"
                value={
                  realStl
                    ? result?.generator_used === "blender-gn-v1"
                      ? "Blender (a medida)"
                      : "Escalado desde base"
                    : params
                      ? "Paramétrico (navegador)"
                      : "Modelo de muestra"
                }
              />
              {params && (
                <>
                  <Row label="Altura" value={`${params.height_cm.toFixed(1)} cm`} />
                  <Row label="Radio proximal" value={`${params.top_radius_cm.toFixed(1)} cm`} />
                  <Row label="Radio distal" value={`${params.bottom_radius_cm.toFixed(1)} cm`} />
                  <Row label="Pared" value={`${(params.wall_thickness_cm * 10).toFixed(0)} mm`} />
                </>
              )}
            </div>

            {realStl || !params ? (
              <a
                href={realStl ?? FALLBACK_STL_URL}
                download={fileName}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#41C086] hover:bg-white transition-colors text-[#0B0F0D] font-semibold px-6 py-3 text-sm"
              >
                <Download size={16} />
                Descargar STL
              </a>
            ) : (
              <button
                type="button"
                onClick={() => downloadParametricStl(params, fileName)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#41C086] hover:bg-white transition-colors text-[#0B0F0D] font-semibold px-6 py-3 text-sm"
              >
                <Download size={16} />
                Descargar STL
              </button>
            )}

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
