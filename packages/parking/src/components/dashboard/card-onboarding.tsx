import { Button, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { UserOnboardingModal } from "../modals/userOnboardingModal";


export const CardOnboardingProfile = () => {
    const [isOpen, setIsOpen] = useState(false);


    return <>
        <Card>
            <CardBody className="overflow-hidden">
                <div className="min-h-[200px] overflow-hidden md:p-6 p-3">
                    <div className="flex flex-col gap-4 z-10 relative h-full">
                        <div className="grow-1 h-full">
                            <h4 className="text-2xl font-semibold max-w-[70%]">🎉 Welcome to Decazen Parking</h4>
                            <p className="text-default-500 max-w-[70%] mt-[4px]">We are glad to have you here. Let&apos;s get started with your profile.</p>
                        </div>
                        <Button onClick={() => {
                            setIsOpen(true);
                        }} variant="shadow" color="primary" className="w-[120px] h-[70px]">Get Started</Button>
                    </div>
                    <div className="w-[180px] md:w-[250px] absolute right-[-35px] bottom-[-40px] z-0">
                        <img src="/images/onboarding.svg" />
                        {/* <a href="https://storyset.com/business">Business illustrations by Storyset</a> */}
                    </div>

                </div>
            </CardBody>
        </Card>
        <UserOnboardingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
}