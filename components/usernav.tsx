import Image from "next/image";
import { FaRegCircleQuestion, FaCircleUser } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import type { SidebarUser } from "@/components/sidebar";

export default function UserNavActions({ user }: { user: SidebarUser | null }) {
  return (
    <div className="flex items-center gap-5">
      <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <FaRegCircleQuestion className="w-4 h-4 text-white" />
      </button>

      <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <CiBellOn className="w-5 h-5 text-white" />
      </button>

      <div className="text-right leading-none">
        <p className="text-[13px] text-white">{user?.name ?? "Usuario"}</p>
        <p className="text-[9px] text-white/60">Profile Setting</p>
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
        <FaCircleUser className="w-8 h-8 text-white" />
      )}
    </div>
  );
}
