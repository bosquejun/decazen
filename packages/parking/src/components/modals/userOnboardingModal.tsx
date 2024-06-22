/* eslint-disable react/no-unescaped-entities */
import { submitUserOnboardingAction } from "@/app/actions/user/submitOnboardinAction";
import ProofOfOwnershipForm from "@/forms/proof-of-ownership.form";
import ProofOfResidenceForm from "@/forms/proof-of-residence.form";
import ReviewUserOnboardingForm from "@/forms/review-onboarding.form";
import { MINIMUM_AGE, ProofOfOwnershipSchemaType, ProofOfResidenceSchemaType, UserProfileSchemaType, proofOfOwnershipSchema, proofOfResidenceSchema, userProfileSchema } from "@/forms/schema/user.schema";
import UserProfileForm from "@/forms/user-profile.form";
import { useUserContext } from "@/providers/user.provider";
import { ONBOARDING_STEPS } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Accordion, AccordionItem, Button, Checkbox, Chip, Modal, ModalBody, ModalContent, ModalFooter, Progress } from "@nextui-org/react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { FormState, UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Show from "../common/Show";

type AddParkingSpaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const checkFormValidity = (forms: UseFormReturn<any>[], stateToCheck: (keyof FormState<any>)[] = ["isValid"]) => {
    return forms.every(({ formState }) => stateToCheck.every((key) => {
        if (key === 'isDirty') return !formState[key];
        return formState[key];
    }))
}


