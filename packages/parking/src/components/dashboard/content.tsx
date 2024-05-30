"use client"

import { UserData } from "@/types"
import { Avatar, Divider } from "@nextui-org/react"
import Show from "../common/Show"
import { CardOnboardingProfile } from "./card-onboarding"
import { SectionRentOutSpaces } from "./section-rent-out-spaces"


export const Content = ({ user }: { user: UserData | null }) => {

    return <div className="flex flex-col w-full h-full gap-6 px-4 md:px-16">
        <div className="flex gap-2 items-center">
            <Avatar size="lg" />
            <h1 className="text-2xl text-foreground-700 font-[500]">Hello 👋,<br /> <strong>{user?.name}</strong></h1>
        </div>
        <Divider />
        <div className="flex flex-col gap-12">
            <Show>
                <Show.When isTrue={user?.status === "registered"}>
                    <CardOnboardingProfile />
                </Show.When>
            </Show>
            <SectionRentOutSpaces />
        </div>
    </div>
}