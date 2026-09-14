import Link from "next/link";
import { FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import { IconButton } from "@/components/ui/icon-button";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Plataforma", href: "/#plataforma" },
  { label: "FAQ", href: "/#impresion-3d" },
  { label: "Contacto", href: "/contact" },
];

const legalLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
];

const linkClass = "text-[13px] text-white/70 no-underline hover:text-white transition-colors";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0F0D] px-6 sm:px-10 pt-14 pb-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="w-full md:max-w-55">
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-white mb-2">
              hunda<span className="text-[#41C086]">.</span>
            </h2>
            <p className="text-[13px] leading-5 text-white/60">
              Innovación, bienestar y movimiento para perros.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Navegación
              </h3>
              <div className="flex flex-col gap-2.5">
                {navLinks.map((item) => (
                  <Link key={item.label} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Legal
              </h3>
              <div className="flex flex-col gap-2.5">
                {legalLinks.map((item) => (
                  <Link key={item.label} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Contacto
              </h3>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:betterbm26@gmail.com" className={linkClass}>
                  betterbm26@gmail.com
                </a>
                <a href="tel:+5491173667824" className={linkClass}>
                  +54 9 11 7366 7824
                </a>
              </div>

              <div className="flex gap-2 pt-1">
                <IconButton href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram size={15} />
                </IconButton>
                <IconButton href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                  <FaTiktok size={14} />
                </IconButton>
                <IconButton href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn size={15} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6">
          <span className="text-[12px] text-white/40">
            © 2026 hunda. — Todos los derechos reservados
          </span>
          <span className="text-[12px] text-white/40">
            Hecho por Benja, Brigitte y Maite
          </span>
        </div>
      </div>
    </footer>
  );
}
