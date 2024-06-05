"use client"

import useUserContext from "@/hooks/use-user-context"
import { Avatar, Divider, Skeleton } from "@nextui-org/react"
import Show from "../common/Show"
import { CardOnboardingProfile } from "./card-onboarding"
import { SectionRentOutSpaces } from "./section-rent-out-spaces"


export const Content = () => {
    const { requiresOnboarding, userData, isAuthenticated } = useUserContext();

    return <div className="flex flex-col w-full h-full gap-6 px-4 md:px-16">
        <div className="flex gap-2 items-center">
            <Show>
                <Show.When isTrue={isAuthenticated}>
                    <Avatar size="lg" />
                </Show.When>
                <Show.Else>
                    <Skeleton className="flex rounded-full w-[56px] h-[56px]" />
                </Show.Else>
            </Show>
            <h1 className="text-2xl text-foreground-700 font-[500]">Hello 👋,
                <br />
                <Show>
                    <Show.When isTrue={isAuthenticated}>
                        <strong>{userData?.name}</strong>
                    </Show.When>
                    <Show.Else>
                        <Skeleton className="flex rounded-md w-[180px] h-8" />
                    </Show.Else>
                </Show>
            </h1>
        </div>
        <Divider />
        <div className="flex flex-col gap-12">
            <Show>
                <Show.When isTrue={requiresOnboarding}>
                    <CardOnboardingProfile />
                </Show.When>
            </Show>
            <SectionRentOutSpaces />
        </div>
    </div>
}