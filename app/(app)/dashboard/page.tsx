import { createSupabaseServerClient } from "@/lib/supabase/server";
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

  return <DashboardContent nombre={nombre} />;
}
