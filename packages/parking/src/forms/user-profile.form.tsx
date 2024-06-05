
import { updateProfileAction } from "@/app/actions/user/updateProfileAction";
import CalendarInput from "@/components/inputs/CalendarInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldLayout } from "@/components/layout/field-layout";
import useUserContext from "@/hooks/use-user-context";
import { parseDate } from "@internationalized/date";
import { Button, SelectItem } from "@nextui-org/react";
import moment from "moment";
import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { UserProfileSchemaType } from "./schema/user.schema";

type UserProfileFormProps<TFields extends UserProfileSchemaType> = {
    formProps: UseFormReturn<TFields>,
}

export default function UserProfileForm({ formProps }: UserProfileFormProps<UserProfileSchemaType>) {
    const { userData, session } = useUserContext();

    const { handleSubmit, formState: { isSubmitting, isValid, defaultValues } } = formProps;

    const onSubmit = async (data: UserProfileSchemaType) => {
        const response = await updateProfileAction(data);
    }

    const maxDate = useMemo(() => defaultValues?.birthdate, [defaultValues]);



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
                    defaultSelectedKeys={["Male"]}
                    fullWidth
                    formProps={formProps}
                    name="gender"
                    disallowEmptySelection
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
            <div className="flex items-center justify-end w-full gap-x-2">
                <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid} className="self-end min-w-[100px]" variant="shadow" color="primary">
                    Save
                </Button>
            </div>
        </form>
    </React.Fragment>
}