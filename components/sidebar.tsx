"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  PawPrint,
  HelpCircle,
  Bell,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

// -----------------------------------------------------------------------
// Tipo del usuario. Lo que necesita la sidebar para pintar la user card.
// Lo llenás con lo que tengas en tu tabla de perfiles / auth.
// -----------------------------------------------------------------------
export type SidebarUser = {
  name: string;
  email: string;
  avatarUrl?: string | null;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const mainItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Nueva Prótesis", href: "/protesis/nueva", icon: PlusSquare },
  { label: "Mis perros", href: "/perros", icon: PawPrint },
  { label: "Help", href: "/help", icon: HelpCircle },
];

const otrosItems: NavItem[] = [
  { label: "Notificación", href: "/notificaciones", icon: Bell },
  { label: "Configuración", href: "/configuracion", icon: Settings },
];

export default function Sidebar({
  user,
  onSignOut,
}: {
  user: SidebarUser | null;
  onSignOut?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-[#2b2233] px-3 py-4 text-white">
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
          <Image src="/logo2.svg" alt="hunda" width={40} height={40} />
          <span className="text-lg font-semibold">hunda.</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/50">
          <Search className="h-4 w-4" />
          <span>Search or type a command</span>
        </div>

        {/* MAIN */}
        <NavSection label="Main">
          {mainItems.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </NavSection>

        {/* OTROS */}
        <NavSection label="Otros">
          {otrosItems.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </NavSection>
      </div>

      {/* User card */}
      {user ? <UserCard user={user} /> : <UserCardSkeleton />}
    </aside>
  );
}

function NavSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="px-3 text-xs font-medium uppercase tracking-wider text-white/30">
        {label}
      </span>
      {children}
    </div>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-white/10 font-medium text-white"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r bg-emerald-400" />
      )}
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}

function UserCard({ user }: { user: SidebarUser }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-9 w-9 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-sm font-semibold text-[#2b2233]">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{user.name}</p>
        <p className="truncate text-xs text-white/50">{user.email}</p>
      </div>
    </div>
  );
}

function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
      <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
        <div className="h-2.5 w-32 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}
