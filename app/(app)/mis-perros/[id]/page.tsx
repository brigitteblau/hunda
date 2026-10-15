import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PERRO_COLUMNS, toPerro, type PerroRow } from "../perro-data";
import PerroDetalle from "./perro-detalle";

export default async function PerroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  // RLS ya limita a los perros del usuario logueado
  const { data } = await supabase.from("perros").select(PERRO_COLUMNS).eq("id", id).maybeSingle();
  if (!data) notFound();

  return <PerroDetalle perro={toPerro(data as PerroRow)} />;
}
