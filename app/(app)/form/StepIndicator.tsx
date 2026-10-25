"use client";

import { Check } from "lucide-react";
import { tarjeta } from "./form-ui";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  /** true cuando la prótesis ya se generó: el paso 3 también se marca como hecho */
  completed?: boolean;
}

const steps = [
  { number: 1, title: "Información del perro", subtitle: "Datos básicos" },
  { number: 2, title: "Miembro afectado", subtitle: "Medidas del muñón" },
  { number: 3, title: "Generar prótesis", subtitle: "Revisión final" },
] as const;

export default function StepIndicator({ currentStep, completed = false }: StepIndicatorProps) {
  return (
    <ol className={`${tarjeta} flex items-center px-6 py-5 sm:px-8`} aria-label="Pasos del formulario">
      {steps.map((step, idx) => {
        const isDone = step.number < currentStep || (completed && step.number === currentStep);
        const isActive = step.number === currentStep && !completed;
        const lineaActiva = step.number < currentStep || completed;

        return (
          <li key={step.number} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-mint bg-mint text-[#0B0F0D] ring-4 ring-mint/20"
                    : isDone
                      ? "border-mint bg-mint/80 text-[#0B0F0D]"
                      : "border-white/20 text-white/45"
                }`}
              >
                {isDone ? <Check className="h-5 w-5" strokeWidth={3} /> : step.number}
              </span>
              <div className="hidden leading-tight sm:block">
                <p className={`text-sm font-semibold ${isActive || isDone ? "text-white" : "text-white/45"}`}>
                  {step.title}
                </p>
                <p className={`text-xs ${isDone ? "text-mint" : "text-white/40"}`}>{step.subtitle}</p>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <span
                className={`mx-4 h-px flex-1 ${lineaActiva ? "bg-mint" : "bg-white/15"}`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
