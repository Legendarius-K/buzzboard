'use client'

import { logOut } from "../../actions/log-out";

type ButtonProps = {
    text?: string
    
}

export const LogOutButton = ({ text }: ButtonProps) => {
    return (
        <button onClick={() => logOut()} className="bg-primary hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-full">
            Log out
        </button>
    );
};

