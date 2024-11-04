import Link from "next/link";
import { SignUpForm } from "./form";


export default function SignUpPage() {
    return (
        <div className="h-screen bg-bgmedium flex justify-center items-center">
            <SignUpForm/>
            <Link className="absolute bottom-6 text-sm md:text-base text-neutral-100" href={'/auth/log-in'}>Already have an account? <span className="text-blue-400 underline">Log in!</span></Link>
        </div>
    );
};

