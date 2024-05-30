"use client"

import { createAccount } from "@/app/actions/createAccount"
import { CreateAccountInputs } from "@/types"
import Image from "next/image"
import { SectionSignUp } from "./section-sign-up"
import { SectionWhyRentOutWithUs } from "./section-why-rent-out-with-us"


export const Content = () => {

    const onCreateAccount = async (inputs: CreateAccountInputs) => {
        await createAccount(inputs);
    }

    return <div className="flex w-full px-2">
        <div className='absolute top-0 left-0 w-full h-full max-h-[300px] md:max-h-[450px] z-0'>
            <Image
                src="/images/rent-out-space.jpg" // Path to your image
                alt="Description of image"
                layout="fill"
                objectFit="cover"
                objectPosition="50% 70%" // Adjust this value as needed
            />
            <div className="absolute inset-0 bg-gradient-to-b dark:from-background from-black/70 to-transparent opacity-70 z-10"></div>
            <span className="absolute top-[70px] right-2 text-white/30 text-[0.7rem] z-[11]">
                Photo by <a href="https://unsplash.com/@sxoxm?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sven Mieke</a> on <a href="https://unsplash.com/photos/yellow-and-black-stripe-floor-lOgR82HSQKM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
            </span>
            <div className="absolute h-[100px] md:h-[200px] top-[200px] md:top-[250px] inset-0 bg-gradient-to-t from-background to-transparent opacity-82 z-10"></div>

        </div>
        <div className="h-full lg:px-6 z-10 w-full">
            <div className="flex flex-col w-full h-full md:mt-14 gap-8 md:gap-12">

                <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-6">
                    <h1 className="text-2xl lg:text-4xl font-semibold text-white md:mt-6">Transform your <strong className="text-primary">park space</strong> into an effortless, passive stream of <strong className="text-primary">earnings</strong>.</h1>
                    <div className="w-full md:max-w-[40%]">
                        <SectionSignUp onCreateAccount={onCreateAccount} />
                    </div>
                </div>
                <SectionWhyRentOutWithUs />
            </div>
        </div>
    </div>
}