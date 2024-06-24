


import { postProofOfResidence } from "@/app/actions/user/postProofOfResidence";
import { SnackBar } from "@/components/common/snackbar";
import BuildingInput from "@/components/inputs/BuildingInput";
import FileInput from "@/components/inputs/FileInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { useUserContext } from "@/providers/user.provider";
import { Button } from "@nextui-org/react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { ProofOfResidenceSchemaType } from "./schema/user.schema";

type ProofOfResidenceFormProps<TFields extends ProofOfResidenceSchemaType> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}

export default function ProofOfResidenceForm({ formProps }: ProofOfResidenceFormProps<ProofOfResidenceSchemaType>) {
    const { fetchUserProfile } = useUserContext()
    const { handleSubmit, formState: { isSubmitting, isValid, isDirty }, reset, getValues } = formProps;

    const processProofOfResidence = async (data: ProofOfResidenceSchemaType) => {
        const { proofOfResidence, ...partialData } = data;

        const forUpdate: Partial<ProofOfResidenceSchemaType> = {};

        const { dirtyFields } = formProps.formState;


        for (const field in dirtyFields) {
            if (!dirtyFields[field as keyof typeof dirtyFields]) continue;
            (forUpdate as any)[field] = data[field as keyof ProofOfResidenceSchemaType];
        }

        const file = proofOfResidence as File;

        let form;

        if (forUpdate['proofOfResidence']) {
            form = new FormData();
            form.append('files', file);
            delete forUpdate['proofOfResidence']
        }


        if (!Object.keys(forUpdate).length) return;


        await postProofOfResidence(partialData, form);
        await fetchUserProfile();
    }

    const onSubmit = async (data: ProofOfResidenceSchemaType) => {
        await toast.promise(processProofOfResidence(data), {
            loading: "Saving..",
            error: "Failed to save.",
            success: "Saved."
        })

        reset(getValues())

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
                    label="Upload Image"
                />
            </FieldLayout>
            <SnackBar
                classNames={{
                    message: "text-sm",
                    container: "bg-blue-400/10"
                }}
                severity="info"
                message="Notice: We collect sensitive info for verification purposes only. Your data is securely stored and retained while you use our platform."
            />
            <div className="flex items-center justify-end w-full gap-x-2">
                <Button isDisabled={!isDirty} type="button" onClick={() => {
                    reset()
                }} className="self-end min-w-[100px] text-primary-500 dark:text-primary" variant="light" color="primary">
                    Reset
                </Button>
                <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid || !isDirty} className="self-end min-w-[100px]" variant="shadow" color="primary">
                    Save
                </Button>
            </div>
        </form>
    </React.Fragment>
}