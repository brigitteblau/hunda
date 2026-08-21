import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Plus, Printer, Bell, CheckCircle2, PawPrint } from "lucide-react";
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

// TODO: reemplazar por fetch real a Supabase cuando tengan las tablas listas
const impresionesPendientes: ImpresionPendiente[] = [];

const actividadReciente: ActividadItem[] = [];

const estadoStyles: Record<ImpresionPendiente["estado"], string> = {
  "En proceso": "bg-orange-100 text-orange-700",
  "Listo": "bg-green-100 text-green-700",
  "Retrasado": "bg-red-100 text-red-700",
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

  const stats = [
  { label: "Mascotas registradas", value: 0 },
  { label: "Impresiones en curso", value: impresionesPendientes.length },
  { label: "Prótesis entregadas", value: 0 },
];

  return (
    <div className="flex flex-col gap-8 p-12">
      {/* Header de bienvenida */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          Bienvenido de vuelta, <span className="text-emerald-500">{nombre}</span>
        </h1>
        <p className="text-gray-500">
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
            className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <PawPrint className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-semibold text-gray-900">
                {String(stat.value).padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas impresiones */}
        <div className="lg:col-span-2 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Próximas impresiones</h2>
            <Printer className="h-5 w-5 text-gray-400" />
          </div>

          {impresionesPendientes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 py-12 text-center">
              <PawPrint className="h-8 w-8 text-gray-300" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">
                  Todavía no tenés impresiones en curso
                </span>
                <span className="text-xs text-gray-400">
                  Creá una nueva prótesis para empezar
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {impresionesPendientes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-900">{item.nombreMascota}</span>
                      <span className="text-sm text-gray-500">Dueño: {item.nombreDueno}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${estadoStyles[item.estado]}`}
                    >
                      {item.estado}
                    </span>
                    <span className="text-xs text-gray-400">{item.fechaEstimada}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {impresionesPendientes.length > 0 && (
            <button className="self-center text-sm font-medium text-emerald-600 hover:text-emerald-700">
              Ver todas las impresiones
            </button>
          )}
        </div>

        {/* Actividad reciente */}
        <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Actividad reciente</h2>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>

          {actividadReciente.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 py-12 text-center">
              <Bell className="h-8 w-8 text-gray-300" />
              <span className="text-sm font-medium text-gray-700">
                Todavía no hay actividad
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {actividadReciente.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-700">{item.descripcion}</span>
                    <span className="text-xs text-gray-400">{item.fecha}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA nueva prótesis */}
      <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-8">
        <div className="flex flex-col gap-1">
          <span className="text-white font-semibold text-lg">
            ¿Querés crear una nueva prótesis?
          </span>
          <span className="text-gray-400 text-sm">
            Comenzá el proceso y completa los datos de tu perro.
          </span>
        </div>
        <Link
          href="/form"
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Nueva prótesis
        </Link>
      </div>
    </div>
  );
}