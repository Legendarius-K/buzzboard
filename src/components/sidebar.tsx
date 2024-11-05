"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SidebarButtons } from "./sidebarButtons";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const navItems = [
    { path: "/category/general", title: "General" },
    { path: "/category/coding", title: "Coding" },
    { path: "/category/cakes", title: "Cakes" },
    { path: "/category/carpentry", title: "Carpentry" },
    { path: "/category/insects", title: "Insects" },
  ];

  return (
    <aside
      className={cn(
        "w-[160px] transition-all overflow-hidden ease-in-out h-calc(100%-72px) fixed z-30 left-0 top-[56px] md:top-[72px] border-r-2 shadow-xl box-content hover:border-r-4 border-neutral-400 bg-neutral-800 text-neutral-100",
        !open && "w-0 border-r-[3px] hover:border-neutral-200 overflow-hidden"
      )}
      style={{height: "calc(100% - 56px)"}}
    >
      <ChevronsLeft
        size={30}
        onClick={toggleSidebar}
        className={cn(
          "transition-all cursor-pointer fixed left-[130px] text-neutral-300 hover:text-white z-40 h-full",
          !open && "left-[4px] rotate-180 ",
        )}
      />
      <div
        className={cn(
          "w-auto flex flex-col gap-2 pt-10 pl-4 transition-all ease-in-out",
          !open && "relative"
        )}
      >
        <div className="flex flex-col gap-2 mb-10 py-2">
          {navItems?.map((item, index) => (
            <Link
              key={index}
              className="hover:border-neutral-300 hover:text-neutral-300 border-b border-neutral-500 pl-2 transition-all"
              href={item.path}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <SidebarButtons />
      </div>
    </aside>
  );
};
