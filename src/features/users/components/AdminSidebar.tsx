"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut, Shield } from "lucide-react";
import { useAuthStore } from "../../auth/store/auth.store";

export const AdminSidebar = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen border-r border-neutral-200 bg-white p-4 font-mono flex flex-col">

      {/* Yuqori qism */}
      <div>
        <p className="text-sm font-black uppercase tracking-widest mb-4">
          Admin Panel
        </p>
        <Link
          href="/admin/users"
          className="flex items-center gap-2 w-full border border-black bg-black text-white px-3 py-2 text-[11px] font-black uppercase rounded"
        >
          <Shield size={15} />
          Admin
        </Link>
      </div>

      {/* Pastki qism — user card */}
      <div className="mt-auto relative">

        {/* Tooltip — user card ustidan yuqoriga chiqadi */}
        {isOpen && user && (
          <div className="absolute bottom-full left-0 w-full border border-black bg-white shadow-lg rounded p-3 text-[11px] z-20 mb-2">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 mb-2">
              <img
                src={user.image}
                alt={user.username}
                className="w-9 h-9 rounded-full border object-cover"
              />
              <div className="min-w-0">
                <p className="font-black uppercase truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-neutral-400 truncate">@{user.username}</p>
              </div>
            </div>
            <div className="space-y-1 text-neutral-600">
              <p>
                <span className="font-bold text-black">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-bold text-black">Gender:</span> {user.gender}
              </p>
              <p>
                <span className="font-bold text-black">ID:</span> {user.id}
              </p>
            </div>
          </div>
        )}

        {/* User card */}
        <div className="border border-neutral-200 rounded p-2 flex items-center gap-2">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 min-w-0 flex-1 text-left"
          >
            <div className="w-9 h-9 rounded-full bg-neutral-100 border overflow-hidden flex items-center justify-center shrink-0">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user?.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[11px] font-black">U</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase truncate">
                {user?.username || "User"}
              </p>
              <p className="text-[10px] text-neutral-400 uppercase truncate">
                {user?.email || "email yoq"}
              </p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-red-500 hover:bg-red-50 rounded transition-all"
            aria-label="Chiqish"
          >
            <LogOut size={15} />
          </button>
        </div>

      </div>
    </aside>
  );
};