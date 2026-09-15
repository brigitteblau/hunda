"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Fondo animado tipo "plasma" en el verde de marca, con ruido suave (fbm)
// y una leve reacción al mouse. Todo corre en la GPU vía three.js.
const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uMouse;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;

    vec2 mouseInfluence = (uMouse - 0.5) * 0.25;
    float t = uTime * 0.045;

    float n1 = fbm(p * 2.2 + vec2(t * 1.3, -t) + mouseInfluence);
    float n2 = fbm(p * 3.1 - vec2(t * 0.7, t * 0.5) + n1 * 0.6);
    float field = fbm(p * 1.6 + n2 * 1.4 + t);
    field = field * 0.5 + 0.5;

    vec3 deep = vec3(0.043, 0.059, 0.051);
    vec3 mid = vec3(0.058, 0.14, 0.1);
    vec3 glow = vec3(0.255, 0.753, 0.525);

    vec3 color = mix(deep, mid, smoothstep(0.4, 0.82, field));
    color = mix(color, glow, smoothstep(0.8, 1.05, field) * 0.55);

    float vign = smoothstep(1.3, 0.2, length(uv - 0.5));
    color *= mix(0.35, 1.0, vign);

    float grain = (hash(uv * uResolution.xy + uTime).x) * 0.015;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ShaderBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    function resize() {
      const { clientWidth, clientHeight } = mount!;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.uResolution.value.set(clientWidth, clientHeight);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let targetMouse = { x: 0.5, y: 0.5 };
    function onPointerMove(e: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      targetMouse = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    }
    window.addEventListener("pointermove", onPointerMove);

    let raf = 0;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = (now - start) / 1000;
      uniforms.uTime.value = prefersReducedMotion ? elapsed * 0.15 : elapsed;
      uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.03;
      uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      material.dispose();
      quad.geometry.dispose();
      mount!.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:block"
    />
  );
}
