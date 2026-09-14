const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://bbm-server-hfq1.onrender.com";

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
  const res = await fetch(`${API_URL}/prosthesis/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new ProsthesisApiError(await readErrorDetail(res), res.status);
  }

  return res.json();
}

export async function generateProsthesis(requestId: string): Promise<GenerateResult> {
  const res = await fetch(`${API_URL}/prosthesis/requests/${requestId}/generate`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new ProsthesisApiError(await readErrorDetail(res), res.status);
  }

  return res.json();
}
