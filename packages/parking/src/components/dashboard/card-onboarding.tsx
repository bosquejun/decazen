/* eslint-disable @next/next/no-img-element */
"use client"

import { SUPPORTED_MODAL_ROUTE, useModalRouted } from "@/providers/modal-routed.provider";
import { useUserContext } from "@/providers/user.provider";
import { Button, Card, CardBody, Chip, Skeleton } from "@nextui-org/react";
import clsx from 'clsx';
import Show from "../common/Show";
import { UserOnboardingModal } from "../modals/userOnboardingModal";


export const CardOnboardingProfile = () => {
    const { requiresOnboarding, isAuthenticated, isUserForReview } = useUserContext();
    const { closeModalRouted, isModalRoutedOpen, openModalRouted } = useModalRouted();



    return <Show>
        <Show.When isTrue={requiresOnboarding && isAuthenticated}>
            <Card>
                <CardBody className="overflow-hidden dark:bg-dot-white/[0.1] bg-dot-black/[0.2] ">
                    {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dbg-content1 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}

                    <div className="min-h-[200px] overflow-hidden md:p-6 p-3">
                        <div className="flex flex-col gap-4 z-10 relative h-full">
                            <div className="grow-1 h-full">
                                <Show>
                                    <Show.When isTrue={isUserForReview}>
                                        <h4 className={clsx("text-2xl font-semibold md:max-w-[70%] max-w-[100%]")}>🎉 Congratulations on Your Progress!</h4>
                                        <p className={clsx("text-default-500 mt-[4px] md:max-w-[70%] max-w-[100%]")}>Your user onboarding is currently under review. We appreciate your patience.</p>
                                    </Show.When>
                                    <Show.Else>
                                        <h4 className="text-2xl font-semibold max-w-[70%]">🎉 Welcome to Decazen Parking</h4>
                                        <p className="text-default-500 max-w-[70%] mt-[4px]">We are glad to have you here. Let&apos;s get started with your profile.</p>
                                    </Show.Else>
                                </Show>

                            </div>
                            <Show>
                                <Show.When isTrue={isUserForReview}>
                                    <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold text-lg h-[32px]">Status: For Review</Chip>
                                </Show.When>
                                <Show.Else>
                                    <Button onClick={() => {
                                        openModalRouted(SUPPORTED_MODAL_ROUTE.ONBOARDING);
                                    }} variant="shadow" color="primary" className="w-[120px] h-[70px]">Get Started</Button>
                                </Show.Else>
                            </Show>
                        </div>
                        <Show>
                            <Show.When isTrue={isUserForReview}>
                                <div className="w-[180px] md:w-[280px] absolute right-[-35px] bottom-0 z-0 hidden md:flex">
                                    <img src="/images/in-progress.svg" alt="Work illustrations by Storyset" />
                                    {/* <a href="https://storyset.com/work">Work illustrations by Storyset</a> */}
                                </div>
                            </Show.When>
                            <Show.Else>
                                <div className="w-[180px] md:w-[250px] absolute right-[-35px] bottom-[-40px] z-0">
                                    <img src="/images/onboarding.svg" alt="Business illustrations by Storyset" />
                                    {/* <a href="https://storyset.com/business">Business illustrations by Storyset</a> */}
                                </div>
                            </Show.Else>
                        </Show>

                    </div>

                </CardBody>
            </Card>
            <UserOnboardingModal isOpen={isModalRoutedOpen} onClose={closeModalRouted} />
        </Show.When>
        <Show.When isTrue={requiresOnboarding && !isAuthenticated} >
            <Skeleton className="rounded-large w-full h-[274px] md:h-[224px]" />
        </Show.When>
    </Show>
}