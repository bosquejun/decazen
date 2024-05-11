/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Input, Spacer } from "@nextui-org/react";



export const Content = () => (
    <div className="flex flex-col md:flex-row w-full h-full py-8 md:py-0 ">
        <div className='max-w-[60%] w-full h-full hidden md:block'>

            <img
                className="inset-0 w-full h-full object-cover"
                src="/images/login.jpg" // Path to your image
                alt="yellow coupe on parking lot at daytime"
            />

            <span className="absolute bottom-2 left-2 text-white/60 text-[0.7rem]">
                Photo by <a href="https://unsplash.com/@haaijk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Raban Haaijk</a> on <a href="https://unsplash.com/photos/yellow-coupe-on-parking-lot-at-daytime-wftNpcjCHT4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
            </span>

        </div>
        <div className="flex flex-col flex-3 w-full md:max-w-[40%] pb-0 md:pb-6 p-6 gap-y-6">
            <div className=" grow-1 h-full">
                <div className="flex flex-col gap-4 w-full justify-center h-full">
                    <h1 className="text-2xl font-semibold">Welcome back, <strong className="text-primary">Parking owner</strong>!</h1>
                    <p className="text-foreground-700">Sign in to your account to continue</p>
                    <Input
                        type="email"
                        label="Email"
                        defaultValue="junior@nextui.org"
                        fullWidth
                    />
                    <Input
                        type="password"
                        label="Password"
                        fullWidth
                    />
                    <Button size="lg" color="primary" variant="shadow">Login</Button>
                </div>
            </div>
            <Spacer y={8} className="block md:hidden" />
            <div className="grow-0 flex justify-center">
                <p className="text-foreground-500">Have a space to rent out? <a href="#" className="text-primary">Sign up now</a>!</p>
            </div>
        </div>
    </div>

);
