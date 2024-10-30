import Link from "next/link";
import { LogInForm } from "./form";


export default function LogInPage() {
    return (
        <div className="h-screen bg-neutral-100 flex justify-center items-center">
            <LogInForm />
            <Link className="absolute bottom-6 text-sm md:text-base" href={'/auth/sign-up'}>Don't have an account? <span className="text-blue-700 underline">Sign up!</span></Link>
        </div>
    );
};
