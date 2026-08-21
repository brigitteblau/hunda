import Link from "next/link";
import { PawPrint, Plus, MoreVertical } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";

interface Perro {
    id: string;
    nombre: string;
    raza: string;
    fotoUrl: string | null;
    protesisAsociada: string | null;
}

export default async function MisPerrosPage() {
const supabase = await createSupabaseServerClient();
const {
    data: { user },
} = await supabase.auth.getUser();

  // TODO: reemplazar por fetch real cuando esté la tabla de perros
  // const { data: perros } = await supabase
  //   .from("perros")
  //   .select("id, nombre, raza, foto_url, protesis_asociada")
  //   .eq("user_id", user?.id);
const perros: Perro[] = [];

return (
    <div className="flex flex-col gap-8 p-12">
      {/* Header */}
    <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-gray-900">Mis perros</h1>
            <p className="text-gray-500">
            {perros.length === 0
                ? "Todavía no registraste ningún perro."
                : `Tenés ${perros.length} ${perros.length === 1 ? "perro registrado" : "perros registrados"}.`}
        </p>
        </div>

        <Link
            href="/form"
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
            <Plus className="h-4 w-4" />
            Agregar perro
        </Link>
    </div>

      {/* Lista de perros */}
    {perros.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
            <PawPrint className="h-10 w-10 text-gray-300" />
        <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
            Todavía no registraste ningún perro
            </span>
            <span className="text-xs text-gray-400">
            Agregá el primero para empezar a diseñar su prótesis
            </span>
        </div>
            <Link
            href="/form"
            className="mt-2 flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
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
                className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
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
                    <div className="h-14 w-14 rounded-xl bg-gray-200 flex items-center justify-center">
                        <PawPrint className="h-6 w-6 text-gray-400" />
                    </div>
)}
                <div className="flex flex-col gap-1">
                <span className="font-medium text-gray-900">{perro.nombre}</span>
                <span className="text-sm text-gray-500">{perro.raza}</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {perro.protesisAsociada ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    {perro.protesisAsociada}
                </span>
                ) : (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    Sin prótesis
                </span>
                )}
                <button className="text-gray-400 hover:text-gray-600">
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