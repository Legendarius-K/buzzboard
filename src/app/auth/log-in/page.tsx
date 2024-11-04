import Link from "next/link";
import { LogInForm } from "./form";


export default function LogInPage() {
    return (
        <div className="h-screen bg-bgmedium flex justify-center items-center">
            <LogInForm />
            <Link className="absolute bottom-6 text-sm md:text-base text-neutral-100" href={'/auth/sign-up'}>Don't have an account? <span className="text-blue-400 underline">Sign up!</span></Link>
        </div>
    );
};
