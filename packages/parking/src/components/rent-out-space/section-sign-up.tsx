"use client"

import { CreateAccountInputs } from "@/types";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";



export const SectionSignUp = ({ onCreateAccount }: { onCreateAccount: (inputs: CreateAccountInputs) => Promise<void> }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateAccountInputs>()

    const onSubmit: SubmitHandler<CreateAccountInputs> = async (data) => {
        await toast.promise(onCreateAccount(data), {
            loading: 'Creating account...',
            success: 'Account created successfully',
            error: (error) => {
                const { message } = error as Error;
                return message ?? 'Failed to create account';
            }
        });
        router.push("/login?email=" + encodeURIComponent(data.email) + "&callbackUrl=" + encodeURIComponent("/dashboard"));
    };



    return <Card>
        <CardBody>
            <div className="flex flex-col p-3 md:p-6 gap-4 ">
                <h1 className="text-2xl text-foreground-700 font-semibold text-center">Create an account to continue</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input
                        {...register("first_name", { required: true })}
                        label="First name"
                        fullWidth
                        isRequired
                    />
                    <Input
                        {...register("last_name", { required: true })}
                        label="Last name"
                        fullWidth
                        isRequired
                    />
                    <Input
                        {...register("email", { required: true })}
                        type="email"
                        label="Email address"
                        fullWidth
                        isRequired
                    />
                    <Input
                        {...register("password", { required: true })}
                        type="password"
                        label="Password"
                        fullWidth
                        isRequired
                    />
                    <p className="text-foreground-500">
                        By proceeding with creating an account you agree to the Decazen <a className="underline text-primary-400 dark:text-primary" href="">Terms & Conditions</a> and <a className="underline text-primary-400 dark:text-primary" href="https://decazen.com/privacy-policy">Privacy Policy</a>.
                    </p>
                    <Button isLoading={isSubmitting} type="submit" size="lg" color="primary" variant="shadow">Create account</Button>
                </form>
            </div>
        </CardBody>
    </Card>
}