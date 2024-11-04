"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SidebarButtons } from "./sidebarButtons";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

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
        "w-[200px] overflow transition-all ease-in-out h-full fixed z-30 left-0 top-[56px] md:top-[72px] border-r-2 shadow-xl box-content hover:border-r-4 border-neutral-400 bg-bglight text-neutral-100",
        !open && "w-0 border-r-4 hover:border-neutral-200"
      )}
    >
      <ChevronsLeft
        size={30}
        onClick={toggleSidebar}
        className={cn(
          "cursor-pointer absolute right-1 text-neutral-300 hover:text-neutral-100 z-40 h-full",
          !open && "-right-10 rotate-180 "
        )}
      />
      <div
        className={cn(
          "w-auto flex flex-col gap-2 pt-10 pl-4 transition-all ease-in-out",
          !open && "relative -left-[200px] overflow-hidden"
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
