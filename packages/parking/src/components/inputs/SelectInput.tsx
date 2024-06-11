import { Select, SelectProps } from "@nextui-org/react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { BaseInputProps, getFieldError } from "./TextInput";


export type SelectInputProps<TFormValues extends FieldValues> = BaseInputProps<TFormValues> & SelectProps;

export default function SelectInput<TFormValues extends FieldValues>({ formProps, children, ...props }: SelectInputProps<TFormValues>) {
    const { formState: { isSubmitting }, register } = formProps || {
        formState: {
            errors: {}
        }
    } as UseFormReturn<TFormValues>;
    const inputName = props['name'];

    const errorMessage = getFieldError(inputName, formProps?.formState.errors)?.message as string;

    return <Select
        {...errorMessage ? {
            isInvalid: true,
            errorMessage,
        } : {
            isInvalid: props?.isInvalid,
            errorMessage: props?.errorMessage
        }}
        {...register(inputName)}
        isDisabled={isSubmitting || props.isDisabled}
        color="default"
        classNames={{
            trigger: "h-[55px] min-w-[120px]",
        }}
        {...props}
        aria-label={inputName}
        aria-labelledby={inputName}
    >
        {children}
    </Select>
}