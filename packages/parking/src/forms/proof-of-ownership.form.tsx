


import { postProofOfOwnershipAction } from "@/app/actions/user/postProofOfOwnership";
import { SnackBar } from "@/components/common/snackbar";
import FileInput from "@/components/inputs/FileInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { useUserContext } from "@/providers/user.provider";
import { Button } from "@nextui-org/react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { ProofOfOwnershipSchemaType } from "./schema/user.schema";

type ProofOfOwnershipFormProps<TFields extends ProofOfOwnershipSchemaType> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}

export default function ProofOfOwnershipForm({ formProps, onSubmitSuccessful, isOnboarding }: ProofOfOwnershipFormProps<ProofOfOwnershipSchemaType>) {
    const { fetchUserProfile } = useUserContext()
    const { handleSubmit, formState: { isSubmitting, isValid, isDirty }, reset, getValues } = formProps;

    const processProofOfResidence = async ({ proofOfParkingOwnership, validId }: ProofOfOwnershipSchemaType) => {

        const form = new FormData();

        form.append('proofOfParkingOwnership', proofOfParkingOwnership as File);
        form.append('validId', validId as File);

        await postProofOfOwnershipAction(form);
        await fetchUserProfile();
    }

    const onSubmit = async (data: ProofOfOwnershipSchemaType) => {
        await toast.promise(processProofOfResidence(data), {
            loading: "Saving..",
            error: "Failed to save.",
            success: "Saved."
        })

        reset(getValues())
    }


    return <React.Fragment>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldLayout fieldName="Valid ID" description="Please provide by uploading the copy of your valid ID for verification.">
                <FileInput
                    classNames={{
                        button: "md:max-w-[150px]"
                    }}
                    formProps={formProps}
                    name="validId"
                    fullWidth
                    accept="image/*"
                />
            </FieldLayout>
            <FieldLayout fieldName="Proof of parking ownership" description="Please provide by uploading the copy of proof of parking ownership for verification.">
                <FileInput
                    classNames={{
                        button: "md:max-w-[150px]"
                    }}
                    formProps={formProps}
                    name="proofOfParkingOwnership"
                    fullWidth
                    accept="image/*,.pdf"
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