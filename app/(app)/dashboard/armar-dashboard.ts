// Convierte los perros guardados en Supabase en lo que muestra el home.
//
// Qué sabe hoy la base (tabla `perros`): nombre, raza, peso, foto, si hay un
// pedido de prótesis (request_id), si el archivo ya se generó y cuándo se
// cargó el perro. Con eso se arma:
//   - prótesis "Lista para imprimir": protesis_generada = true
//   - prótesis "En espera": hay pedido pero el archivo todavía no se generó
//   - actividad: "Sumaste a X", "Creaste una prótesis", "Está lista" (con la
//     fecha de alta del perro, porque no se guarda cuándo pasó cada cosa)
// Taller, turno, material y tiempos de impresión no están en la base, por eso
// no se muestran.

import { fileNameFor, type Perro } from "../mis-perros/perro-data";
import type { Actividad, DashboardData, Protesis } from "./dashboard-data";

// Fijamos la zona para que el servidor y el navegador muestren lo mismo.
const ZONA = "America/Argentina/Buenos_Aires";
const MS_DIA = 86_400_000;

function formato(fecha: Date, opciones: Intl.DateTimeFormatOptions, idioma = "es-AR") {
  return new Intl.DateTimeFormat(idioma, { timeZone: ZONA, ...opciones }).format(fecha);
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function diaLocal(fecha: Date) {
  return formato(fecha, { year: "numeric", month: "2-digit", day: "2-digit" }, "en-CA");
}

function diasAtras(fecha: Date, ahora: Date) {
  const a = Date.parse(`${diaLocal(ahora)}T00:00:00Z`);
  const b = Date.parse(`${diaLocal(fecha)}T00:00:00Z`);
  return Math.round((a - b) / MS_DIA);
}

function hora(fecha: Date) {
  return formato(fecha, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

function fechaLarga(fecha: Date, ahora: Date) {
  const base = formato(fecha, { day: "numeric", month: "long" });
  const anio = formato(fecha, { year: "numeric" });
  return anio === formato(ahora, { year: "numeric" }) ? base : `${base} de ${anio}`;
}

function fechaCorta(fecha: Date) {
  return formato(fecha, { day: "numeric", month: "short" }).replace(".", "");
}

function etiquetas(fecha: Date, ahora: Date) {
  const dias = diasAtras(fecha, ahora);

  if (dias <= 0) {
    return { grupo: "Hoy", hora: hora(fecha), corto: hora(fecha), creada: "creada hoy" };
  }
  if (dias === 1) {
    return { grupo: "Ayer", hora: hora(fecha), corto: "Ayer", creada: "creada ayer" };
  }

  const creada = `creada el ${fechaLarga(fecha, ahora)}`;
  if (dias < 7) {
    const diaSemana = capitalizar(formato(fecha, { weekday: "short" }).replace(".", ""));
    return {
      grupo: "Esta semana",
      hora: `${diaSemana} ${hora(fecha)}`,
      corto: fechaCorta(fecha),
      creada,
    };
  }
  return { grupo: fechaLarga(fecha, ahora), hora: hora(fecha), corto: fechaCorta(fecha), creada };
}

function detallePerro(p: Perro) {
  const partes = [p.raza ?? "Raza sin cargar"];
  if (p.pesoKg !== null) partes.push(`${String(p.pesoKg).replace(".", ",")} kg`);
  return partes.join(" · ");
}

export function armarDashboard(perros: Perro[], ahora: Date = new Date()): DashboardData {
  const protesis: Protesis[] = [];
  const eventos: { ts: number; orden: number; actividad: Actividad }[] = [];

  for (const p of perros) {
    const fecha = new Date(p.createdAt);
    const ts = fecha.getTime();
    const et = etiquetas(fecha, ahora);
    const base = {
      perroId: p.id,
      perro: p.nombre,
      fotoUrl: p.fotoUrl,
      grupo: et.grupo,
      hora: et.hora,
      corto: et.corto,
    };

    eventos.push({
      ts,
      orden: 0,
      actividad: {
        ...base,
        id: `${p.id}-perro`,
        titulo: `Sumaste a ${p.nombre} a Mis perros`,
        detalle: detallePerro(p),
        icono: "patita",
        tipo: "perro",
      },
    });

    const tienePedido = Boolean(p.requestId) || p.protesisGenerada;
    if (!tienePedido) continue;

    eventos.push({
      ts,
      orden: 1,
      actividad: {
        ...base,
        id: `${p.id}-pedido`,
        titulo: `Creaste una nueva prótesis para ${p.nombre}`,
        detalle: "Con las medidas que cargaste",
        icono: "mas",
        tipo: "diseno",
      },
    });

    if (p.protesisGenerada) {
      eventos.push({
        ts,
        orden: 2,
        actividad: {
          ...base,
          id: `${p.id}-lista`,
          titulo: `La prótesis de ${p.nombre} está lista para imprimir`,
          detalle: "Ya podés elegir dónde imprimirla",
          icono: "impresora",
          tipo: "impresion",
          estado: "Lista para imprimir",
        },
      });
    }

    protesis.push({
      id: p.id,
      perroId: p.id,
      perro: p.nombre,
      fotoUrl: p.fotoUrl,
      raza: p.raza,
      nombre: "Prótesis",
      creada: et.creada,
      estado: p.protesisGenerada ? "Lista para imprimir" : "En espera",
      etapa: p.protesisGenerada ? "Impresión" : "Diseño",
      aviso: p.protesisGenerada
        ? "Ya podés elegir dónde imprimirla"
        : "Todavía no se generó el archivo. Podés reintentarlo desde Mis perros.",
      taller: null,
      archivo: p.protesisGenerada
        ? { nombre: fileNameFor(p), url: p.downloadUrl }
        : null,
      href: `/mis-perros/${p.id}`,
    });
  }

  // Lo más nuevo primero; si dos cosas pasaron a la vez, la última del flujo arriba.
  eventos.sort((a, b) => b.ts - a.ts || b.orden - a.orden);

  return {
    perros: perros.map((p) => ({ id: p.id, nombre: p.nombre, fotoUrl: p.fotoUrl })),
    protesis,
    actividad: eventos.map((e) => e.actividad),
  };
}
