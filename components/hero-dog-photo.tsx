"use client";

import { useState } from "react";
import { Caveat } from "next/font/google";
import { PawPrint } from "lucide-react";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const HERO_IMAGE_SRC = "/hero-dog.jpg";

export default function HeroDogPhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#0B0F0D]">
      {!failed ? (
        <img
          src={HERO_IMAGE_SRC}
          alt="Perro corriendo felizmente con una prótesis Hunda."
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-center scale-[1.01]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#101713] px-8 text-center">
          <PawPrint size={32} className="text-white/20" />
          <p className="max-w-[260px] text-sm text-white/35">
            Colocá la fotografía principal en{" "}
            <code className="text-white/55">public/hero-dog.jpg</code>
          </p>
        </div>
      )}

      {/* Oscurecimiento general */}
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      {/* Degradado para legibilidad del contenido */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#07100B]/95 via-[#07100B]/65 to-transparent" />

      {/* Degradado inferior para integrar la hero con el sitio */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0B0F0D] via-transparent to-black/15" />

      {/* Glow de marca */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[520px] w-[520px] rounded-full opacity-[0.12] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #41C086 0%, transparent 68%)",
        }}
      />

      {/* Firma emocional */}
      <div className="absolute bottom-8 right-6 hidden items-center gap-2 sm:right-10 md:flex lg:right-16">
        <span
          className={`${caveat.className} text-[28px] leading-none text-white/90 lg:text-[32px]`}
          style={{
            textShadow: "0 2px 16px rgba(0,0,0,0.55)",
          }}
        >
          más momentos juntos
        </span>

        <span className="text-xl leading-none text-[#41C086]">♥</span>
      </div>
    </div>
  );
}