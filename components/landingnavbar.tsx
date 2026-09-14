"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-[#0B0F0D]/90 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 h-16">
        <Link href="/" className="text-[17px] font-extrabold tracking-[-0.02em] text-white">
          hunda<span className="text-[#41C086]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/3 px-1.5 py-1.5">
          {navLinks.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] text-white/60 transition-colors hover:text-white hover:bg-white/5"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] text-white/60 transition-colors hover:text-white hover:bg-white/5"
              >
                {item.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13px] font-medium text-white/70 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full bg-[#41C086] px-4 py-2 text-[13px] font-semibold text-[#0B0F0D] transition-colors hover:bg-white"
          >
            Crear cuenta
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/5"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0F0D] px-6 py-5 flex flex-col gap-4">
          {navLinks.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/70 hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/70 hover:text-white"
              >
                {item.label}
              </a>
            )
          )}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-white/70 hover:text-white"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-full bg-[#41C086] px-4 py-2.5 text-sm font-semibold text-[#0B0F0D]"
            >
              Crear cuenta →
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
