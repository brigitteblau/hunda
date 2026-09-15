import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Plus, Printer, Bell, CheckCircle2, PawPrint, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ImpresionPendiente {
  id: string;
  nombreMascota: string;
  nombreDueno: string;
  avatarUrl: string | null;
  estado: "En proceso" | "Listo" | "Retrasado";
  fechaEstimada: string;
}

interface ActividadItem {
  id: string;
  descripcion: string;
  fecha: string;
}

const impresionesPendientes: ImpresionPendiente[] = [];

const actividadReciente: ActividadItem[] = [];

const estadoStyles: Record<ImpresionPendiente["estado"], string> = {
  "En proceso": "bg-orange-400/15 text-orange-300",
  "Listo": "bg-[#41C086]/15 text-[#41C086]",
  "Retrasado": "bg-red-400/15 text-red-300",
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nombre =
  user?.user_metadata?.full_name?.split(" ")[0] ??
  user?.email?.split("@")[0] ??
  "Usuario";

  const { data: perros } = user
    ? await supabase.from("perros").select("protesis_generada").eq("user_id", user.id)
    : { data: null };

  const mascotasRegistradas = perros?.length ?? 0;
  const protesisEntregadas = perros?.filter((p) => p.protesis_generada).length ?? 0;

  const stats = [
  { label: "Mascotas registradas", value: mascotasRegistradas },
  { label: "Impresiones en curso", value: impresionesPendientes.length },
  { label: "Prótesis entregadas", value: protesisEntregadas },
];

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      {/* Header de bienvenida */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
          Bienvenido de vuelta, <span className="text-[#41C086]">{nombre}</span>
        </h1>
        <p className="text-white/45">
          {impresionesPendientes.length === 0
            ? "No tenés impresiones pendientes por ahora."
            : `Tenés ${impresionesPendientes.length} ${impresionesPendientes.length === 1 ? "impresión pendiente" : "impresiones pendientes"} para revisar.`}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
              <PawPrint className="h-5 w-5 text-white/50" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white">
                {String(stat.value).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/45">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas impresiones */}
        <div className="lg:col-span-2 flex flex-col gap-6 rounded-2xl border border-white/8 bg-white/3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Próximas impresiones</h2>
            <Printer className="h-5 w-5 text-white/30" />
          </div>

          {impresionesPendientes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 py-12 text-center">
              <PawPrint className="h-8 w-8 text-white/20" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white/70">
                  Todavía no tenés impresiones en curso
                </span>
                <span className="text-xs text-white/35">
                  Creá una nueva prótesis para empezar
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {impresionesPendientes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/8 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/5" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">{item.nombreMascota}</span>
                      <span className="text-sm text-white/45">Dueño: {item.nombreDueno}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${estadoStyles[item.estado]}`}
                    >
                      {item.estado}
                    </span>
                    <span className="text-xs text-white/35">{item.fechaEstimada}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {impresionesPendientes.length > 0 && (
            <button className="self-center text-sm font-medium text-[#41C086] hover:text-white transition-colors">
              Ver todas las impresiones
            </button>
          )}
        </div>

        {/* Actividad reciente */}
        <div className="flex flex-col gap-6 rounded-2xl border border-white/8 bg-white/3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Actividad reciente</h2>
            <Bell className="h-5 w-5 text-white/30" />
          </div>

          {actividadReciente.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 py-12 text-center">
              <Bell className="h-8 w-8 text-white/20" />
              <span className="text-sm font-medium text-white/70">
                Todavía no hay actividad
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {actividadReciente.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#41C086] shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-white/70">{item.descripcion}</span>
                    <span className="text-xs text-white/35">{item.fecha}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA nueva prótesis */}
      <div className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/3 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-20 blur-[90px]"
          style={{ background: "radial-gradient(circle, #41C086, transparent 70%)" }}
        />
        <div className="relative flex flex-col gap-1">
          <span className="text-white font-semibold text-lg">
            ¿Querés crear una nueva prótesis?
          </span>
          <span className="text-white/45 text-sm">
            Comenzá el proceso y completa los datos de tu perro.
          </span>
        </div>
        <Link
          href="/form"
          className="relative group flex items-center justify-center gap-2 rounded-full bg-[#41C086] px-5 py-3 text-sm font-semibold text-[#0B0F0D] transition hover:bg-white"
        >
          <Plus className="h-4 w-4" />
          Nueva prótesis
          <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
