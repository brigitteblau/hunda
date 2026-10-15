import Link from "next/link";
import { PawPrint, Plus } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import PerroCard from "./perro-card";
import { PERRO_COLUMNS, toPerro, type Perro, type PerroRow } from "./perro-data";

export default async function MisPerrosPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = user
    ? await supabase
        .from("perros")
        .select(PERRO_COLUMNS)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: null };

  const perros: Perro[] = ((data ?? []) as PerroRow[]).map(toPerro);

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
            Mis perros
          </h1>
          <p className="text-white/45">
            {perros.length === 0
              ? "Todavía no registraste ningún perro."
              : `Tenés ${perros.length} ${perros.length === 1 ? "perro registrado" : "perros registrados"}.`}
          </p>
        </div>

        <Link
          href="/form"
          className="flex items-center justify-center gap-2 rounded-full bg-[#41C086] px-5 py-3 text-sm font-semibold text-[#0B0F0D] hover:bg-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Agregar perro
        </Link>
      </div>

      {/* Lista de perros */}
      {perros.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-white/3 py-20 text-center">
          <PawPrint className="h-10 w-10 text-white/20" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-white/70">
              Todavía no registraste ningún perro
            </span>
            <span className="text-xs text-white/35">
              Agregá el primero para empezar a diseñar su prótesis
            </span>
          </div>
          <Link
            href="/form"
            className="mt-2 flex items-center gap-2 rounded-full bg-[#41C086] px-5 py-2.5 text-sm font-semibold text-[#0B0F0D] hover:bg-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar perro
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {perros.map((perro) => (
            <PerroCard key={perro.id} perro={perro} />
          ))}
        </div>
      )}
    </div>
  );
}
