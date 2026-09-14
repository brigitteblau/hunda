import Image from "next/image";
import { FaRegCircleQuestion, FaCircleUser } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import type { SidebarUser } from "@/components/sidebar";

export default function UserNavActions({ user }: { user: SidebarUser | null }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <button className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 items-center justify-center text-white/60 hover:text-white transition-colors">
        <FaRegCircleQuestion className="w-4 h-4" />
      </button>

      <button className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 items-center justify-center text-white/60 hover:text-white transition-colors">
        <CiBellOn className="w-5 h-5" />
      </button>

      <div className="hidden sm:block text-right leading-none">
        <p className="text-[13px] text-white">{user?.name ?? "Usuario"}</p>
        <p className="text-[9px] text-white/40">Profile Setting</p>
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
    </div>
  );
}
