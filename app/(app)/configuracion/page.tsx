import { createSupabaseServerClient } from "@/lib/supabase/server";
import { User, Mail } from "lucide-react";

export default async function ConfiguracionPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nombre = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Usuario";

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
          Configuración
        </h1>
        <p className="text-white/45">Datos de tu cuenta.</p>
      </div>

      <div className="max-w-lg rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/50">
            <User size={16} />
          </span>
          <div>
            <p className="text-xs text-white/40">Nombre</p>
            <p className="text-sm text-white">{nombre}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/50">
            <Mail size={16} />
          </span>
          <div>
            <p className="text-xs text-white/40">Email</p>
            <p className="text-sm text-white">{user?.email ?? "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
