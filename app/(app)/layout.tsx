import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Sidebar, { SidebarUser } from "@/components/sidebar";
import UserNav from "@/components/usernav";

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
    <div className="flex min-h-screen">
      <Sidebar user={user} />

      <div className="flex-1 flex flex-col">
        <header className="w-full h-[88px] flex items-center justify-end px-12 bg-white">
          <UserNav user={user} />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
