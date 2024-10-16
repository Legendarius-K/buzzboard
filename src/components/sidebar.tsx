'use client'
import { ChevronsLeft } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
    const [open, setOpen] = useState(true)
    return (
        <aside className=" w-52 h-full fixed bg-neutral-100 shadow-xl box-content hover:border-r-2">
            <ChevronsLeft className="cursor-pointer absolute right-0" color="gray"/>
        </aside>
    )
};

