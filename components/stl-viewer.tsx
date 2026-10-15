"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RotateCcw, Loader2, Move3d, Pause, Play } from "lucide-react";
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
const AUTO_ROTATE_SPEED = 0.5; // rad/s

// Cada exportador usa un "arriba" distinto (Blender: Z, otros: Y). La pieza
// es más alta que ancha, así que ponemos el eje más largo vertical. Para el
// caso Blender, rotateX(-π/2) lleva +Z a +Y: la boca del socket queda arriba
// y el pie abajo. (No adivinamos por el ancho: el pie de la bota es más ancho
// que la boca y eso la daba vuelta.)
function orientUpright(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const size = geometry.boundingBox!.getSize(new THREE.Vector3());
  if (size.z >= size.x && size.z >= size.y) geometry.rotateX(-Math.PI / 2);
  else if (size.x >= size.y && size.x >= size.z) geometry.rotateZ(Math.PI / 2);
}

export default function StlViewer({ source, className = "" }: StlViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef(true);
  const resetViewRef = useRef<() => void>(() => {});
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

    // Trackball: rota libre en todos los ejes (Orbit no deja pasar por arriba/abajo)
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 3;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.6;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.12;
    autoRotateRef.current = true;
    setAutoRotate(true);

    // La auto-rotación gira la pieza (no la cámara) y se pausa mientras arrastrás
    let dragging = false;
    const onStart = () => {
      dragging = true;
      setInteracted(true);
    };
    const onEnd = () => {
      dragging = false;
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);

    const home = { target: new THREE.Vector3(), position: new THREE.Vector3() };

    // Pivote en el centro de la pieza, para que gire sobre sí misma
    const pivot = new THREE.Group();
    scene.add(pivot);

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
      controls.maxDistance = radius * 6;
      controls.update();
      // Guardamos esta vista como la de "resetear vista"
      home.target.copy(controls.target);
      home.position.copy(camera.position);

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

      pivot.position.copy(target);
      mesh.position.set(0, -size.y / 2, 0);
      pivot.scale.setScalar(0.001);
      pivot.add(mesh);
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
      controls.handleResize();
    });
    resizeObserver.observe(container);

    resetViewRef.current = () => {
      controls.target.copy(home.target);
      camera.position.copy(home.position);
      camera.up.set(0, 1, 0);
      camera.lookAt(home.target);
      pivot.rotation.set(0, 0, 0);
      controls.update();
    };
    const onDoubleClick = () => resetViewRef.current();
    renderer.domElement.addEventListener("dblclick", onDoubleClick);

    let last = performance.now();
    function animate() {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (mesh && introStart) {
        const t = Math.min((now - introStart) / 900, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        pivot.scale.setScalar(Math.max(eased, 0.001));
        mesh.rotation.y = (1 - eased) * -Math.PI * 0.6;
      }
      if (mesh && autoRotateRef.current && !dragging) {
        pivot.rotation.y += AUTO_ROTATE_SPEED * dt;
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
      controls.removeEventListener("end", onEnd);
      renderer.domElement.removeEventListener("dblclick", onDoubleClick);
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
      <div ref={containerRef} className="relative h-full w-full cursor-grab touch-none active:cursor-grabbing" />

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
          Arrastrá para girar · doble click para resetear
        </div>
      )}

      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          onClick={() => resetViewRef.current()}
          title="Resetear vista (o doble click)"
          aria-label="Resetear vista"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur transition hover:bg-white/10"
        >
          <RotateCcw size={15} />
        </button>
        <button
          type="button"
          onClick={() => {
            autoRotateRef.current = !autoRotateRef.current;
            setAutoRotate(autoRotateRef.current);
          }}
          title={autoRotate ? "Pausar rotación" : "Reanudar rotación"}
          aria-pressed={autoRotate}
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
            autoRotate
              ? "border-[#41C086]/40 bg-[#41C086]/15 text-[#41C086]"
              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          {autoRotate ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>
    </div>
  );
}
