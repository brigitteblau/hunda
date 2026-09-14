import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SidebarUser } from "@/components/sidebar";
import AppShell from "@/components/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  const user: SidebarUser = {
    name: authUser.user_metadata?.full_name ?? authUser.email ?? "Usuario",
    email: authUser.email ?? "",
    avatarUrl: authUser.user_metadata?.avatar_url ?? null,
  };

  return <AppShell user={user}>{children}</AppShell>;
}
