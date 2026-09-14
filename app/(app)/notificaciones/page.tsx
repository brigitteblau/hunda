import { Bell } from "lucide-react";

export default function NotificacionesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
          Notificaciones
        </h1>
        <p className="text-white/45">Novedades sobre tus prótesis e impresiones.</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/3 py-20 text-center">
        <Bell className="h-8 w-8 text-white/20" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-white/70">
            Todavía no tenés notificaciones
          </span>
          <span className="text-xs text-white/35">
            Te vamos a avisar acá cuando haya novedades sobre tus pedidos
          </span>
        </div>
      </div>
    </div>
  );
}
