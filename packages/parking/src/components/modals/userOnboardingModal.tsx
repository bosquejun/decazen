/* eslint-disable react/no-unescaped-entities */
import { processUserOnboarding } from "@/app/actions/user/updateProfileAction";
import { MINIMUM_AGE, UserProfileSchemaType, userProfileSchema } from "@/forms/schema/user.schema";
import UserProfileForm from "@/forms/user-profile.form";
import { useUserContext } from "@/providers/user.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Spacer } from "@nextui-org/react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type AddParkingSpaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
}


export const UserOnboardingModal = ({ isOpen, onClose }: AddParkingSpaceModalProps) => {

    const { userData } = useUserContext();

    const userProfileForm = useForm<UserProfileSchemaType>({
        resolver: yupResolver(userProfileSchema),
        defaultValues: {
            first_name: userData?.first_name || "",
            last_name: userData?.last_name || "",
            gender: userData?.metadata?.gender || "Male",
            birthdate: userData?.metadata?.birthdate ? new Date(userData?.metadata?.birthdate) : moment().subtract(MINIMUM_AGE, 'years').toDate(),
            phone: userData?.metadata?.phone ? userData?.metadata?.phone.slice(3) : ""
        },
        mode: "onTouched"
    });

    const currentOnboardingStep = useMemo(() => userData?.metadata?.onBoardingStep || 1, [userData]);


    const [currentExpandedSection, setCurrentExpandedSection] = useState(new Set([String(currentOnboardingStep)]));

    const onCompleteSection = async (section: number) => {
        await processUserOnboarding(section);
    }


    return <Modal hideCloseButton scrollBehavior="inside" className="max-h-screen bg-background min-h-[60%]" isOpen={isOpen} onClose={onClose} size="full" placement="center" backdrop="blur" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>
                    <div className="flex justify-between items-center w-full">
                        {/* <h2 className="grow-1 w-full">Start Onboarding</h2> */}
                        <Spacer />

                        <div className="grow-0 hidden md:flex items-center gap-2">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onClose} variant="shadow" color="primary">Submit Onboarding</Button>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="w-full self-center md:min-w-[600px] md:max-w-[900px] px-2 md:px-8">
                    <div className="flex flex-col gap-y-2 p-4 py-2">
                        <p className="text-2xl">Boom shakalak! Let’s get started.</p>
                        <p className="text-foreground-500">We're excited to get to know you better! Please fill out all the required information, Let's get started!</p>
                    </div>
                    <div className="flex flex-col gap-y-2 p-4">
                        <div className="flex justify-between items-center">
                            <p>Steps</p>
                            <p>{currentOnboardingStep}/4</p>
                        </div>
                        <Progress aria-label="progress..." value={currentOnboardingStep * 25} className="w-full" />
                    </div>
                    <Accordion variant="splitted" selectedKeys={currentExpandedSection} onSelectionChange={setCurrentExpandedSection as any}>
                        <AccordionItem key="0" aria-label="Personal Information" title="Personal Information" subtitle="General information about the parking space such as location, parking type, and slot number"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <UserProfileForm formProps={userProfileForm} onSubmitSuccessful={async () => {
                                if (currentOnboardingStep >= 1) return;
                                onCompleteSection(1);
                            }} />
                        </AccordionItem>
                        <AccordionItem key="1" aria-label="Home Address" title="Home Address" subtitle="General information about the parking space such as location, parking type, and slot number"
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <UserProfileForm formProps={userProfileForm} onSubmitSuccessful={async () => {
                                if (currentOnboardingStep >= 2) return;
                                onCompleteSection(2);
                            }} />
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter className="flex md:hidden">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} variant="shadow" color="primary">Submit Onboarding</Button>
                </ModalFooter>
            </>}
        </ModalContent>
    </Modal>
}

