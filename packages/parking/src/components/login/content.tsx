/* eslint-disable @next/next/no-img-element */
"use client";

// import { signIn } from "@/auth";
import { Button, Input, Spacer } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { MouseEventHandler } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

type LoginProps = {
    closeModal?: () => void;
    callbackUrl?: string;
    email?: string;
}

export const Content = ({ closeModal, callbackUrl, email }: LoginProps) => {
    const [errorMessage, dispatch] = useFormState(async (_currentState: unknown, formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });


        if (response?.error) {
            toast.error("Invalid credentials");
            return "Invalid credentials";
        }

        toast.success("Logged in successfully");

        redirect(callbackUrl ?? "/");
    }, undefined);

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
                    <form action={dispatch}>
                        <div className="flex flex-col gap-4 w-full justify-center h-full">

                            <h1 className="text-2xl font-semibold text-foreground">Welcome back, <strong className="text-primary-500 dark:text-primary">Parking owner</strong>!</h1>
                            <p className="text-foreground-700">Sign in to your account to continue</p>
                            <Input
                                defaultValue={email}
                                name="email"
                                type="email"
                                label="Email"
                                fullWidth
                                isRequired
                            />
                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                fullWidth
                                isRequired
                            />
                            {/* {errorMessage && <SnackBar message={errorMessage} hideIndicator severity="error" />} */}
                            <div className="w-full">
                                <LoginButton />
                            </div>
                        </div>
                    </form>
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
                    <p className="text-foreground-500">Have a space to rent out? <a href="#" className="text-primary-400 dark:text-primary">Sign up now</a>!</p>
                </div>
            </div>
        </div>

    )
};


function LoginButton() {
    const { pending } = useFormStatus()

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (pending) {
            event.preventDefault()
        }
    }

    return <Button fullWidth isLoading={pending} size="lg" type="submit" color="primary" variant="shadow" onClick={handleClick}>Login</Button>
}
