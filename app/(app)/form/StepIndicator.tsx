"use client";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, title: "Información", subtitle: "del perro" },
  { number: 2, title: "Miembro afectado", subtitle: "medidas del muñón" },
  { number: 3, title: "Generar", subtitle: "prótesis" },
] as const;

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-8 py-6 flex items-center">
      {steps.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isDone = step.number < currentStep;
        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : isDone
                    ? "bg-gray-100 text-gray-700 border-gray-300"
                    : "border-gray-200 text-gray-400"
                }`}
              >
                {step.number}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.subtitle}</p>
              </div>
            </div>
            {idx < steps.length - 1 && <div className="mx-4 h-px flex-1 bg-gray-200" />}
          </div>
        );
      })}
    </div>
  );
}