// Piezas chicas que comparten el home y los pop ups.

import { Check } from "lucide-react";
import { ETAPAS, type Etapa, type EstadoProtesis } from "./dashboard-data";

export const tarjetaModal = "rounded-2xl border border-white/10 bg-white/[0.04]";

export const botonFantasma =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10";

export const botonMint =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-mint px-6 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white";

export function DogAvatar({
  nombre,
  fotoUrl,
  size = 52,
}: {
  nombre: string;
  fotoUrl: string | null;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-mint bg-white/10 font-semibold text-mint"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {fotoUrl ? (
        <img src={fotoUrl} alt={nombre} className="h-full w-full object-cover" />
      ) : (
        nombre.charAt(0)
      )}
    </span>
  );
}

const estilosEstado: Record<EstadoProtesis, string> = {
  "En espera": "border-amber-400/50 bg-amber-950/60 text-amber-300",
  "Lista para imprimir": "border-leaf/70 bg-leaf/15 text-leaf",
  "En revisión": "border-violet-400/40 bg-violet-950/60 text-violet-300",
};

export function StatusBadge({ estado }: { estado: EstadoProtesis }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${estilosEstado[estado]}`}
    >
      {estado}
    </span>
  );
}

export function Stepper({ etapa }: { etapa: Etapa }) {
  const actual = ETAPAS.indexOf(etapa);

  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Progreso de la prótesis">
      {ETAPAS.map((nombre, i) => {
        const hecha = i < actual;
        const activa = i === actual;
        const resaltada = hecha || activa;

        return (
          <li key={nombre} className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                resaltada ? "bg-mint" : "border border-white/25 bg-white/10"
              }`}
            >
              {hecha && <Check className="h-3 w-3 text-[#0B0F0D]" strokeWidth={3} />}
            </span>
            <span className={`text-sm ${resaltada ? "font-medium text-white" : "text-white/45"}`}>
              {nombre}
            </span>
            {i < ETAPAS.length - 1 && (
              <span
                className={`h-0.5 w-6 rounded-full ${i < actual ? "bg-mint" : "bg-white/20"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
