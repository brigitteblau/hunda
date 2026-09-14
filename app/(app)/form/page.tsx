"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import StepIndicator from "./StepIndicator";
import InfoPerroPreview from "./infoperro";
import Paso1InfoPerro from "./paso1";
import Paso2MiembroAfectado from "./paso2";
import Paso3Confirmar from "./paso3";
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
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ProtesisFormData>(initialData);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmarPedido = async () => {
    setError(null);
    const supabase = createSupabaseBrowserClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Tenés que iniciar sesión de nuevo para confirmar el pedido.");
      return;
    }

    const { dogInfo, limb } = formData;

    const { error: insertError } = await supabase
      .from("prosthesis_requests")
      .insert({
        user_id: user.id,
        dog_name: dogInfo.dogName,
        dog_breed: dogInfo.breed,
        dog_weight_kg: dogInfo.weightKg ? Number(dogInfo.weightKg) : null,
        limb_position: limb.position || null,
        limb_side: limb.side || null,
        stump_length_cm: limb.stumpLengthCm ? Number(limb.stumpLengthCm) : null,
        proximal_circumference_cm: limb.proximalCircumferenceCm
          ? Number(limb.proximalCircumferenceCm)
          : null,
        distal_circumference_cm: limb.distalCircumferenceCm
          ? Number(limb.distalCircumferenceCm)
          : null,
        notes: dogInfo.notes || null,
        status: "pendiente",
      });

    if (insertError) {
      setError("No pudimos guardar el pedido. Probá de nuevo.");
      console.error(insertError);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Nuevo Caso</h1>
        <p className="mt-1">Creá tu prótesis en 3 simples pasos!</p>
      </div>

      <StepIndicator currentStep={step} />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

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
          <Paso3Confirmar
            data={formData}
            onBack={() => setStep(2)}
            onConfirm={handleConfirmarPedido}
          />
        )}

        <InfoPerroPreview data={formData} />
      </div>
    </div>
  );
}
