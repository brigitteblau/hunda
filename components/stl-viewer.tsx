"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCcw, Loader2 } from "lucide-react";

interface StlViewerProps {
  url: string;
  className?: string;
}

export default function StlViewer({ url, className = "" }: StlViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setError(null);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 2.2);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(1, 1.5, 1);
    scene.add(dir);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dir2.position.set(-1, -0.5, -1);
    scene.add(dir2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.2;
    controlsRef.current = controls;

    let mesh: THREE.Mesh | null = null;
    let raf = 0;
    let disposed = false;

    const loader = new STLLoader();
    loader.load(
      url,
      (geometry) => {
        if (disposed) return;
        geometry.computeVertexNormals();
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
          color: 0x41c086,
          metalness: 0.15,
          roughness: 0.45,
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        geometry.computeBoundingSphere();
        const radius = geometry.boundingSphere?.radius ?? 50;
        const distance = radius * 2.6;
        camera.position.set(distance * 0.6, distance * 0.5, distance);
        camera.near = radius / 100;
        camera.far = radius * 20;
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.update();

        setLoading(false);
      },
      undefined,
      () => {
        if (!disposed) {
          setError("No pudimos cargar el modelo 3D.");
          setLoading(false);
        }
      }
    );

    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    function animate() {
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (mesh) {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [url]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="h-full w-full" />

      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#0B0F0D]/80 text-sm text-white/40">
          <Loader2 className="h-4 w-4 animate-spin" />
          Cargando modelo...
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0B0F0D]/90 text-center text-sm text-white/40 px-4">
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (controlsRef.current) controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
        }}
        title="Pausar/reanudar rotación"
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur text-white/70 hover:bg-white/10 transition"
      >
        <RotateCcw size={15} />
      </button>
    </div>
  );
}
