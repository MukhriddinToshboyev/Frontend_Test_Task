"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import Cookies from "js-cookie";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    ListOrdered,
    Users,
    LogOut,
} from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={16} /> },
    { label: "Products", href: "/dashboard/products", icon: <Package size={16} /> },
    { label: "Card", href: "/dashboard/card", icon: <ShoppingCart size={16} /> },
    { label: "Orders", href: "/dashboard/orders", icon: <ListOrdered size={16} /> },
    { label: "Users", href: "/dashboard/users", icon: <Users size={16} /> },
];

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        Cookies.remove("accessToken");
        router.push("/login");
    };

    return (
        <header className="h-14 border-b border-neutral-200 bg-white flex items-center justify-between px-6 font-mono sticky top-0 z-50">
            <span className="text-sm font-black uppercase tracking-widest">
                E-Commerce
            </span>

            <nav className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase rounded transition-all
                                ${isActive
                                    ? "bg-black text-white"
                                    : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-[10px] font-black overflow-hidden">
                        {user?.image
                            ? <img src={user.image} alt="avatar" className="w-20 h-20 object-cover" />
                            : <span>{user?.username?.charAt(0).toUpperCase() || "U"}</span>
                        }
                    </div>
                    <span className="text- font-bold text-neutral-700">
                        {user?.username || "Mehmon"}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-2 py-1.5 text-[11px] font-bold uppercase text-red-500 hover:bg-red-50 rounded transition-all"
                >
                    <LogOut size={14} />
                    Chiqish
                </button>
            </div>
        </header>
    );
};