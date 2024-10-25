import { SubmitButton } from "@/components/button";
import { Input } from "@/components/input";
import { signUp } from "../../../../actions/sign-up";

export const SignUpForm = () => {
    return (
        <div>
            <h2 className="font-mono font-bold text-center text-xl pb-12">Welcome!</h2>
            <form action={signUp} className="flex flex-col gap-6">
                <Input type="email" label="email" name="email" required />
                <Input type="text" label="username" name="username" required />
                <Input type="password" label="password" name="password" required />
                <div className="pt-5">
                    <SubmitButton text="Sign up" />
                </div>
            </form>
        </div>
    );
};

