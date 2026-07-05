import { FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0d1410] to-black px-6 sm:px-10 pt-8 pb-4">
      <div className="flex flex-col min-h-[110px]">

        {/* Parte superior */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-40">

          {/* Logo */}
          <div className="w-full md:w-[200px]">
            <h2 className="text-[20px] font-bold text-white mb-2">
              hunda.
            </h2>
            <p className="text-[12px] leading-[16px] text-white max-w-[170px]">
              Innovación, bienestar y movimiento para perros
            </p>
          </div>

          {/* Navegación */}
          <div className="w-full md:w-[140px] flex flex-col gap-6">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-white">
              Navegación
            </h3>
            <div className="flex flex-col gap-1.5">
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">Inicio</a>
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">Cómo funciona</a>
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">Plataforma</a>
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">FAQ</a>
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">Contacto</a>
            </div>
          </div>

          {/* Legal */}
          <div className="w-full md:w-[170px] flex flex-col gap-6">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-white">
              Legal
            </h3>
            <div className="flex flex-col gap-1.5">
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">
                Términos y condiciones
              </a>
              <a href="#" className="text-[13px] text-white no-underline hover:opacity-70">
                Política de privacidad
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="w-full md:w-auto flex flex-col gap-6">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-white">
              Contacto
            </h3>
            <div className="flex flex-col gap-1.5">
              <p className="text-[13px] text-white mb-1">
                betterbm26@gmail.com
              </p>
              <p className="text-[13px] text-white">
                +54 9 11 7366 7824
              </p>
              <div className="flex gap-3 mt-4">
                <FaInstagram className="text-white text-[24px] hover:text-[#C05A5A] transition-colors" />
                <FaTiktok className="text-white text-[24px] hover:text-[#C05A5A] transition-colors" />
                <FaLinkedinIn className="text-white text-[24px] hover:text-[#C05A5A] transition-colors" />
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex justify-center md:justify-end mt-8 md:mt-auto">
          <span className="text-[12px] text-white text-center">
            © 2026 hunda. – Todos los derechos reservados
          </span>
        </div>

      </div>
    </footer>
  );
}