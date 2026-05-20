"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import {
  Heart,
  Home,
  LayoutDashboard,
  ListOrdered,
  LogIn,
  ShoppingCart,
} from "lucide-react";

const PUBLIC_NAV_ITEMS = [
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

const AUTH_NAV_ITEMS = [
  ...PUBLIC_NAV_ITEMS,
  { label: "Orders", href: "/orders", icon: ListOrdered },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = isAuthenticated ? AUTH_NAV_ITEMS : PUBLIC_NAV_ITEMS;

  return (
    <header className="h-14 p-10 border-b border-neutral-200 bg-white flex items-center justify-center px-6 font-mono sticky top-0 z-50">
      <Link href="/" className=" flex w-30 text-sm font-black uppercase tracking-widest">
       <Home size={20} className="w-10"/>
        Home 
      </Link>

      <nav className="flex items-center gap-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (pathname === "/home" && item.href === "/home/products") ||
            (pathname === "/" && item.href === "/home/products");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase rounded transition-all ${
                isActive
                  ? "bg-black text-white"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}

        {!isAuthenticated && (
          <Link
            href="/login"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase rounded transition-all ${
              pathname === "/login"
                ? "bg-black text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <LogIn size={16} />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};
