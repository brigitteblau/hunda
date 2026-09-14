"use client";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

const steps = [
  { number: 1, title: "Información", subtitle: "del perro" },
  { number: 2, title: "Miembro afectado", subtitle: "medidas del muñón" },
  { number: 3, title: "Generar", subtitle: "prótesis" },
  { number: 4, title: "Resultado", subtitle: "modelo 3D" },
] as const;

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 px-8 py-6 flex items-center">
      {steps.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isDone = step.number < currentStep;
        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#41C086] text-[#0B0F0D] border-[#41C086]"
                    : isDone
                    ? "bg-white/10 text-white border-white/20"
                    : "border-white/10 text-white/30"
                }`}
              >
                {step.number}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/35"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-white/30">{step.subtitle}</p>
              </div>
            </div>
            {idx < steps.length - 1 && <div className="mx-4 h-px flex-1 bg-white/8" />}
          </div>
        );
      })}
    </div>
  );
}
