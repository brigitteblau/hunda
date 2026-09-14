"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { FaRegCircleQuestion, FaCircleUser } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import { Settings, LogOut, Bell } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SidebarUser } from "@/components/sidebar";

export default function UserNavActions({ user }: { user: SidebarUser | null }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <Link
        href="/help"
        title="Ayuda"
        className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <FaRegCircleQuestion className="w-4 h-4" />
      </Link>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            title="Notificaciones"
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <CiBellOn className="w-5 h-5" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={10}
            className="z-50 w-72 rounded-xl border border-white/10 bg-[#12161a] p-4 shadow-xl outline-none"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Notificaciones</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
              <Bell size={22} className="text-white/20" />
              <p className="text-xs text-white/40">Todavía no tenés notificaciones.</p>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex items-center gap-2.5 rounded-full text-left outline-none">
            <div className="hidden sm:block text-right leading-none">
              <p className="text-[13px] text-white">{user?.name ?? "Usuario"}</p>
              <p className="text-[9px] text-white/40">Ver perfil</p>
            </div>

            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaCircleUser className="w-8 h-8 text-white/30" />
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={10}
            className="z-50 w-56 rounded-xl border border-white/10 bg-[#12161a] p-1.5 shadow-xl outline-none"
          >
            <div className="px-3 py-2.5 border-b border-white/8 mb-1">
              <p className="text-sm font-medium text-white truncate">{user?.name ?? "Usuario"}</p>
              <p className="text-xs text-white/40 truncate">{user?.email ?? ""}</p>
            </div>

            <Link
              href="/configuracion"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Settings size={15} />
              Configuración
            </Link>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut size={15} />
              Cerrar sesión
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
