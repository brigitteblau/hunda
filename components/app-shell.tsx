"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar, { SidebarUser } from "@/components/sidebar";
import UserNav from "@/components/usernav";
import AppFooter from "@/components/app-footer";

export default function AppShell({
  user,
  children,
}: {
  user: SidebarUser;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0F0D]">
      <Sidebar user={user} open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="w-full h-16 lg:h-[88px] flex items-center justify-between lg:justify-end gap-4 px-4 sm:px-6 lg:px-12 border-b border-white/5 bg-[#0B0F0D]">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <UserNav user={user} />
        </header>

        <main className="flex-1 min-w-0">{children}</main>

        <AppFooter />
      </div>
    </div>
  );
}
