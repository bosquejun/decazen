


import { postProofOfResidence } from "@/app/actions/user/postProofOfResidence";
import BuildingInput from "@/components/inputs/BuildingInput";
import FileInput from "@/components/inputs/FileInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { useUserContext } from "@/providers/user.provider";
import { Button } from "@nextui-org/react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProofOfResidenceSchemaType } from "./schema/user.schema";

type UserProfileFormProps<TFields extends ProofOfResidenceSchemaType> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}

export default function ProofOfResidenceForm({ formProps, onSubmitSuccessful, isOnboarding }: UserProfileFormProps<ProofOfResidenceSchemaType>) {
    const { fetchUserProfile } = useUserContext()
    const { handleSubmit, formState: { isSubmitting, isValid, defaultValues } } = formProps;

    const processUserProfileUpdate = async (data: ProofOfResidenceSchemaType) => {
        await fetchUserProfile();
    }

    const onSubmit = async (data: ProofOfResidenceSchemaType) => {
        const { proofOfResidence } = data;

        await postProofOfResidence(data);
        debugger;
        // await toast.promise(processUserProfileUpdate(data), {
        //     loading: "Saving..",
        //     error: "Failed to save.",
        //     success: "Saved."
        // })

    }



    return <React.Fragment>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldLayout fieldName="Building Name" description="Please provide the name of your building.">
                <BuildingInput
                    formProps={formProps}
                    name="buildingName"
                />
            </FieldLayout>
            <FieldLayout fieldName="Unit number" description="Please provide the unit number of your residence.">
                <TextInput
                    formProps={formProps}
                    name="unitNumber"
                    type="number"
                />
            </FieldLayout>

            <FieldLayout fieldName="Resident ID" description="Please provide by uploading the copy of your resident ID for verification.">
                <FileInput
                    classNames={{
                        // buttonWrapper: "md:max-w-[120px]"
                        button: "md:max-w-[150px]"
                    }}
                    formProps={formProps}
                    name="proofOfResidence"
                    fullWidth
                    accept="image/*"
                />
            </FieldLayout>
            <div className="flex items-center justify-end w-full gap-x-2">
                <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid} className="self-end min-w-[100px]" variant="shadow" color="primary">
                    Save
                </Button>
            </div>
        </form>
    </React.Fragment>
}