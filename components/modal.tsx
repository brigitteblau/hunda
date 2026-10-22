"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Parte blanca del título */
  titulo: string;
  /** Parte verde del título */
  acento: string;
  descripcion: string;
  /** Ancho máximo en px */
  anchoMax?: number;
  children: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  titulo,
  acento,
  descripcion,
  anchoMax = 800,
  children,
}: ModalProps) {
  const tituloId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        className="flex max-h-[calc(100vh-2rem)] w-full flex-col gap-6 overflow-y-auto rounded-[28px] border border-white/10 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] outline-none sm:p-10"
        style={{
          maxWidth: anchoMax,
          background: "linear-gradient(180deg, #223a35 0%, #2b2631 100%)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2
              id={tituloId}
              className="font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[32px]"
            >
              {titulo} <span className="text-mint">{acento}</span>
            </h2>
            <p className="text-[15px] text-white/65">{descripcion}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
}
