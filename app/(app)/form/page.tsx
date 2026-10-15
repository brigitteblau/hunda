"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import StepIndicator from "./StepIndicator";
import InfoPerroPreview from "./infoperro";
import Paso1InfoPerro from "./paso1";
import Paso2MiembroAfectado from "./paso2";
import Paso3Confirmar from "./paso3";
import ResultadoPaso from "./resultado";
import SnakeLoader, { type GenerationStage } from "@/components/snake-loader";
import type { ProtesisFormData } from "./types";
import {
  calculateSocketParameters,
  createProsthesisRequest,
  generateProsthesis,
  ProsthesisApiError,
  wakeServer,
  type GenerateResult,
  type ProsthesisRequestPayload,
  type SocketParameters,
} from "@/lib/prosthesis-api";

const initialData: ProtesisFormData = {
  dogInfo: {
    photoFile: null,
    photoPreviewUrl: null,
    dogName: "",
    breed: "",
    age: "",
    weightKg: "",
    size: "",
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

const STORAGE_KEY = "hunda:nueva-protesis";

interface SavedProgress {
  step: 1 | 2 | 3;
  formData: ProtesisFormData;
}

function loadSavedProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const saved = JSON.parse(raw) as {
      step?: 1 | 2 | 3;
      formData?: Partial<ProtesisFormData>;
    };

    if (!saved.step || saved.step < 1 || saved.step > 3) return null;

    return {
      step: saved.step,
      formData: {
        dogInfo: { ...initialData.dogInfo, ...saved.formData?.dogInfo },
        limb: { ...initialData.limb, ...saved.formData?.limb },
      },
    };
  } catch {
    return null;
  }
}

export default function NuevaProtesisPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(() => loadSavedProgress()?.step ?? 1);
  const [formData, setFormData] = useState<ProtesisFormData>(
    () => loadSavedProgress()?.formData ?? initialData
  );
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [socketParams, setSocketParams] = useState<SocketParameters | null>(null);
  const [stage, setStage] = useState<GenerationStage | null>(null);

  // Guarda el progreso en cada cambio, mientras estemos en los pasos del
  // formulario (el resultado del paso 4 no se persiste), así un refresh
  // accidental no borra lo que ya cargaste.
  useEffect(() => {
    if (step === 4) return;

    try {
      const { dogName, breed, age, weightKg, size, sex, healthStatus, notes } = formData.dogInfo;
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          formData: {
            dogInfo: { dogName, breed, age, weightKg, size, sex, healthStatus, notes },
            limb: formData.limb,
          },
        })
      );
    } catch {
      // sessionStorage no disponible (modo privado, etc.) - no pasa nada
    }
  }, [step, formData]);

  function clearSavedProgress() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
  }

  async function saveDog(
    supabase: ReturnType<typeof createSupabaseBrowserClient>,
    userId: string,
    dogInfo: ProtesisFormData["dogInfo"],
    extra: { requestId?: string; protesisGenerada: boolean; downloadUrl?: string }
  ) {
    try {
      await supabase.from("perros").insert({
        user_id: userId,
        nombre: dogInfo.dogName,
        raza: dogInfo.breed || null,
        peso_kg: Number(dogInfo.weightKg) || null,
        request_id: extra.requestId ?? null,
        protesis_generada: extra.protesisGenerada,
        protesis_download_url: extra.downloadUrl ?? null,
      });
    } catch (err) {
      // Guardar el perro es un plus, no debería tumbar el flujo de generación.
      console.error("No se pudo guardar el perro:", err);
    }
  }

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

    if (!limb.position || !limb.side) {
      setError("Faltan datos del miembro afectado.");
      return;
    }

    if (!dogInfo.size) {
      setError("Falta el tamaño del perro.");
      return;
    }

    const payload: ProsthesisRequestPayload = {
      user_id: user.id,
      dog_name: dogInfo.dogName,
      dog_weight_kg: Number(dogInfo.weightKg),
      dog_breed: dogInfo.breed || null,
      dog_size: dogInfo.size,
      limb_position: limb.position,
      limb_side: limb.side,
      stump_length_cm: Number(limb.stumpLengthCm),
      proximal_circumference_cm: Number(limb.proximalCircumferenceCm),
      distal_circumference_cm: Number(limb.distalCircumferenceCm),
    };

    setStage("waking");
    let requestId: string | undefined;
    try {
      // Si el server de Render está dormido, esto lo despierta antes de mandar datos.
      await wakeServer();

      setStage("saving");
      const { request_id } = await createProsthesisRequest(payload);
      requestId = request_id;

      setStage("generating");
      const generated = await generateProsthesis(request_id);

      setResult(generated);
      setSocketParams(generated.socket_parameters ?? null);
      setUsedFallback(false);
      setGenError(null);
      setStage("done");
      clearSavedProgress();

      await saveDog(supabase, user.id, dogInfo, {
        requestId: request_id,
        protesisGenerada: true,
        downloadUrl: generated.download_url,
      });
    } catch (err) {
      console.error(err);

      // 422 = medidas con error de sentido físico: el usuario lo puede corregir,
      // así que lo mandamos de vuelta al paso 2 en vez de mostrarle un resultado.
      if (err instanceof ProsthesisApiError && err.status === 422) {
        setStage(null);
        setError(err.message);
        setStep(2);
        return;
      }

      // Cualquier otro error (backend caído, red, etc.) es un problema de
      // infraestructura, no del usuario. Intentamos al menos calcular la
      // geometría con sus medidas para dibujar la prótesis real en el visor.
      setStage("fallback");
      let params: SocketParameters | null = null;
      try {
        params = await calculateSocketParameters(payload);
      } catch (paramsErr) {
        console.error("Tampoco se pudieron calcular los parámetros:", paramsErr);
      }

      setResult(null);
      setSocketParams(params);
      setUsedFallback(true);
      setGenError(err instanceof Error ? err.message : "Error desconocido");
      setStage("done");
      clearSavedProgress();

      await saveDog(supabase, user.id, dogInfo, {
        requestId,
        protesisGenerada: false,
      });
    }
  };

  const showResult = () => {
    setStage(null);
    setStep(4);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-white">Nuevo Caso</h1>
        <p className="mt-1 text-white/45">
          {step === 4 ? "Tu prótesis está lista." : "Creá tu prótesis en 3 simples pasos!"}
        </p>
      </div>

      {stage && <SnakeLoader stage={stage} onFinish={showResult} />}

      <StepIndicator currentStep={step} />

      {error && (
        <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {step === 4 ? (
        <ResultadoPaso
          dogName={formData.dogInfo.dogName}
          result={result}
          socketParams={socketParams}
          usedFallback={usedFallback}
          errorMessage={genError}
        />
      ) : (
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
      )}
    </div>
  );
}
