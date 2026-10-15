import * as THREE from "three";
import type { SocketParameters } from "@/lib/prosthesis-api";

// Arma un socket de prótesis a partir de los parámetros que calcula el back
// (/prosthesis/socket/parameters). Se usa cuando la generación del STL falla:
// así igual mostramos la pieza con las medidas reales del perro en vez de un
// modelo genérico. Unidades: mm (lo mismo que espera un slicer al imprimir).

const CM_TO_MM = 10;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function buildSocketGeometry(params: SocketParameters): THREE.BufferGeometry {
  const h = params.height_cm * CM_TO_MM;
  const rTop = params.top_radius_cm * CM_TO_MM;
  const rBottom = params.bottom_radius_cm * CM_TO_MM;
  const wall = Math.max(params.wall_thickness_cm * CM_TO_MM, 1.5);
  const rConn = Math.min(params.connector_radius_cm * CM_TO_MM, rBottom * 0.9);
  const connLength = Math.max(rConn * 1.6, 12);
  const baseThickness = wall * 1.6;

  // Perfil que se revoluciona alrededor del eje Y. Recorre la pieza "por
  // fuera": desde el centro del conector, sube por la pared exterior, pasa por
  // el labio redondeado y baja por la pared interior hasta el centro del fondo.
  const pts: THREE.Vector2[] = [];
  const radiusAt = (t: number) => rBottom + (rTop - rBottom) * smoothstep(t);

  // Conector (donde se encastra el pylon) con chaflán abajo
  const chamfer = Math.min(2, rConn * 0.2);
  pts.push(new THREE.Vector2(0, -connLength));
  pts.push(new THREE.Vector2(rConn - chamfer, -connLength));
  pts.push(new THREE.Vector2(rConn, -connLength + chamfer));
  pts.push(new THREE.Vector2(rConn, -baseThickness * 0.6));

  // Filete entre conector y fondo del socket
  const filletSteps = 6;
  for (let i = 1; i <= filletSteps; i++) {
    const a = (i / filletSteps) * (Math.PI / 2);
    const r = rConn + (rBottom * 0.85 - rConn) * (1 - Math.cos(a));
    const y = -baseThickness * 0.6 + baseThickness * 0.6 * Math.sin(a);
    pts.push(new THREE.Vector2(r, y));
  }

  // Fondo redondeado hacia la pared exterior
  const bottomSteps = 8;
  for (let i = 1; i <= bottomSteps; i++) {
    const a = (i / bottomSteps) * (Math.PI / 2);
    const r = rBottom * 0.85 + rBottom * 0.15 * Math.sin(a);
    const y = wall * (1 - Math.cos(a));
    pts.push(new THREE.Vector2(r, y));
  }

  // Pared exterior con transición suave (no un cono recto)
  const wallSteps = 24;
  for (let i = 1; i <= wallSteps; i++) {
    const t = i / wallSteps;
    pts.push(new THREE.Vector2(radiusAt(t), wall + (h - wall) * t));
  }

  // Labio redondeado arriba (no corta al tocar la pata)
  const lipSteps = 10;
  for (let i = 1; i < lipSteps; i++) {
    const a = (i / lipSteps) * Math.PI;
    pts.push(new THREE.Vector2(rTop - wall / 2 + (wall / 2) * Math.cos(a), h + (wall / 2) * Math.sin(a)));
  }

  // Pared interior bajando
  for (let i = wallSteps; i >= 0; i--) {
    const t = i / wallSteps;
    const y = baseThickness + (h - baseThickness) * t;
    pts.push(new THREE.Vector2(Math.max(radiusAt(t) - wall, wall), y));
  }

  // Fondo interior cóncavo
  const innerSteps = 8;
  const rInnerBottom = Math.max(rBottom - wall, wall);
  for (let i = 1; i <= innerSteps; i++) {
    const a = (i / innerSteps) * (Math.PI / 2);
    pts.push(new THREE.Vector2(rInnerBottom * Math.cos(a), baseThickness - wall * 0.5 * Math.sin(a)));
  }

  // LatheGeometry ya calcula normales suaves y respeta la costura.
  return new THREE.LatheGeometry(pts, 128);
}
