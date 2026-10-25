"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Ruler } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Modal from "@/components/modal";
import LegMeasurementDiagram from "@/components/leg-measurement-diagram";
import StepIndicator from "./StepIndicator";
import { Franja } from "./form-ui";
import InfoPerroPreview from "./infoperro";
import Paso1InfoPerro from "./paso1";
import Paso2MiembroAfectado from "./paso2";
import Paso3Confirmar from "./paso3";
import ResultadoPaso from "./resultado";
import SnakeLoader, { type GenerationStage } from "@/components/snake-loader";
import type { DogSize, ProtesisFormData } from "./types";
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

// El formulario ya no pregunta el tamaño: lo deducimos del peso para el back.
function sizeFromWeight(weightKg: number): DogSize {
  if (weightKg < 10) return "pequeño";
  if (weightKg < 25) return "mediano";
  if (weightKg < 40) return "grande";
  return "muy grande";
}

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
  const [step, setStep] = useState<1 | 2 | 3>(() => loadSavedProgress()?.step ?? 1);
  // Cuando la prótesis ya se generó, el paso 3 pasa a mostrar el resultado.
  const [generada, setGenerada] = useState(false);
  const [guiaAbierta, setGuiaAbierta] = useState(false);
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
  // formulario (el resultado no se persiste), así un refresh accidental no
  // borra lo que ya cargaste.
  useEffect(() => {
    if (generada) return;

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
  }, [step, formData, generada]);

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

    const weightKg = Number(dogInfo.weightKg);
    if (!weightKg || weightKg <= 0) {
      setError("Falta el peso del perro.");
      return;
    }

    const size = dogInfo.size || sizeFromWeight(weightKg);

    const payload: ProsthesisRequestPayload = {
      user_id: user.id,
      dog_name: dogInfo.dogName,
      dog_weight_kg: weightKg,
      dog_breed: dogInfo.breed || null,
      dog_size: size,
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
    setStep(3);
    setGenerada(true);
  };

  const titulos: Record<1 | 2 | 3, { antes: string; acento: string; detalle: string }> = {
    1: {
      antes: "Empecemos por ",
      acento: "conocer a tu perro.",
      detalle: "Contanos lo básico sobre tu compañero. Podés editarlo cuando quieras.",
    },
    2: {
      antes: "Ahora, ",
      acento: "midamos su patita.",
      detalle: "Con estas medidas diseñamos una prótesis hecha a su medida.",
    },
    3: {
      antes: "Revisemos ",
      acento: "todo juntos.",
      detalle: `Un último vistazo antes de generar la prótesis de ${formData.dogInfo.dogName || "tu perro"}.`,
    },
  };
  const titulo = generada
    ? {
        antes: "Tu prótesis está ",
        acento: "lista.",
        detalle: `Descargá el modelo de ${formData.dogInfo.dogName || "tu perro"} y encontrá dónde imprimirlo.`,
      }
    : titulos[step];

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">
          Nueva prótesis · Paso {step} de 3
        </span>
        <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          {titulo.antes}
          <span className="text-mint">{titulo.acento}</span>
        </h1>
        <p className="text-white/70">{titulo.detalle}</p>
      </div>

      {stage && <SnakeLoader stage={stage} onFinish={showResult} />}

      <StepIndicator currentStep={step} completed={generada} />

      {error && (
        <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {generada ? (
        <ResultadoPaso
          dogName={formData.dogInfo.dogName}
          result={result}
          socketParams={socketParams}
          usedFallback={usedFallback}
          errorMessage={genError}
        />
      ) : (
        <>
          <div className="flex flex-col gap-6 lg:flex-row">
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
                onVerGuia={() => setGuiaAbierta(true)}
              />
            )}

            {step === 3 && (
              <Paso3Confirmar
                data={formData}
                onBack={() => setStep(2)}
                onEditar={(paso) => setStep(paso)}
                onConfirm={handleConfirmarPedido}
              />
            )}

            <InfoPerroPreview data={formData} step={step} />
          </div>

          {step === 1 && (
            <Franja
              icono={<Heart className="h-5 w-5" />}
              titulo="Cada perro es único"
              accion={
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 text-sm font-medium text-mint transition-colors hover:text-white"
                >
                  ¿Por qué pedimos esto?
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            >
              <p className="text-sm text-white/65">
                Por eso cada prótesis también. Con estos datos empezamos a diseñar una que se adapte a tu
                compañero, no un modelo genérico.
              </p>
            </Franja>
          )}

          {step === 2 && (
            <Franja
              icono={<Ruler className="h-5 w-5" />}
              titulo="Tips para medir bien"
              accion={
                <button
                  type="button"
                  onClick={() => setGuiaAbierta(true)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-mint transition-colors hover:text-white"
                >
                  Ver guía completa
                  <ArrowRight className="h-4 w-4" />
                </button>
              }
            >
              <ul className="flex flex-wrap gap-2">
                {["Usá una cinta métrica flexible", "Con tu perro parado y tranquilo", "Medí dos veces cada valor"].map(
                  (tip) => (
                    <li
                      key={tip}
                      className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs text-white/85"
                    >
                      ✓ {tip}
                    </li>
                  )
                )}
              </ul>
            </Franja>
          )}

          {step === 3 && (
            <Franja
              icono={<MapPin className="h-5 w-5" />}
              titulo="¿Qué pasa después?"
            >
              <p className="text-sm text-white/65">
                Generamos el modelo 3D de la prótesis y te mostramos espacios cercanos donde imprimirla.
              </p>
            </Franja>
          )}
        </>
      )}

      <Modal
        open={guiaAbierta}
        onClose={() => setGuiaAbierta(false)}
        titulo="Guía de"
        acento="medición"
        descripcion="Cómo medir el muñón de tu perro para que la prótesis quede a medida."
        anchoMax={640}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="w-40 shrink-0">
            <LegMeasurementDiagram />
          </div>
          <ul className="flex flex-col gap-3 text-sm text-white/75">
            <li>
              <span className="font-semibold text-white">Longitud:</span> largo total del miembro, de punta a
              punta.
            </li>
            <li>
              <span className="font-semibold text-white">Circunferencia proximal:</span> contorno cerca del
              cuerpo (suele ser el valor más grande).
            </li>
            <li>
              <span className="font-semibold text-white">Circunferencia distal:</span> contorno en la punta del
              muñón (el valor más chico).
            </li>
            <li>Usá una cinta métrica flexible, con tu perro parado y tranquilo, y medí dos veces cada valor.</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}
