// Los formularios públicos todavía no tienen backend: arman un mail ya redactado.
// Cuando haya tabla/endpoint, reemplazar `abrirMail` por el envío real.

export const EMAIL_CONTACTO = "betterbm26@gmail.com";

export function abrirMail(asunto: string, lineas: [string, string][]) {
  const cuerpo = lineas
    .filter(([, valor]) => valor.trim() !== "")
    .map(([etiqueta, valor]) => `${etiqueta}: ${valor}`)
    .join("\n");

  window.location.href = `mailto:${EMAIL_CONTACTO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
