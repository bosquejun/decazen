/* eslint-disable @next/next/no-img-element */
"use client";

// import { signIn } from "@/auth";
import LoginUserForm from "@/forms/login-user.form";
import { LoginUserSchemaType } from "@/forms/schema/auth.schema";
import { Button, Spacer } from "@nextui-org/react";
import { signIn } from "next-auth/react";

type LoginProps = {
    closeModal?: () => void;
    callbackUrl?: string;
    email?: string;
}

export const Content = ({ closeModal, callbackUrl, email }: LoginProps) => {

    const onLogin = async ({ email, password }: LoginUserSchemaType) => {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });


        if (response?.error) {
            throw new Error("Invalid credentials");
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-screen py-8 md:py-0">
            <div className='w-full h-full hidden md:block'>

                <img
                    className="inset-0 w-full h-full object-cover"
                    src="/images/login.jpg" // Path to your image
                    alt="yellow coupe on parking lot at daytime"
                />

                <span className="absolute bottom-2 left-2 text-white/60 text-[0.7rem]">
                    Photo by <a href="https://unsplash.com/@haaijk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Raban Haaijk</a> on <a href="https://unsplash.com/photos/yellow-coupe-on-parking-lot-at-daytime-wftNpcjCHT4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </span>

            </div>
            <div className="bg-white dark:bg-background flex flex-col flex-3 w-full md:max-w-[450px] pb-0 md:pb-6 p-6 gap-y-6 h-full">
                <Spacer y={10} className="hidden md:block" />
                {/* <div className="w=full flex justify-center">
                    <img className="h-[40px] w-[168px]" src="/images/PARKING_LOGO.png" />
                </div> */}
                <div className=" grow-1 h-full flex flex-col  justify-center">
                    <LoginUserForm callbackUrl={callbackUrl} onSubmit={onLogin} defaultValues={{ email }} />
                    <Spacer y={4} />
                    <div className="flex w-full items-center justify-center">
                        <h4>Or</h4>
                    </div>
                    <Spacer y={4} />
                    <div className="hidden md:flex flex-col gap-4 w-full justify-center">
                        <Button size="lg" color="secondary" variant="shadow" fullWidth>Sign in with Google</Button>
                        <Button size="lg" color="secondary" variant="shadow" fullWidth>Sign in with Facebook</Button>
                    </div>
                    <Spacer y={14} className="hidden md:block" />
                </div>
                <Spacer y={8} className="block md:hidden" />
                <div className="grow-0 flex justify-center">
                    <p className="text-foreground-500">Have a space to rent out? <a href="/rent-out-space" className="text-primary-400 dark:text-primary">Sign up now</a>!</p>
                </div>
            </div>
        </div>

    )
};