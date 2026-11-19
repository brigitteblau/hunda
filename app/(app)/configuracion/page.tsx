import { createSupabaseServerClient } from "@/lib/supabase/server";
import ConfiguracionForm, { type ConfiguracionInicial } from "./configuracion-form";

export default async function ConfiguracionPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = user?.user_metadata ?? {};

  // Nombre y apellido: si no están por separado, los sacamos de full_name.
  const completo: string = meta.full_name ?? user?.email?.split("@")[0] ?? "";
  const [primero = "", ...resto] = completo.split(" ");
  const nombre: string = meta.first_name ?? primero;
  const apellido: string = meta.last_name ?? resto.join(" ");

  const { count } = user
    ? await supabase
        .from("perros")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
    : { count: 0 };

  const inicial: ConfiguracionInicial = {
    nombre,
    apellido,
    email: user?.email ?? "",
    telefono: meta.phone ?? "",
    ubicacion: meta.location ?? "",
    avatarUrl: meta.avatar_url ?? null,
    perros: count ?? 0,
    miembroDesde: user?.created_at ? new Date(user.created_at).getFullYear() : new Date().getFullYear(),
    notificaciones: {
      estado: meta.notif_estado ?? true,
      ajuste: meta.notif_ajuste ?? true,
      comunidad: meta.notif_comunidad ?? true,
      novedades: meta.notif_novedades ?? false,
    },
    unidad: meta.unidad === "pulgadas" ? "pulgadas" : "cm",
  };

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
          Configuración
        </h1>
        <p className="text-lg text-white/80">Administrá tu cuenta, tus notificaciones y tus preferencias</p>
      </div>

      <ConfiguracionForm inicial={inicial} />
    </div>
  );
}
