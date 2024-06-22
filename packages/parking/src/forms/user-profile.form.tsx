
import { updateProfileAction } from "@/app/actions/user/updateProfileAction";
import { SnackBar } from "@/components/common/snackbar";
import CalendarInput from "@/components/inputs/CalendarInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldLayout } from "@/components/layout/field-layout";
import { useUserContext } from "@/providers/user.provider";
import { parseDate } from "@internationalized/date";
import { Button, SelectItem } from "@nextui-org/react";
import moment from "moment";
import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { MINIMUM_AGE, UserProfileSchemaType } from "./schema/user.schema";

type UserProfileFormProps<TFields extends UserProfileSchemaType> = {
    formProps: UseFormReturn<TFields>,
    onSubmitSuccessful?: () => Promise<void>;
    isOnboarding?: boolean;
}

export default function UserProfileForm({ formProps, isOnboarding }: UserProfileFormProps<UserProfileSchemaType>) {
    const { fetchUserProfile } = useUserContext()
    const { handleSubmit, formState: { isSubmitting, isValid, defaultValues, isDirty }, reset, getValues } = formProps;

    const processUserProfileUpdate = async (data: UserProfileSchemaType) => {
        await updateProfileAction({ ...data, isOnboarding });
        await fetchUserProfile();
    }

    const onSubmit = async (data: UserProfileSchemaType) => {
        await toast.promise(processUserProfileUpdate(data), {
            loading: "Saving..",
            error: "Failed to save.",
            success: "Saved."
        });
        reset(getValues())

    }

    const maxDate = useMemo(() => moment().subtract(MINIMUM_AGE, 'years').toDate(), [defaultValues]);

    return <React.Fragment>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldLayout fieldName="First name" description="Your first name is used to personalize your account experience and our communications with you.">
                <TextInput
                    formProps={formProps}
                    name="first_name"
                />
            </FieldLayout>

            <FieldLayout fieldName="Last name" description="Your last name is used along with your first name to identify your account.">
                <TextInput
                    formProps={formProps}
                    name="last_name"
                />
            </FieldLayout>

            <FieldLayout fieldName="Gender" description="Your gender is used for demographic purposes and to personalize our communications with you.">
                <SelectInput
                    fullWidth
                    formProps={formProps}
                    name="gender"
                    disallowEmptySelection
                    classNames={{
                        trigger: "min-w-[100px]"
                    }}
                >
                    {["Male", "Female"].map(selection => <SelectItem aria-label={selection} key={selection} value={selection}>{selection}</SelectItem>)}
                </SelectInput>
            </FieldLayout>

            <FieldLayout fieldName="Birthdate" description="Your birthdate is used to verify your age for account security purposes and to provide age-appropriate user experience.">
                <CalendarInput calendarProps={{
                    maxValue: parseDate(moment(maxDate).format('YYYY-MM-DD'))
                }} name="birthdate" formProps={formProps} inputFormat="MMMM DD, YYYY" />
            </FieldLayout>
            <FieldLayout fieldName="Mobile number" description="Your birthdate is used to verify your age for account security purposes and to provide age-appropriate user experience.">
                <TextInput
                    formProps={formProps}
                    name="phone"
                    maxLength={10}
                    startContent={<p className="mr-2 leading-[15px]">+63</p>}
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