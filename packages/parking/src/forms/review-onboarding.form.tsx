


import Label from "@/components/common/label";
import FileInput from "@/components/inputs/FileInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { Chip, Divider, Link } from "@nextui-org/react";
import moment from "moment";
import { UseFormReturn } from "react-hook-form";
import { ProofOfOwnershipSchemaType, ProofOfResidenceSchemaType, UserProfileSchemaType } from "./schema/user.schema";

type ReviewUserOnboardingFormProps = {
    userProfileForm: UseFormReturn<UserProfileSchemaType>,
    proofOfResidenceForm: UseFormReturn<ProofOfResidenceSchemaType>,
    proofOfOwnershipForm: UseFormReturn<ProofOfOwnershipSchemaType>,
    onEditSection?: (key: number) => void
}

export default function ReviewUserOnboardingForm({ userProfileForm, proofOfResidenceForm, proofOfOwnershipForm, onEditSection }: ReviewUserOnboardingFormProps) {

    const unsavedProfile = userProfileForm.formState.isDirty;
    const unsavedProofOfResidence = proofOfResidenceForm.formState.isDirty;
    const unsavedProofOfOwnershipForm = proofOfOwnershipForm.formState.isDirty;


    const renderEditSection = (key: number) => <Link color="primary" className="cursor-pointer" as="button" onClick={() => {
        onEditSection && onEditSection(key)
    }}>Edit</Link>



    return <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4  p-4 rounded-md">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-bold text-foreground-500">Personal Information</h1>
                <div className="flex flex-col md:flex-row gap-x-2 items-end md:items-center justify-end">
                    {
                        unsavedProfile && <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Unsaved Changes</Chip>
                    }
                    {renderEditSection(0)}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <FieldLayout fieldName="First name">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={userProfileForm.getValues()['first_name']} />
                </FieldLayout>
                <FieldLayout fieldName="Last name">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={userProfileForm.getValues()['last_name']} />
                </FieldLayout>

                <FieldLayout fieldName="Gender">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={userProfileForm.getValues()['gender'] as string} />
                </FieldLayout>

                <FieldLayout fieldName="Birthdate">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={moment(userProfileForm.getValues()['birthdate']).format("MMMM DD, yyyy")} />
                </FieldLayout>
                <FieldLayout fieldName="Mobile number">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={`+63${userProfileForm.getValues()['phone']}`} />
                </FieldLayout>

            </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-y-4  p-4 rounded-md">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-bold text-foreground-500">Proof of Residence</h1>
                <div className="flex flex-col md:flex-row gap-x-2 items-end md:items-center justify-end">
                    {
                        unsavedProofOfResidence && <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Unsaved Changes</Chip>
                    }
                    {renderEditSection(1)}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <FieldLayout fieldName="Building Name">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={proofOfResidenceForm.getValues()['buildingName']} />
                </FieldLayout>
                <FieldLayout fieldName="Unit Number">
                    <Label classNames={{
                        base: "justify-center md:justify-end w-full",
                        content: "text-foreground-500"
                    }} content={proofOfResidenceForm.getValues()['unitNumber']} />
                </FieldLayout>

                <FieldLayout fieldName="Proof of Residence">
                    <FileInput
                        classNames={{
                            // buttonWrapper: "md:max-w-[120px]"
                            button: "md:max-w-[150px]"
                        }}
                        formProps={proofOfResidenceForm}
                        name="proofOfResidence"
                        fullWidth
                        accept="image/*"
                        isReadOnly
                    />
                </FieldLayout>

            </div>
        </div>

        <Divider />
        <div className="flex flex-col gap-y-4  p-4 rounded-md">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-bold text-foreground-500">Proof of Parking Ownership</h1>
                <div className="flex flex-col md:flex-row gap-x-2 items-end md:items-center justify-end">
                    {
                        unsavedProofOfOwnershipForm && <Chip className="bg-primary/20 rounded-lg text-primary-500 dark:text-primary font-bold">Unsaved Changes</Chip>
                    }
                    {renderEditSection(2)}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">

                <FieldLayout fieldName="Valid ID">
                    <FileInput
                        classNames={{
                            // buttonWrapper: "md:max-w-[120px]"
                            button: "md:max-w-[150px]"
                        }}
                        formProps={proofOfOwnershipForm}
                        name="validId"
                        fullWidth
                        accept="image/*"
                        isReadOnly
                    />
                </FieldLayout>


                <FieldLayout fieldName="Proof of Parking ownership">
                    <FileInput
                        classNames={{
                            // buttonWrapper: "md:max-w-[120px]"
                            button: "md:max-w-[150px]"
                        }}
                        formProps={proofOfOwnershipForm}
                        name="proofOfParkingOwnership"
                        fullWidth
                        accept="image/*"
                        isReadOnly
                    />
                </FieldLayout>
            </div>
        </div>
    </div>
}