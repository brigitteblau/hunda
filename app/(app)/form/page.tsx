"use client";

import { useState } from "react";
import StepIndicator from "./StepIndicator";
import InfoPerroPreview from "./infoperro";
import Paso1InfoPerro from "./paso1";
import Paso2MiembroAfectado from "./paso2";
import type { ProtesisFormData } from "./types";

const initialData: ProtesisFormData = {
  dogInfo: {
    photoFile: null,
    photoPreviewUrl: null,
    dogName: "",
    breed: "",
    age: "",
    weightKg: "",
    sex: "",
    healthStatus: "",
    notes: "",
  },
  limb: {
    side: "",
    position: "",
    stumpLengthCm: "",
    distalCircumferenceCm: "",
    proximalCircumferenceCm: "",
  },
};

export default function NuevaProtesisPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ProtesisFormData>(initialData);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Nuevo Caso</h1>
        <p className="mt-1">Creá tu prótesis en 3 simples pasos!</p>
      </div>

      <StepIndicator currentStep={step} />

      <div className="flex flex-col lg:flex-row gap-6">
        {step === 1 && (
          <Paso1InfoPerro
            data={formData.dogInfo}
            onChange={(dogInfo) => setFormData((prev) => ({ ...prev, dogInfo }))}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Paso2MiembroAfectado
            data={formData.limb}
            onChange={(limb) => setFormData((prev) => ({ ...prev, limb }))}
            onContinue={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <div className="flex-1 rounded-2xl p-8 flex items-center justify-center text-sm text-center">
            Paso 3 (Generar prótesis) todavía no está diseñado.
            <br />
            Lo sumamos apenas esté el diseño.
          </div>
        )}

        <InfoPerroPreview data={formData} />
      </div>
    </div>
  );
}