const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://bbm-server-hfq1.onrender.com").replace(
  /\/+$/,
  ""
);

// Render (plan free) duerme el server tras un rato sin tráfico y tarda ~1 min
// en despertar. Los timeouts tienen que tolerar ese arranque en frío.
const WAKE_TIMEOUT_MS = 90_000;
const REQUEST_TIMEOUT_MS = 60_000;
const GENERATE_TIMEOUT_MS = 180_000;

export interface ProsthesisRequestPayload {
  user_id: string;
  dog_name: string;
  dog_weight_kg: number;
  dog_breed?: string | null;
  dog_size?: string | null;
  limb_position: "delantera" | "trasera";
  limb_side: "izquierda" | "derecha";
  stump_length_cm: number;
  proximal_circumference_cm: number;
  distal_circumference_cm: number;
}

export interface CreateRequestResult {
  request_id: string;
  dog_name: string;
}

export interface SocketParameters {
  dog_name: string;
  height_cm: number;
  top_radius_cm: number;
  bottom_radius_cm: number;
  wall_thickness_cm: number;
  connector_radius_cm: number;
  limb_position: string;
  limb_side: string;
}

export interface GenerateResult {
  success: boolean;
  request_id: string;
  dog_name: string;
  socket_parameters: SocketParameters;
  generator_used: string;
  fallback_reason: string | null;
  generated_model_id: string;
  storage_path: string;
  download_url: string;
}

export class ProsthesisApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ProsthesisApiError";
    this.status = status;
  }
}

async function fetchWithTimeout(input: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (err) {
    if (controller.signal.aborted) {
      throw new ProsthesisApiError("El servidor tardó demasiado en responder.");
    }
    throw new ProsthesisApiError(
      err instanceof Error ? `No pudimos conectar con el servidor (${err.message}).` : "Error de red"
    );
  } finally {
    clearTimeout(timer);
  }
}

/** Despierta el backend (cold start de Render). Resuelve true si respondió. */
export async function wakeServer(): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/health`, { method: "GET" }, WAKE_TIMEOUT_MS);
    return res.ok;
  } catch {
    return false;
  }
}

/** El back puede devolver la URL relativa a su propio host; la hacemos absoluta. */
export function resolveModelUrl(url: string): string {
  if (/^https?:\/\//i.test(url) || url.startsWith("blob:")) return url;
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

async function readErrorDetail(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body?.detail === "string") return body.detail;
    if (Array.isArray(body?.detail)) {
      return body.detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(", ");
    }
  } catch {
    // no-op, fall through to generic message
  }
  return `Error ${res.status}`;
}

export async function createProsthesisRequest(
  payload: ProsthesisRequestPayload
): Promise<CreateRequestResult> {
  const res = await fetchWithTimeout(
    `${API_URL}/prosthesis/requests`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    REQUEST_TIMEOUT_MS
  );

  if (!res.ok) {
    throw new ProsthesisApiError(await readErrorDetail(res), res.status);
  }

  return res.json();
}

export async function generateProsthesis(requestId: string): Promise<GenerateResult> {
  const res = await fetchWithTimeout(
    `${API_URL}/prosthesis/requests/${requestId}/generate`,
    { method: "POST" },
    GENERATE_TIMEOUT_MS
  );

  if (!res.ok) {
    throw new ProsthesisApiError(await readErrorDetail(res), res.status);
  }

  const body = (await res.json()) as GenerateResult;
  if (!body?.download_url) {
    throw new ProsthesisApiError("El servidor no devolvió el modelo generado.");
  }
  return { ...body, download_url: resolveModelUrl(body.download_url) };
}

/**
 * Solo calcula la geometría del socket (no genera STL ni guarda nada).
 * Lo usamos para dibujar la prótesis con las medidas reales si la
 * generación del STL falla.
 */
export async function calculateSocketParameters(
  payload: ProsthesisRequestPayload
): Promise<SocketParameters> {
  const res = await fetchWithTimeout(
    `${API_URL}/prosthesis/socket/parameters`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    REQUEST_TIMEOUT_MS
  );

  if (!res.ok) {
    throw new ProsthesisApiError(await readErrorDetail(res), res.status);
  }

  return res.json();
}
