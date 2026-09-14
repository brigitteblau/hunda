import Link from "next/link";
import { PawPrint, Plus, MoreVertical } from "lucide-react";
import Image from "next/image";

interface Perro {
    id: string;
    nombre: string;
    raza: string;
    fotoUrl: string | null;
    protesisAsociada: string | null;
}

const estadoBadge = (protesis: string | null) =>
  protesis
    ? "rounded-full bg-[#41C086]/15 px-3 py-1 text-xs font-medium text-[#41C086]"
    : "rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/40";

export default async function MisPerrosPage() {
  // TODO: reemplazar por fetch real cuando esté la tabla de perros
  // const { data: perros } = await supabase
  //   .from("perros")
  //   .select("id, nombre, raza, foto_url, protesis_asociada")
  //   .eq("user_id", user?.id);
  const perros: Perro[] = [];

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
            <div
              key={perro.id}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 p-5"
            >
              <div className="flex items-center gap-4">
                {perro.fotoUrl ? (
                  <Image
                    src={perro.fotoUrl}
                    alt={perro.nombre}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-white/5 flex items-center justify-center">
                    <PawPrint className="h-6 w-6 text-white/30" />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-white">{perro.nombre}</span>
                  <span className="text-sm text-white/45">{perro.raza}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={estadoBadge(perro.protesisAsociada)}>
                  {perro.protesisAsociada ?? "Sin prótesis"}
                </span>
                <button className="text-white/30 hover:text-white/70 transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
