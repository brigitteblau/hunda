"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RotateCcw, Loader2, Move3d } from "lucide-react";
import { buildSocketGeometry } from "@/lib/socket-geometry";
import type { SocketParameters } from "@/lib/prosthesis-api";

export type ModelSource =
  | { type: "url"; url: string }
  | { type: "params"; params: SocketParameters };

interface StlViewerProps {
  source: ModelSource;
  className?: string;
}

const CREASE_ANGLE = THREE.MathUtils.degToRad(35);

// Cada exportador usa un "arriba" distinto (Blender: Z, otros: Y). Un socket
// siempre es más largo que ancho, así que ponemos el eje más largo vertical
// y dejamos la boca (el extremo más ancho) hacia arriba.
function orientUpright(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const size = geometry.boundingBox!.getSize(new THREE.Vector3());
  if (size.z >= size.x && size.z >= size.y) geometry.rotateX(-Math.PI / 2);
  else if (size.x >= size.y && size.x >= size.z) geometry.rotateZ(Math.PI / 2);

  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const center = box.getCenter(new THREE.Vector3());
  const h = box.max.y - box.min.y;
  const pos = geometry.attributes.position;
  let top = 0;
  let bottom = 0;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const r = Math.hypot(pos.getX(i) - center.x, pos.getZ(i) - center.z);
    if (y > box.max.y - h * 0.15) top = Math.max(top, r);
    else if (y < box.min.y + h * 0.15) bottom = Math.max(bottom, r);
  }
  if (bottom > top * 1.05) geometry.rotateX(Math.PI);
}

export default function StlViewer({ source, className = "" }: StlViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [interacted, setInteracted] = useState(false);

  // Clave estable para no recrear la escena en cada render del padre.
  const sourceKey = source.type === "url" ? source.url : JSON.stringify(source.params);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setProgress(null);
    setError(null);

    const width = () => Math.max(container.clientWidth, 1);
    const height = () => Math.max(container.clientHeight, 1);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width() / height(), 0.1, 5000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Iluminación de estudio: reflejos suaves del entorno + key light con sombra
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.radius = 6;
    key.shadow.bias = -0.0005;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x41c086, 1.1);
    scene.add(rim);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.45 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI * 0.62;
    controlsRef.current = controls;
    setAutoRotate(true);
    const onStart = () => setInteracted(true);
    controls.addEventListener("start", onStart);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xc9d4ce,
      roughness: 0.42,
      envMapIntensity: 0.75,
      metalness: 0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.4,
      sheen: 0.25,
      sheenColor: new THREE.Color(0x41c086),
      side: THREE.DoubleSide,
    });

    let mesh: THREE.Mesh | null = null;
    let raf = 0;
    let disposed = false;
    let introStart = 0;

    function mountGeometry(geometry: THREE.BufferGeometry) {
      mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Apoyamos la pieza sobre el piso y la centramos en XZ
      geometry.computeBoundingBox();
      const box = geometry.boundingBox!;
      const center = box.getCenter(new THREE.Vector3());
      geometry.translate(-center.x, -box.min.y, -center.z);
      geometry.computeBoundingSphere();

      const size = box.getSize(new THREE.Vector3());
      const radius = geometry.boundingSphere?.radius ?? 50;
      const target = new THREE.Vector3(0, size.y / 2, 0);

      const fov = THREE.MathUtils.degToRad(camera.fov);
      const distance = (radius / Math.sin(fov / 2)) * 1.35;
      camera.position.set(distance * 0.55, size.y / 2 + distance * 0.38, distance * 0.75);
      camera.near = radius / 100;
      camera.far = distance * 20;
      camera.updateProjectionMatrix();
      controls.target.copy(target);
      controls.minDistance = radius * 1.2;
      controls.maxDistance = distance * 3;
      controls.update();

      key.position.set(radius * 2, radius * 4, radius * 2.5);
      key.target.position.copy(target);
      scene.add(key.target);
      const cam = key.shadow.camera;
      cam.left = cam.bottom = -radius * 2;
      cam.right = cam.top = radius * 2;
      cam.near = radius * 0.5;
      cam.far = radius * 12;
      cam.updateProjectionMatrix();
      key.shadow.normalBias = radius * 0.01;
      rim.position.set(-radius * 3, radius * 1.5, -radius * 3);

      ground.scale.setScalar(radius * 10);

      mesh.scale.setScalar(0.001);
      scene.add(mesh);
      introStart = performance.now();
      setLoading(false);
    }

    if (source.type === "params") {
      mountGeometry(buildSocketGeometry(source.params));
    } else {
      new STLLoader().load(
        source.url,
        (raw) => {
          if (disposed) return;
          orientUpright(raw);
          // Suaviza superficies curvas sin redondear las aristas vivas
          const geometry = toCreasedNormals(raw, CREASE_ANGLE);
          if (geometry !== raw) raw.dispose();
          mountGeometry(geometry);
        },
        (e) => {
          if (!disposed && e.lengthComputable && e.total > 0) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        },
        () => {
          if (!disposed) {
            setError("No pudimos cargar el modelo 3D.");
            setLoading(false);
          }
        }
      );
    }

    const resizeObserver = new ResizeObserver(() => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    });
    resizeObserver.observe(container);

    function animate() {
      raf = requestAnimationFrame(animate);
      if (mesh && introStart) {
        const t = Math.min((performance.now() - introStart) / 900, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        mesh.scale.setScalar(Math.max(eased, 0.001));
        mesh.rotation.y = (1 - eased) * -Math.PI * 0.6;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      controls.removeEventListener("start", onStart);
      controls.dispose();
      mesh?.geometry.dispose();
      material.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // sourceKey resume `source`, así no dependemos de la identidad del objeto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceKey]);

  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(65,192,134,0.14), transparent 70%)",
        }}
      />
      <div ref={containerRef} className="relative h-full w-full cursor-grab active:cursor-grabbing" />

      {loading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0F0D]/80 text-sm text-white/45">
          <Loader2 className="h-5 w-5 animate-spin text-[#41C086]" />
          <span>Cargando modelo{progress !== null ? ` · ${progress}%` : "..."}</span>
          {progress !== null && (
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#41C086] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0B0F0D]/90 text-center text-sm text-white/40 px-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && !interacted && (
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] text-white/55 backdrop-blur">
          <Move3d size={13} />
          Arrastrá para rotar · scroll para zoom
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          const controls = controlsRef.current;
          if (!controls) return;
          controls.autoRotate = !controls.autoRotate;
          setAutoRotate(controls.autoRotate);
        }}
        title={autoRotate ? "Pausar rotación" : "Reanudar rotación"}
        aria-pressed={autoRotate}
        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
          autoRotate
            ? "border-[#41C086]/40 bg-[#41C086]/15 text-[#41C086]"
            : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
        }`}
      >
        <RotateCcw size={15} />
      </button>
    </div>
  );
}
