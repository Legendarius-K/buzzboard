'use client'

import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

type ButtonProps = {
    text: string | ReactNode
}

export const SubmitButton = ({ text }: ButtonProps) => {

    return (
        <button type="submit" className="flex justify-center bg-primary hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-full">
            {text}
        </button>
    );
};

