"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
      <div className="flex items-center justify-between h-[56px] px-5 md:px-10">
        <span className="text-[18px] font-bold text-[#111] shrink-0 md:ml-6">
          hunda.
        </span>

        {/* Menú desktop */}
        <div className="hidden md:flex gap-8 flex-1 justify-center">
          <a href="/" className="text-[13px] text-[#111] no-underline hover:opacity-60">
            Home
          </a>

          <a href="/dashboard" className="text-[13px] text-[#111] no-underline hover:opacity-60">
            Dashboard
          </a>

          <a href="/help" className="text-[13px] text-[#111] no-underline hover:opacity-60">
            Help
          </a>

          <a href="/contact" className="text-[13px] text-[#111] no-underline hover:opacity-60">
            Contact Us
          </a>
        </div>

        {/* Botones desktop */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="/login"
            className="whitespace-nowrap px-3 py-1 text-[13px] text-[#111] border border-[#666] rounded-full no-underline hover:bg-black/5"
          >
            inicia sesión
          </a>

          <a
            href="/register"
            className="px-4 py-1.5 text-[13px] text-white bg-[#111] rounded-full no-underline hover:bg-[#333]"
          >
            registrate
          </a>
        </div>

        {/* Botón hamburguesa mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-[#111]"
          aria-label="Abrir menú"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/5 px-5 py-5 flex flex-col gap-4">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="text-[14px] text-[#111] no-underline hover:opacity-60"
          >
            Home
          </a>

          <a
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="text-[14px] text-[#111] no-underline hover:opacity-60"
          >
            Dashboard
          </a>

          <a
            href="/help"
            onClick={() => setOpen(false)}
            className="text-[14px] text-[#111] no-underline hover:opacity-60"
          >
            Help
          </a>

          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-[14px] text-[#111] no-underline hover:opacity-60"
          >
            Contact Us
          </a>

          <div className="flex flex-col gap-3 pt-3">
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="w-full text-center px-3 py-2 text-[13px] text-[#111] border border-[#666] rounded-full no-underline hover:bg-black/5"
            >
              inicia sesión
            </a>

            <a
              href="/register"
              onClick={() => setOpen(false)}
              className="w-full text-center px-4 py-2 text-[13px] text-white bg-[#111] rounded-full no-underline hover:bg-[#333]"
            >
              registrate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}