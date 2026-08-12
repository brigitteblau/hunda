import { FaRegCircleQuestion, FaCircleUser } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";

export default function UserNavActions() {
  return (
    <div className="flex items-center gap-5">
      <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <FaRegCircleQuestion className="w-4 h-4 text-white" />
      </button>

      <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <CiBellOn className="w-5 h-5 text-white" />
      </button>

      <div className="text-right leading-none">
        <p className="text-[13px] text-white">nombre de usuario</p>
        <p className="text-[9px] text-white/60">Profile Setting</p>
      </div>

      <FaCircleUser className="w-8 h-8 text-white" />
    </div>
  );
}