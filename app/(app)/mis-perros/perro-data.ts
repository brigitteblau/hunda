// Tipos y helpers compartidos entre server y client components.

import { resolveModelUrl } from "@/lib/prosthesis-api";

export interface Perro {
  id: string;
  nombre: string;
  raza: string | null;
  pesoKg: number | null;
  fotoUrl: string | null;
  requestId: string | null;
  protesisGenerada: boolean;
  downloadUrl: string | null;
  createdAt: string;
}

export const PERRO_COLUMNS =
  "id, nombre, raza, peso_kg, foto_url, request_id, protesis_generada, protesis_download_url, created_at";

export interface PerroRow {
  id: string;
  nombre: string;
  raza: string | null;
  peso_kg: number | string | null;
  foto_url: string | null;
  request_id: string | null;
  protesis_generada: boolean;
  protesis_download_url: string | null;
  created_at: string;
}

export function toPerro(row: PerroRow): Perro {
  return {
    id: row.id,
    nombre: row.nombre,
    raza: row.raza,
    pesoKg: row.peso_kg === null ? null : Number(row.peso_kg),
    fotoUrl: row.foto_url,
    requestId: row.request_id,
    protesisGenerada: row.protesis_generada,
    // URLs viejas pueden apuntar directo al back: las pasamos por el proxy
    downloadUrl: row.protesis_download_url ? resolveModelUrl(row.protesis_download_url) : null,
    createdAt: row.created_at,
  };
}

export function fileNameFor(perro: Pick<Perro, "nombre">) {
  const slug = perro.nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `protesis-${slug || "perro"}.stl`;
}
