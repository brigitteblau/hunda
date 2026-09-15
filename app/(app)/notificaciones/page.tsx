import { Bell, CheckCircle2, MapPin, PawPrint, Sparkles } from "lucide-react";

interface Notificacion {
  id: string;
  icon: React.ElementType;
  titulo: string;
  descripcion: string;
  tiempo: string;
  leida: boolean;
}

const notificaciones: Notificacion[] = [
  {
    id: "1",
    icon: CheckCircle2,
    titulo: "¡Prótesis de Rocky lista!",
    descripcion: "El modelo 3D terminó de generarse y ya está lista para descargar.",
    tiempo: "hace 5 min",
    leida: false,
  },
  {
    id: "2",
    icon: MapPin,
    titulo: "Nuevo punto de impresión cerca tuyo",
    descripcion: "Sumamos un taller aliado en Pocitos, a 2km de tu ubicación.",
    tiempo: "hace 3 h",
    leida: false,
  },
  {
    id: "3",
    icon: Sparkles,
    titulo: "Le bajamos un cambio al motor de generación",
    descripcion: "Ahora los sockets calzan mejor en patas traseras. Ya podés probarlo.",
    tiempo: "ayer",
    leida: true,
  },
  {
    id: "4",
    icon: PawPrint,
    titulo: "¿Ya volvió a correr?",
    descripcion: "Contanos cómo le quedó la prótesis a tu perro, nos hace felices leerlo.",
    tiempo: "hace 2 días",
    leida: true,
  },
];

export default function NotificacionesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
          Notificaciones
        </h1>
        <p className="text-white/45">Novedades sobre tus prótesis e impresiones.</p>
      </div>

      <div className="flex flex-col gap-3">
        {notificaciones.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 rounded-2xl border p-5 transition-colors ${
              n.leida
                ? "border-white/8 bg-white/3"
                : "border-[#41C086]/25 bg-[#41C086]/5"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                n.leida ? "bg-white/5 text-white/40" : "bg-[#41C086]/15 text-[#41C086]"
              }`}
            >
              <n.icon className="h-4 w-4" />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{n.titulo}</span>
                <span className="shrink-0 text-xs text-white/35">{n.tiempo}</span>
              </div>
              <p className="text-sm text-white/50">{n.descripcion}</p>
            </div>

            {!n.leida && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#41C086]" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/3 py-8 text-center">
        <Bell className="h-6 w-6 text-white/20" />
        <span className="text-xs text-white/35">Estás al día, no hay nada más por ahora</span>
      </div>
    </div>
  );
}
