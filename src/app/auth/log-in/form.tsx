import { SubmitButton } from "@/components/button";
import { Input } from "@/components/input";
import { logIn } from "../../../../actions/log-in";

export const LogInForm = () => {
    return (
        <div>
            <h2 className="font-mono font-bold text-center text-xl pb-12">Welcome back!</h2>
            <form action={logIn} className="flex flex-col gap-6">
                <Input type="email" label="email" name="email" required />
                {/* <Input type="text" label="username" name="username" required /> */}
                <Input type="password" label="password" name="password" required />
                <div className="pt-5">
                    <SubmitButton text="Log in" />
                </div>
            </form>
        </div>
    );
};

