'use client'

import { SubmitButton } from "@/components/button";
import { Input } from "@/components/input";
import { logIn } from "../../../../actions/log-in";
import { logInSchema } from "../../../../actions/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

export const LogInForm = () => {
    const {mutate, error, isPending} = useMutation({
        mutationFn: logIn
    })

    const { register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof logInSchema>>({
        resolver: zodResolver(logInSchema)
    })

    return (
        <div>
            <h2 className="font-mono font-bold text-center text-xl pb-12 text-neutral-100">Welcome back!</h2>
            <form onSubmit={handleSubmit((values) => mutate(values), (error) => console.log('ERROR'))}
                className="flex flex-col gap-6">
                <Input {...register('email')} error={errors.email} label="email" name="email" />
                {/* <Input type="text" label="username" name="username" required /> */}
                <Input {...register('password')} error={errors.password} label="password" type="password" name="password" />
                {error && <span className="text-center text-sm text-amber-800">{error.message}</span>}
                <div className="pt-5">
                    <SubmitButton text={isPending ? 'Logging in...' : 'Log in'} />
                </div>
            </form>
        </div>
    );
};

