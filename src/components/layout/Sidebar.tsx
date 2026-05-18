"use client"

import { useAuthStore } from "@/src/features/auth/store/auth.store";
import Link from "next/link";
import { LogOut, LucideLayoutDashboard, LucidePackage, Store } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LucideLayoutDashboard size={20} />,
    },
    {
        label: "Maxsulotlar",
        href: "/dashboard/products",
        icon: <LucidePackage size={20} />,
    },
    {
        label: "Buyurtmalar",
        href: "/dashboard/card",
        icon: <Store size={20} />,
    }
]

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const {logout} = useAuthStore();

    const handleClick = () => {
        logout();
        Cookies.remove("accessToken");
        router.push("/login");
    }

    return (
        <aside className="w-[300px] h-screen flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)]">
            

            <div className=" flex items-center justify-center px-6 py-5  border-b border-[var(--sidebar-border)]">
                <span className="text-2xl font-bold text-[var(--sidebar-text)]">
                    Sidebar 
                </span>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-5 py-2.5 rounded-lg text-xl font-medium
                                transition-all duration-150
                                ${isActive
                                    ? "bg-[var(--sidebar-active)] text-[var(--sidebar-text)]"
                                    : "text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]"
                                }
                            `}
                        >
                            <span className={isActive ? "text-[var(--sidebar-text)]" : "text-[var(--sidebar-icon)]"}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

           {/* Profil va Logout qismi - Pastdan biroz masofa (mb-6) bilan ajratilgan */}
            <div className="px-4 h-14 mb-6 mt-auto border-t border-[var(--sidebar-border)] pt-4">
                <div className="flex m-2 h-14 items-center justify-between gap-2 p-2 rounded-xl bg-gray-50/80 border border-gray-100 shadow-sm">
                    
                    {/* User ma'lumotlari */}
                    <div className="flex  items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
                            {user?.image ? (
                                <img src={user.image} alt="avatar" className="rounded-full w-full h-full object-cover" />
                            ) : (
                                <span>{user?.username?.charAt(0).toUpperCase() || "U"}</span>
                            )}
                        </div>

                        <div className="flex flex-col overflow-hidden">
                            <span className="text-ss font-bold truncate text-gray-900 leading-tight">
                                {user?.username || "Mehmon"}
                            </span>
                            <span className="text-[13px] text-gray-500 truncate">
                                {user?.email || "email mavjud emas"}
                            </span>
                        </div>
                    </div>

                    <button
                        className="p-2.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all shrink-0 active:scale-95"
                        onClick={handleClick}
                        title="Chiqish"
                    >
                        <LogOut size={22} />
                    </button>
                </div>
            </div>

        </aside>
    )
}