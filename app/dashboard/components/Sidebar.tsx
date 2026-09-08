"use client";

import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function Sidebar() {
  const Router = useRouter();
  const Pathname = usePathname();

  const MenuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },
    {
      name: "Workout",
      icon: "🏋️",
      path: "/dashboard/workout",
    },
    {
      name: "Nutrition",
      icon: "🍎",
      path: "/dashboard/nutrition",
    },
    {
      name: "Progress",
      icon: "📈",
      path: "/dashboard/progress",
    },
    {
      name: "History",
      icon: "📜",
      path: "/dashboard/history",
    },
    {
      name: "Profile",
      icon: "👤",
      path: "/dashboard/profile",
    },
  ];

  async function Logout() {
    await supabase.auth.signOut();
    Router.push("/login");
  }

  return (
    <aside className="hidden md:flex w-64 min-h-screen bg-[#080808] border-r border-white/10 flex-col p-5 sticky top-0 h-screen">

      {/* LOGO */}
      <div className="mb-10 px-2">

        <div className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/10">
            <span className="text-lg">⚡</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            FIT<span className="text-purple-500">FORGE</span>
          </h1>

        </div>

        <p className="text-[11px] text-gray-500 mt-2 ml-1">
          Forge your strongest self
        </p>

      </div>

      {/* MENU TITLE */}
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold px-3 mb-3">
        Menu
      </p>

      {/* NAVIGATION */}
      <nav className="space-y-2">

        {MenuItems.map((Item) => {

          const IsActive =
            Item.path === "/dashboard"
              ? Pathname === "/dashboard"
              : Pathname.startsWith(Item.path);

          return (
            <button
              key={Item.path}
              onClick={() => Router.push(Item.path)}
              className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                IsActive
                  ? "bg-purple-600/15 text-white border border-purple-500/20 shadow-lg shadow-purple-500/5"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >

              {/* ACTIVE INDICATOR */}
              {IsActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-purple-500 rounded-r-full shadow-lg shadow-purple-500/50"></span>
              )}

              {/* ICON */}
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition ${
                  IsActive
                    ? "bg-purple-500/15"
                    : "bg-white/[0.03] group-hover:bg-white/[0.06]"
                }`}
              >
                {Item.icon}
              </span>

              {/* NAME */}
              <span
                className={`font-medium text-sm ${
                  IsActive ? "text-white" : ""
                }`}
              >
                {Item.name}
              </span>

              {/* ARROW */}
              {IsActive && (
                <span className="ml-auto text-purple-400 text-sm">
                  ›
                </span>
              )}

            </button>
          );
        })}

      </nav>

      {/* BOTTOM */}
      <div className="mt-auto">

        {/* MOTIVATION CARD */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/10 to-transparent p-4 mb-4">

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-semibold text-white">
              Stay Consistent
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-gray-500">
            Small progress every day leads to big results.
          </p>

        </div>

        {/* LOGOUT */}
        <div className="border-t border-white/10 pt-4">

          <button
            onClick={Logout}
            className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >

            <span className="w-8 h-8 rounded-lg bg-white/[0.03] group-hover:bg-red-500/10 flex items-center justify-center text-base">
              🚪
            </span>

            <span className="font-medium text-sm">
              Logout
            </span>

          </button>

        </div>

      </div>

    </aside>
  );
}