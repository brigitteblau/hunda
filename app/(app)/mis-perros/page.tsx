import Link from "next/link";
import { CircleHelp, PawPrint, Plus } from "lucide-react";
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
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
            Mis perros
          </h1>
          <p className="text-lg text-white/80">
            {perros.length === 0
              ? "Todavía no registraste ningún perro."
              : "Administrá a tus compañeros y sus prótesis"}
          </p>
        </div>

        <Link
          href="/form"
          className="flex items-center justify-center gap-2 self-start rounded-full bg-mint px-8 py-3.5 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white sm:self-auto"
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
            className="flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-[#0B0F0D] hover:bg-white transition-colors"
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

      {/* Ayuda */}
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-4 text-center text-sm text-white/75">
        <CircleHelp className="h-5 w-5 text-white/60" />
        ¿Tenés dudas sobre las prótesis de tu perro?
        <Link href="/contact" className="font-medium text-mint transition-colors hover:text-white">
          Contactanos
        </Link>
      </p>
    </div>
  );
}
