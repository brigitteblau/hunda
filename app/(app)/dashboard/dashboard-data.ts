// Tipos y constantes del home (dashboard).
// Los datos reales salen de la tabla `perros` de Supabase: mirá armar-dashboard.ts.

export const ETAPAS = ["Medidas", "Diseño", "Impresión", "Entrega"] as const;
export type Etapa = (typeof ETAPAS)[number];

export type EstadoProtesis = "En espera" | "Lista para imprimir" | "En revisión";

export interface PerroResumen {
  id: string;
  nombre: string;
  fotoUrl: string | null;
}

/** Todavía no existe en la base: queda listo para cuando haya tabla de turnos. */
export interface Taller {
  nombre: string;
  distancia: string;
  turno: string | null;
}

export interface ArchivoProtesis {
  nombre: string;
  /** URL de descarga del .stl. Si es null el botón queda deshabilitado. */
  url: string | null;
}

export interface Protesis {
  /** Es el id del perro: hoy hay una prótesis (la más reciente) por perro */
  id: string;
  perroId: string;
  perro: string;
  fotoUrl: string | null;
  raza: string | null;
  nombre: string;
  /** Frase lista para mostrar, ej: "creada el 12 de agosto" */
  creada: string;
  estado: EstadoProtesis;
  etapa: Etapa;
  /** Línea informativa de la tarjeta "en proceso" */
  aviso: string;
  taller: Taller | null;
  archivo: ArchivoProtesis | null;
  /** Adónde lleva "Ver detalles" / "Ver diseño" */
  href: string;
}

export type TipoActividad = "medidas" | "diseno" | "impresion" | "perro";
export type IconoActividad =
  | "regla"
  | "impresora"
  | "mas"
  | "patita"
  | "reloj"
  | "pin"
  | "check";

export interface Actividad {
  id: string;
  /** Encabezado de grupo: "Hoy", "Ayer", "Esta semana", "12 de agosto" */
  grupo: string;
  titulo: string;
  detalle: string;
  icono: IconoActividad;
  tipo: TipoActividad;
  perroId: string;
  perro: string;
  fotoUrl: string | null;
  /** Hora para el pop up: "09:42" o "Mié 14:20" */
  hora: string;
  /** Etiqueta corta para el resumen del home: "09:42", "Ayer", "12 oct" */
  corto: string;
  estado?: EstadoProtesis;
}

export interface DashboardData {
  perros: PerroResumen[];
  protesis: Protesis[];
  actividad: Actividad[];
}
