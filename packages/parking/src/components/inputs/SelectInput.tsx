import { Select, SelectProps } from "@nextui-org/react";
import clsx from 'clsx';
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { BaseInputProps, getFieldError } from "./TextInput";


export type SelectInputProps<TFormValues extends FieldValues> = BaseInputProps<TFormValues> & SelectProps;

export default function SelectInput<TFormValues extends FieldValues>({ formProps, children, ...props }: SelectInputProps<TFormValues>) {
    const { formState: { isSubmitting, defaultValues }, } = formProps || {
        formState: {
            errors: {}
        }
    } as UseFormReturn<TFormValues>;
    const inputName = props['name'];

    const value = formProps?.watch(props.name) as string;

    const errorMessage = getFieldError(inputName, formProps?.formState.errors)?.message as string;

    return <Select
        {...errorMessage ? {
            isInvalid: true,
            errorMessage,
        } : {
            isInvalid: props?.isInvalid,
            errorMessage: props?.errorMessage
        }}
        isDisabled={isSubmitting || props.isDisabled}
        color="default"
        {...props}
        name={props.name}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            if (!formProps) return;
            if (formProps.formState.isSubmitting) return;
            formProps.setValue(props.name, e.target.value as PathValue<TFormValues, Path<TFormValues>>, { shouldDirty: true, shouldValidate: true, shouldTouch: true });

        }}
        selectedKeys={[value]}
        {...defaultValues?.[inputName] && {
            defaultSelectedKeys: [defaultValues?.[inputName]]
        }}
        classNames={{
            ...props.classNames,
            trigger: clsx("h-[55px] min-w-[70px]", props.classNames?.trigger),
            // value: clsx("text-center md:text-right", props.classNames?.value),
        }}
        aria-label={inputName}
        aria-labelledby={inputName}
    >
        {children}
    </Select>
}