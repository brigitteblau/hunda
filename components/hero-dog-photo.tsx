"use client";

import { useState } from "react";
import { Caveat } from "next/font/google";
import { PawPrint } from "lucide-react";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

// Reemplazá /public/hero-dog.jpg por la foto real (ideal: ≥1600px de ancho,
// formato apaisado ~4:5 o más ancho) — se usa tal cual, sin recortes forzados.
const HERO_IMAGE_SRC = "/hero-dog.jpg";

export default function HeroDogPhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-white/3">
      <div
        className="pointer-events-none absolute -inset-10 opacity-25 blur-[80px]"
        style={{ background: "radial-gradient(circle, #41C086, transparent 65%)" }}
      />

      {!failed ? (
        <img
          src={HERO_IMAGE_SRC}
          alt="Perro corriendo felizmente con su prótesis hunda."
          onError={() => setFailed(true)}
          className="animate-kenburns relative h-full w-full object-cover"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 text-center px-8">
          <PawPrint size={28} className="text-white/15" />
          <p className="text-xs text-white/25 max-w-[220px]">
            Colocá la foto en <code className="text-white/35">public/hero-dog.jpg</code>
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6 flex items-center gap-2">
        <span
          className={`${caveat.className} text-3xl text-white leading-none`}
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
        >
          más momentos juntos
        </span>
        <span className="text-[#41C086] text-2xl leading-none">♥</span>
      </div>
    </div>
  );
}
