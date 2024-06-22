"use client"

import { Divider } from "@nextui-org/react"
import { CardOnboardingProfile } from "./card-onboarding"
import { DashboardContentHeader } from "./content-header"
import { SectionRentOutSpaces } from "./section-rent-out-spaces"


export const Content = () => {

    return <div className="flex flex-col w-full h-full gap-6 px-4 md:px-16">
        <DashboardContentHeader />
        <Divider />
        <div className="flex flex-col gap-12">
            <CardOnboardingProfile />
            <SectionRentOutSpaces />
        </div>
    </div>
}