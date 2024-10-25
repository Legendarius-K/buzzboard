'use client'

import { Plus } from "lucide-react";
import { logOut } from "../../actions/log-out";

type ButtonProps = {
    text?: string
    
}

export const CreateButton = ({ text }: ButtonProps) => {
    return (
        <button onClick={() => logOut()} className="bg-primary flex gap-2 justify-center items-center hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-[110px]">
            Post <Plus size={18}/>
        </button>
    );
};

