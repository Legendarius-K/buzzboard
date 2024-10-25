import Link from "next/link";
import { LogInForm } from "./form";


export default function LogInPage() {
    return (
        <div className="h-screen bg-neutral-100 flex justify-center items-center">
            <LogInForm />
            <Link className="absolute bottom-6" href={'/auth-log-in'}>Already have an account? <span className="text-blue-700 underline">Log in!</span></Link>
        </div>
    );
};
