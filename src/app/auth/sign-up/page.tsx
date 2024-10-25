import Link from "next/link";
import { SignUpForm } from "./form";


export default function SignUpPage() {
    return (
        <div className="h-screen bg-neutral-100 flex justify-center items-center">
            <SignUpForm/>
            <Link className="absolute bottom-6" href={'/auth-log-in'}>Already have an account? <span className="text-blue-700 underline">Log in!</span></Link>
        </div>
    );
};

