"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Plataforma", href: "#plataforma" },
  { label: "FAQ", href: "#impresion-3d" },
  { label: "Contacto", href: "/contact" },
];

export default function LandingNavbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  return (
    <motion.nav
  initial={{ opacity: 0, y: -20 }}
  animate={{
    opacity: 1,
    y: 0,
    paddingTop: scrolled ? 8 : 12,
    paddingBottom: scrolled ? 8 : 12,
    marginTop: scrolled ? 8 : 16,
    backgroundColor: scrolled ? "rgba(47,74,62,0.98)" : "rgba(47,74,62,0.9)",
  }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl flex items-center justify-between px-6 rounded-full backdrop-blur-md text-white">
      <span className="text-xl font-semibold">hunda.</span>

      <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-white/10">
        {navLinks.map((item) =>
          item.href.startsWith("/") ? (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-sm text-white/90 hover:text-white transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm text-white/90 hover:text-white transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          )
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm text-white/90 hover:text-white transition">
          Iniciar Sesion
        </Link>
        <Link href="/login">
          <button className="flex items-center gap-1 bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-[#41C086] hover:text-white transition">
            Crear usuario
            <span>→</span>
          </button>
        </Link>
      </div>
    </motion.nav>
  );
}
