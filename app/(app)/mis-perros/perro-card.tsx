"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import {
  Box,
  ChevronRight,
  Download,
  Loader2,
  MoreVertical,
  PawPrint,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { DeletePerroDialog, EditPerroDialog, usePerroActions } from "./perro-actions";
import { fileNameFor, type Perro } from "./perro-data";

export function EstadoBadge({ perro }: { perro: Perro }) {
  return perro.protesisGenerada ? (
    <span className="rounded-full bg-[#41C086]/15 px-3 py-1 text-xs font-medium text-[#41C086]">
      Prótesis lista
    </span>
  ) : (
    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/40">Sin prótesis</span>
  );
}

export function PerroAvatar({ perro, size = "md" }: { perro: Perro; size?: "md" | "lg" }) {
  const cls = size === "lg" ? "h-20 w-20 rounded-2xl" : "h-14 w-14 rounded-xl";
  return perro.fotoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element -- fotos de Supabase Storage (host variable)
    <img src={perro.fotoUrl} alt={perro.nombre} className={`${cls} object-cover`} />
  ) : (
    <div className={`${cls} flex shrink-0 items-center justify-center bg-white/5`}>
      <PawPrint className={size === "lg" ? "h-8 w-8 text-white/30" : "h-6 w-6 text-white/30"} />
    </div>
  );
}

function MenuItem({
  icon,
  children,
  onSelect,
  href,
  download,
  danger,
  disabled,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect?: () => void;
  href?: string;
  download?: string;
  danger?: boolean;
  disabled?: boolean;
}) {
  const cls = `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition disabled:opacity-40 ${
    danger ? "text-red-300 hover:bg-red-400/10" : "text-white/75 hover:bg-white/5 hover:text-white"
  }`;
  if (href) {
    return (
      <a href={href} download={download} target="_blank" rel="noreferrer" className={cls} onClick={onSelect}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onSelect} disabled={disabled}>
      {icon}
      {children}
    </button>
  );
}

export function PerroMenu({ perro, onDeleted }: { perro: Perro; onDeleted?: () => void }) {
  const router = useRouter();
  const { retryProsthesis } = usePerroActions();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  async function handleRetry() {
    setRetrying(true);
    setRetryError(null);
    try {
      await retryProsthesis(perro);
      setOpen(false);
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : "No se pudo generar.");
    } finally {
      setRetrying(false);
    }
  }

  return (
    <>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label={`Opciones de ${perro.nombre}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-white/5 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={6}
            className="z-50 w-60 rounded-xl border border-white/10 bg-[#12161a] p-1.5 shadow-xl outline-none"
          >
            <MenuItem
              icon={<ChevronRight size={15} />}
              onSelect={() => {
                setOpen(false);
                router.push(`/mis-perros/${perro.id}`);
              }}
            >
              Ver detalle
            </MenuItem>
            <MenuItem
              icon={<Pencil size={15} />}
              onSelect={() => {
                setOpen(false);
                setDialog("edit");
              }}
            >
              Editar datos
            </MenuItem>

            {perro.protesisGenerada && perro.downloadUrl ? (
              <>
                <MenuItem
                  icon={<Box size={15} />}
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/mis-perros/${perro.id}#protesis`);
                  }}
                >
                  Ver prótesis en 3D
                </MenuItem>
                <MenuItem
                  icon={<Download size={15} />}
                  href={perro.downloadUrl}
                  download={fileNameFor(perro)}
                  onSelect={() => setOpen(false)}
                >
                  Descargar STL
                </MenuItem>
              </>
            ) : perro.requestId ? (
              <MenuItem
                icon={retrying ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
                onSelect={handleRetry}
                disabled={retrying}
              >
                {retrying ? "Generando..." : "Reintentar prótesis"}
              </MenuItem>
            ) : (
              <MenuItem
                icon={<Box size={15} />}
                onSelect={() => {
                  setOpen(false);
                  router.push("/form");
                }}
              >
                Crear prótesis
              </MenuItem>
            )}

            {retryError && <p className="px-3 py-1.5 text-xs text-red-300">{retryError}</p>}

            <div className="my-1 h-px bg-white/8" />
            <MenuItem
              icon={<Trash2 size={15} />}
              danger
              onSelect={() => {
                setOpen(false);
                setDialog("delete");
              }}
            >
              Eliminar
            </MenuItem>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {dialog === "edit" && <EditPerroDialog perro={perro} onClose={() => setDialog(null)} />}
      {dialog === "delete" && (
        <DeletePerroDialog perro={perro} onClose={() => setDialog(null)} onDeleted={onDeleted} />
      )}
    </>
  );
}

export default function PerroCard({ perro }: { perro: Perro }) {
  return (
    <div className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 transition hover:border-white/15 hover:bg-white/5">
      {/* Toda la tarjeta abre el detalle; el menú queda por encima */}
      <Link
        href={`/mis-perros/${perro.id}`}
        aria-label={`Ver a ${perro.nombre}`}
        className="absolute inset-0 rounded-2xl"
      />

      <div className="pointer-events-none flex min-w-0 items-center gap-4">
        <PerroAvatar perro={perro} />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate font-medium text-white">{perro.nombre}</span>
          <span className="truncate text-sm text-white/45">
            {perro.raza || "Raza sin especificar"}
            {perro.pesoKg ? ` · ${perro.pesoKg} kg` : ""}
          </span>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center gap-3 sm:gap-6">
        <span className="pointer-events-none hidden sm:inline">
          <EstadoBadge perro={perro} />
        </span>
        <PerroMenu perro={perro} />
      </div>
    </div>
  );
}