export const UserOnboardingModal = ({ isOpen, onClose }: AddParkingSpaceModalProps) => {

    const { userData, fetchUserProfile } = useUserContext();

    const submitOnboarding = async () => {
        await toast.promise(submitUserOnboardingAction(), {
            loading: "Submitting...",
            error: "Failed to submit user onboarding.",
            success: "Successfully submitted user onboarding."
        });
        await fetchUserProfile();
        onClose();
    }

    const userProfileForm = useForm<UserProfileSchemaType>({
        resolver: yupResolver(userProfileSchema),
        resetOptions: {
            keepDefaultValues: true,
            keepDirty: false,
            keepIsValid: true,
            keepTouched: false,
            keepIsValidating: false,
            keepIsSubmitted: false,
            keepErrors: false,
            keepDirtyValues: false,
        },
        mode: "onTouched",

    });

    useEffect(() => {
        userProfileForm.reset({
            first_name: userData?.first_name || "",
            last_name: userData?.last_name || "",
            gender: userData?.metadata?.gender || "Male",
            birthdate: userData?.metadata?.birthdate ? new Date(userData?.metadata?.birthdate) : moment().subtract(MINIMUM_AGE, 'years').toDate(),
            phone: userData?.metadata?.phone ? userData?.metadata?.phone.slice(3) : ""
        }, { keepIsValid: false, keepDirty: false })
    }, [userProfileForm.reset, userData]);


    const proofOfResidenceForm = useForm<ProofOfResidenceSchemaType>({
        resolver: yupResolver(proofOfResidenceSchema),
        resetOptions: {
            keepDefaultValues: true,
            keepDirty: false,
            keepIsValid: true,
            keepTouched: false,
            keepIsValidating: false,
            keepIsSubmitted: false,
            keepErrors: false,
            keepDirtyValues: false,
        },
        mode: "onTouched"
    });

    useEffect(() => {
        proofOfResidenceForm.reset({
            buildingName: userData?.metadata?.buildingName || "",
            proofOfResidence: userData?.metadata?.proofOfResidenceUrl || "",
            unitNumber: userData?.metadata?.unitNumber ? Number(userData?.metadata?.unitNumber) : undefined,
        }, { keepIsValid: false, keepDirty: false });
    }, [proofOfResidenceForm.reset, userData]);


    const proofOfOwnershipForm = useForm<ProofOfOwnershipSchemaType>({
        resolver: yupResolver(proofOfOwnershipSchema),
        mode: "onTouched"
    })


    useEffect(() => {
        proofOfOwnershipForm.reset({
            proofOfParkingOwnership: userData?.metadata?.proofOfParkingOwnershipUrl || "",
            validId: userData?.metadata?.validIdUrl || "",
        }, { keepIsValid: false, keepDirty: false })
    }, [proofOfOwnershipForm.reset, userData]);


    const currentOnboardingStep = useMemo(() => {
        switch (userData?.metadata?.onBoardingStep) {
            case "profileCompleted":
                return 1;
            case "proofOfResidenceCompleted":
                return 2;
            case "proofOfOwnershipCompleted":
                return 3;
            default:
                return 0;
        }
    }, [userData]);



    const [currentExpandedSection, setCurrentExpandedSection] = useState(new Set([String(currentOnboardingStep)]));


    useEffect(() => {
        setCurrentExpandedSection(new Set([String(currentOnboardingStep)]))
    }, [currentOnboardingStep]);

    const isProfileValid = useMemo(() => checkFormValidity([userProfileForm]), [userProfileForm.formState]);
    const isProofOfResidenceValid = useMemo(() => checkFormValidity([proofOfResidenceForm]), [proofOfResidenceForm.formState]);
    const isProofOfOwnershipFormValid = useMemo(() => checkFormValidity([proofOfOwnershipForm]), [proofOfOwnershipForm.formState]);

    return <Modal hideCloseButton scrollBehavior="inside" className="max-h-screen bg-background min-h-[60%]" isOpen={isOpen} onClose={onClose} size="full" placement="center" backdrop="blur" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
            {(onClose) => <>
                <ModalBody className="w-full self-center md:min-w-[600px] md:max-w-[900px] px-2 md:px-8">
                    <div className="flex flex-col gap-y-2 p-4 py-2">
                        <p className="text-2xl">Boom shakalak! Let’s get started.</p>
                        <p className="text-foreground-500">We're excited to get to know you better! Please fill out all the required information, Let's get started!</p>
                    </div>
                    <div className="flex flex-col gap-y-2 p-4">
                        <div className="flex justify-between items-center">
                            <p>Steps</p>
                            <p>{currentOnboardingStep + 1}/{ONBOARDING_STEPS.length - 1}</p>
                        </div>
                        <Progress aria-label="progress..." value={(currentOnboardingStep + 1) * 25} className="w-full" />
                    </div>
                    <Accordion variant="splitted" selectedKeys={currentExpandedSection} onSelectionChange={setCurrentExpandedSection as any}>
                        <AccordionItem
                            startContent={
                                <Checkbox isReadOnly isSelected={currentOnboardingStep >= 1} />
                            }
                            key="0"
                            aria-label="Personal Information"
                            title={<div className="flex gap-x-2">
                                <p>Personal Information</p>
                                <Show>
                                    <Show.When isTrue={!checkFormValidity([userProfileForm], ["isDirty"])}>
                                        <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Unsaved Changes</Chip>
                                    </Show.When>
                                </Show>
                            </div>}
                            subtitle="We need your personal information to create your profile, ensure a personalized experience, and for our team to be able to contact you when necessary."
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <UserProfileForm formProps={userProfileForm} isOnboarding={userData?.metadata?.onBoardingStep !== "profileCompleted"} />
                        </AccordionItem>
                        <AccordionItem isDisabled={currentOnboardingStep < 1 || !checkFormValidity([userProfileForm])} startContent={
                            <Checkbox isReadOnly isSelected={currentOnboardingStep >= 2} />
                        } key="1" aria-label="Proof of Residence"
                            title={<div className="flex gap-x-2">
                                <p>Proof of Residence</p>
                                <Show>
                                    <Show.When isTrue={!checkFormValidity([proofOfResidenceForm], ["isDirty"])}>
                                        <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Unsaved Changes</Chip>
                                    </Show.When>
                                </Show>
                            </div>}
                            subtitle="To ensure the exclusivity and security of our community-focused parking space platform, we require proof of residence during the onboarding process."
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <ProofOfResidenceForm formProps={proofOfResidenceForm} isOnboarding />
                        </AccordionItem>

                        <AccordionItem isDisabled={currentOnboardingStep < 2 || !checkFormValidity([userProfileForm, proofOfResidenceForm])} startContent={
                            <Checkbox isReadOnly isSelected={currentOnboardingStep >= 3} />
                        } key="2" aria-label="Proof of Parking Ownership"
                            title={<div className="flex gap-x-2">
                                <p>Proof of Parking Ownership</p>
                                <Show>
                                    <Show.When isTrue={!checkFormValidity([proofOfOwnershipForm], ["isDirty"])}>
                                        <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Unsaved Changes</Chip>
                                    </Show.When>
                                </Show>
                            </div>}
                            subtitle="To maintain the integrity of our community-focused parking space platform, we require proof of parking ownership during the onboarding process."
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <ProofOfOwnershipForm formProps={proofOfOwnershipForm} isOnboarding />
                        </AccordionItem>

                        <AccordionItem isDisabled={currentOnboardingStep < 3 || !(isProfileValid && isProofOfResidenceValid && isProofOfOwnershipFormValid)} startContent={
                            <Checkbox isReadOnly isSelected={currentOnboardingStep >= 4} />
                        } key="3" aria-label="Review Onboarding" title="Review" subtitle="Please review your information carefully before submitting. Ensure all details, including personal information, address, and documents, are accurate and up-to-date."
                            classNames={{
                                content: "flex flex-col gap-y-6 pb-8 md:pl-6 px-1"
                            }}>
                            <ReviewUserOnboardingForm
                                proofOfOwnershipForm={proofOfOwnershipForm}
                                proofOfResidenceForm={proofOfResidenceForm}
                                userProfileForm={userProfileForm}
                                onEditSection={(key) => {
                                    setCurrentExpandedSection(new Set([String(key)]))
                                }}
                            />
                        </AccordionItem>
                    </Accordion>

                </ModalBody>
                <ModalFooter >
                    <Button onClick={onClose}>Cancel</Button>
                    <Button isDisabled={!checkFormValidity([userProfileForm, proofOfResidenceForm, proofOfOwnershipForm], ["isDirty", "isValid"])} onClick={submitOnboarding} variant="shadow" color="primary">Submit Onboarding</Button>
                </ModalFooter>
            </>}
        </ModalContent>
    </Modal>
}

