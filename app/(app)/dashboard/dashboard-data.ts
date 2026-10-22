// Datos de ejemplo del home (dashboard).
// TODO: reemplazar por consultas a Supabase cuando existan las tablas de
// prótesis, puntos de impresión e historial de actividad.

export const ETAPAS = ["Medidas", "Diseño", "Impresión", "Entrega"] as const;
export type Etapa = (typeof ETAPAS)[number];

export type EstadoProtesis = "En espera" | "Lista para imprimir" | "En revisión";

export interface Taller {
  nombre: string;
  distancia: string;
  turno: string | null;
}

export interface ArchivoProtesis {
  nombre: string;
  tamano: string;
  material: string;
  tiempo: string;
  relleno: string;
  /** URL de descarga del .stl. Si es null el botón queda deshabilitado. */
  url: string | null;
}

export interface Protesis {
  id: string;
  perro: string;
  fotoUrl: string | null;
  raza: string;
  /** Ej: "Prótesis delantera izquierda" */
  nombre: string;
  tipo: "Adaptativa" | "A medida";
  /** Frase lista para mostrar, ej: "creada el 12 de agosto" */
  creada: string;
  version: number;
  estado: EstadoProtesis;
  etapa: Etapa;
  /** Línea informativa de la tarjeta "en proceso" */
  aviso: string;
  taller: Taller | null;
  archivo: ArchivoProtesis | null;
  /** Adónde lleva "Ver detalles" / "Ver diseño" */
  href: string;
}

export interface PerroResumen {
  nombre: string;
  fotoUrl: string | null;
}

export const perros: PerroResumen[] = [
  { nombre: "Milo", fotoUrl: null },
  { nombre: "Luna", fotoUrl: null },
];

export const protesis: Protesis[] = [
  {
    id: "p1",
    perro: "Milo",
    fotoUrl: null,
    raza: "Golden Retriever",
    nombre: "Prótesis delantera izquierda",
    tipo: "Adaptativa",
    creada: "creada el 12 de agosto",
    version: 2,
    estado: "En espera",
    etapa: "Impresión",
    aviso: "Turno de impresión: jueves 23/10, 15 h",
    taller: {
      nombre: "Taller Maker Belgrano",
      distancia: "1,2 km",
      turno: "Jueves 23/10 · 15:00 h",
    },
    archivo: null,
    href: "/mis-perros",
  },
  {
    id: "p2",
    perro: "Luna",
    fotoUrl: null,
    raza: "West Highland White Terrier",
    nombre: "Protector de muñón",
    tipo: "A medida",
    creada: "creado ayer",
    version: 1,
    estado: "En revisión",
    etapa: "Diseño",
    aviso: "Un veterinario está revisando las medidas",
    taller: null,
    archivo: null,
    href: "/mis-perros",
  },
  {
    id: "p3",
    perro: "Luna",
    fotoUrl: null,
    raza: "West Highland White Terrier",
    nombre: "Prótesis trasera derecha",
    tipo: "Adaptativa",
    creada: "creada el 10 de octubre",
    version: 1,
    estado: "Lista para imprimir",
    etapa: "Impresión",
    aviso: "Ya podés elegir dónde imprimirla",
    taller: null,
    archivo: {
      nombre: "protesis_luna_trasera.stl",
      tamano: "4,2 MB",
      material: "PLA o TPU",
      tiempo: "6 h aprox.",
      relleno: "30 %",
      url: null,
    },
    href: "/mis-perros",
  },
];

export const protesisEnProceso = protesis.filter(
  (p) => p.estado !== "Lista para imprimir"
);
export const protesisListas = protesis.filter(
  (p) => p.estado === "Lista para imprimir"
);
export const proximasImpresiones = protesis.filter(
  (p) => p.estado === "En espera" || p.estado === "Lista para imprimir"
);

export interface PuntoImpresion {
  id: string;
  nombre: string;
  detalle: string;
}

export const puntosCercanos: PuntoImpresion[] = [
  { id: "maker", nombre: "Taller Maker Belgrano", detalle: "1,2 km · Abierto hasta las 19 h" },
  { id: "fablab", nombre: "FabLab ORT", detalle: "2,0 km · Lunes a viernes" },
  { id: "vet", nombre: "Veterinaria San Roque", detalle: "3,4 km · Imprime con turno" },
];

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
  perro: string;
  hora: string;
  estado?: EstadoProtesis;
  /** Si existe, la actividad aparece en el resumen del home con esta etiqueta */
  resumen?: string;
}

export const actividad: Actividad[] = [
  {
    id: "a1",
    grupo: "Hoy",
    titulo: "Actualizaste las medidas de Milo",
    detalle: "Longitud y contornos del muñón",
    icono: "regla",
    tipo: "medidas",
    perro: "Milo",
    hora: "09:42",
    resumen: "09:42",
  },
  {
    id: "a2",
    grupo: "Hoy",
    titulo: "La prótesis de Luna está lista para imprimir",
    detalle: "Ya podés elegir dónde imprimirla",
    icono: "impresora",
    tipo: "impresion",
    perro: "Luna",
    hora: "08:15",
    estado: "Lista para imprimir",
  },
  {
    id: "a3",
    grupo: "Ayer",
    titulo: "Creaste una nueva prótesis para Luna",
    detalle: "Prótesis trasera derecha · Adaptativa",
    icono: "mas",
    tipo: "diseno",
    perro: "Luna",
    hora: "18:30",
    resumen: "Ayer",
  },
  {
    id: "a4",
    grupo: "Ayer",
    titulo: "Sumaste a Luna a Mis perros",
    detalle: "West Highland White Terrier · 4 años",
    icono: "patita",
    tipo: "perro",
    perro: "Luna",
    hora: "11:02",
  },
  {
    id: "a5",
    grupo: "Esta semana",
    titulo: 'La prótesis de Milo pasó a "En espera"',
    detalle: "Esperando turno de impresión",
    icono: "reloj",
    tipo: "impresion",
    perro: "Milo",
    hora: "Mié 14:20",
    estado: "En espera",
  },
  {
    id: "a6",
    grupo: "Esta semana",
    titulo: "Elegiste Taller Maker Belgrano",
    detalle: "Punto de impresión a 1,2 km",
    icono: "pin",
    tipo: "impresion",
    perro: "Milo",
    hora: "Lun 10:05",
  },
  {
    id: "a7",
    grupo: "12 de agosto",
    titulo: "Completaste el diseño de la prótesis de Milo",
    detalle: "Prótesis delantera izquierda",
    icono: "check",
    tipo: "diseno",
    perro: "Milo",
    hora: "16:48",
    resumen: "12 ago",
  },
];

/** Total de actividades en el historial (para "Mostrando 7 de 24"). */
export const ACTIVIDAD_TOTAL = 24;

export function fotoDePerro(nombre: string): string | null {
  return perros.find((p) => p.nombre === nombre)?.fotoUrl ?? null;
}
