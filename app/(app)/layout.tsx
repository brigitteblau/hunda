import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Sidebar, { SidebarUser } from "@/components/sidebar";

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

  return (
    <div className="flex">
      <Sidebar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
