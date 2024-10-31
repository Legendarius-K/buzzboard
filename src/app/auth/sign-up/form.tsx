'use client'

import { SubmitButton } from "@/components/button";
import { Input } from "@/components/input";
import { signUp } from "../../../../actions/sign-up";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../../../actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SignUpForm = () => {
    const {mutate, error, isPending} = useMutation({
        mutationFn: signUp
    })

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema)
    })

    return (
        <div>
            <h2 className="font-mono font-bold text-center text-xl pb-12">Welcome to BuzzBoard!</h2>
            <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-6">
                <Input  {...register('email')} error={errors.email} type="email" label="email" name="email" required />
                <Input {...register('username')}  type="text" label="username" error={errors.username} name="username" required />
                <Input  {...register('password')} error={errors.password} type="password" label="password" name="password" required />
                <div className="pt-5">
                    <SubmitButton text="Sign up" />
                </div>
            </form>
        </div>
    );
};

 