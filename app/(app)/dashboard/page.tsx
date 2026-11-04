import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  PERRO_COLUMNS,
  toPerro,
  type PerroRow,
} from "../mis-perros/perro-data";
import { armarDashboard } from "./armar-dashboard";
import DashboardContent from "./dashboard-content";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nombre =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "Usuario";

  const { data } = user
    ? await supabase
        .from("perros")
        .select(PERRO_COLUMNS)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: null };

  const perros = ((data ?? []) as PerroRow[]).map(toPerro);

  return <DashboardContent nombre={nombre} datos={armarDashboard(perros)} />;
}
