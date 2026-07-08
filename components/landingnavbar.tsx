"use client";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Plataforma", href: "#plataforma" },
  { label: "FAQ", href: "#impresion-3d" },
  { label: "Contacto", href: "/contacto" },
];

export default function LandingNavbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl flex items-center justify-between px-6 py-3 rounded-full bg-[#2F4A3E]/90 backdrop-blur-md text-white">
      <span className="text-xl font-semibold">hunda.</span>

      <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-white/10">
        {navLinks.map((item) =>
          item.href.startsWith("/") ? (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-white/90 hover:text-white transition"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-white/90 hover:text-white transition"
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
        <Link href="/signup">
          <button className="flex items-center gap-1 bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-[#41C086] hover:text-white transition">
            Crear usuario
            <span>→</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}
