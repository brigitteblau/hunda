import Link from "next/link";

export default function AppFooter() {
  return (
    <footer className="w-full border-t border-white/5 px-4 sm:px-6 lg:px-12 py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
        <span>© 2026 hunda. — Todos los derechos reservados</span>
        <div className="flex items-center gap-5">
          <Link href="/help" className="hover:text-white/70 transition-colors">
            Ayuda
          </Link>
          <Link href="/terminos" className="hover:text-white/70 transition-colors">
            Términos
          </Link>
          <Link href="/privacidad" className="hover:text-white/70 transition-colors">
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
